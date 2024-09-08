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
