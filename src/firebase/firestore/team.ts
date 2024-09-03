import { db } from "@/firebase/init";

import { Team } from "@/types";
import { z, ZodError } from "zod";
import { teamSchema } from "@/config/schema";

/* fetching data logic */
export async function getTeamBySlugFirebase(slug: string): Promise<Team[]> {
  try {
    const teamsRef = db.collection("projects").doc(slug).collection("teams");
    const snapshot = await teamsRef.get();
    const data: FirebaseFirestore.DocumentData[] = [];
    snapshot.forEach((doc) => { data.push(doc.data()); });

    return z.array(teamSchema).parse(data);
  } catch (error) {
    console.error("Error fetching teams:", error);

    if (error instanceof ZodError) {
      throw new Error("Invalid data type error.");
    }
    throw new Error("Failed to fetch teams.");
  }
}