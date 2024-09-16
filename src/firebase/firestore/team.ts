import { FieldPath } from "firebase-admin/firestore";
import { db } from "@/firebase/init";

import { Team } from "@/types";
import { z, ZodError } from "zod";
import { teamSchema } from "@/config/schema";

/* fetching data logic */
export async function getTeamBySlugFirebase(slug: string): Promise<Team[]> {
  try {
    const teamsRef = db.collection("projects").doc(slug).collection("teams");
    const snapshot = await teamsRef.orderBy("no").get();
    const data: FirebaseFirestore.DocumentData[] = [];
    snapshot.forEach((doc) => {
      data.push(doc.data());
    });

    return z.array(teamSchema).parse(data);
  } catch (error) {
    console.error("Error fetching team:", error);

    if (error instanceof ZodError) {
      throw new Error("Invalid data type error.");
    }
    throw new Error("Failed to fetch team.");
  }
}

export async function getTeamLengthBySlugFirebase(
  slug: string,
): Promise<number> {
  try {
    const teamsRef = db.collection("projects").doc(slug).collection("teams");
    const snapshot = await teamsRef.get();
    return snapshot.size;
  } catch (error) {
    console.error("Error fetching teams:", error);

    if (error instanceof ZodError) {
      throw new Error("Invalid data type error.");
    }
    throw new Error("Failed to fetch teams.");
  }
}

/* firebase post-only method, no logic here for now */
export async function postTeamFirebase(
  slug: string,
  team: Team,
): Promise<void> {
  // todo: erorr handling
  const teamsRef = db.collection("projects").doc(slug).collection("teams");
  await teamsRef.add(team);
}

export async function updateTeamCheckedBySlugAndNoFirebase(
  slug: string,
  no: number,
  checked: boolean,
): Promise<void> {
  const teamsRef = db.collection("projects").doc(slug).collection("teams");
  const snapshot = await teamsRef.where("no", "==", no).select().get();

  if (snapshot.empty) {
    console.error("No matching team found, no:", no);
    throw new Error("No matching data found.");
  }

  snapshot.forEach((doc) => {
    doc.ref.update({ checked });
  });
}

export async function updateTeamCheckedBySlugBatchFirebase(
  slug: string,
  value: boolean,
) {
  const teamCollection = db
    .collection("projects")
    .doc(slug)
    .collection("teams");

  // Get the total count of documents
  const countSnapshot = await teamCollection.count().get();
  const totalDocs = countSnapshot.data().count;

  // If there are no documents, return early
  if (totalDocs === 0) {
    return;
  }

  // Determine the number of batches needed (max 500 operations per batch)
  const batchSize = 500;
  const numBatches = Math.ceil(totalDocs / batchSize);

  try {
    for (let i = 0; i < numBatches; i++) {
      const batch = db.batch();

      const querySnapshot = await teamCollection
        .orderBy(FieldPath.documentId())
        .limit(batchSize)
        .offset(i * batchSize)
        .get();

      querySnapshot.forEach((doc) => {
        batch.update(doc.ref, { checked: value });
      });

      await batch.commit();
    }
  } catch (error) {
    console.error("Error updating teams in batch:", error);
    throw new Error(`Error updating teams for project ${slug}`);
  }
}

export async function updateTeamBySlugAndNoFirebase(
  slug: string,
  team: Team,
): Promise<void> {
  const teamsRef = db.collection("projects").doc(slug).collection("teams");
  const snapshot = await teamsRef.where("no", "==", team.no).get();

  if (snapshot.empty) {
    console.error("No matching team found, no:", team.no);
    throw new Error("No matching data found.");
  }

  // Start a new batch
  const batch = db.batch();

  snapshot.forEach((doc) => {
    batch.update(doc.ref, team);
  });

  // Commit the batch
  await batch.commit();
}

export async function deleteTeamBySlugAndNoFirebase(
  slug: string,
  no: number,
): Promise<void> {
  const teamsRef = db.collection("projects").doc(slug).collection("teams");

  // Start a new batch
  const batch = db.batch();

  // Find and delete the team
  const snapshot = await teamsRef.where("no", "==", no).get();
  if (snapshot.empty) {
    console.error("No matching team found, no:", no);
    throw new Error("No matching data found.");
  }

  snapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });

  // Get all teams with a higher number and decrement their numbers
  const higherTeamsSnapshot = await teamsRef
    .where("no", ">", no)
    .orderBy("no")
    .get();

  higherTeamsSnapshot.forEach((doc) => {
    batch.update(doc.ref, { no: doc.data().no - 1 });
  });

  // Commit the batch
  await batch.commit();
}
