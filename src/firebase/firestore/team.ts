import { FieldPath } from "firebase-admin/firestore";
import { db } from "@/firebase/init";

import { StoredFile, Team } from "@/types";
import { z, ZodError } from "zod";
import { fileSchema, teamSchema as baseTeamSchema } from "@/config/schema";

/* fetching data logic */
// todo: use batch for this
export async function getTeamBySlugFirebase(
  slug: string,
): Promise<(Team & { file?: StoredFile })[]> {
  try {
    const teamsRef = db.collection("projects").doc(slug).collection("teams");
    const snapshot = await teamsRef.orderBy("no").get();

    // parse it to match the schema
    const teamSchema = baseTeamSchema.merge(
      z.object({ file: fileSchema.optional() }),
    );

    const teamsPromises = snapshot.docs.map(async (doc) => {
      const data = { id: doc.id, ...doc.data() };
      const parsedTeam = teamSchema.parse(data);

      if (parsedTeam.fileId) {
        const fileRef = db
          .collection("projects")
          .doc(slug)
          .collection("files")
          .doc(parsedTeam.fileId);
        const fileDoc = await fileRef.get();
        const parsedFile = fileSchema.safeParse(fileDoc.data());
        if (parsedFile.success) {
          parsedTeam.file = parsedFile.data;
        }
      }

      return parsedTeam;
    });

    return await Promise.all(teamsPromises);
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

export async function updateTeamStatusBySlugAndNoFirebase(
  slug: string,
  no: number,
  status: string,
): Promise<void> {
  const teamsRef = db.collection("projects").doc(slug).collection("teams");
  const snapshot = await teamsRef.where("no", "==", no).select().get();

  if (snapshot.empty) {
    console.error("No matching team found, no:", no);
    throw new Error("No matching data found.");
  }

  snapshot.forEach((doc) => {
    doc.ref.update({ status });
  });
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

export async function postTeamFileFirebase(
  slug: string,
  teamId: string,
  file: StoredFile,
): Promise<void> {
  if (!file.customId) {
    throw new Error("customId is required.");
  }

  const teamRef = db
    .collection("projects")
    .doc(slug)
    .collection("teams")
    .doc(teamId);

  await teamRef.update({ fileId: file.customId });

  const filesRef = db
    .collection("projects")
    .doc(slug)
    .collection("files")
    .doc(file.customId);
  await filesRef.set(file);
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
  team: Omit<Team, "status">,
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
