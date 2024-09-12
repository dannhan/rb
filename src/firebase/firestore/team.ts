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
  const snapshot = await teamsRef.where("no", "==", no).get();

  if (snapshot.empty) {
    console.error("No matching team found, no:", no);
    throw new Error("No matching data found.");
  }

  // Start a new batch
  const batch = db.batch();

  snapshot.forEach((doc) => {
    batch.update(doc.ref, { checked });
  });

  // Commit the batch
  await batch.commit();
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
