import { db } from "@/firebase/init";

import { Project } from "@/types";
import { z } from "zod";
import { projectSchema } from "@/config/schema";

/* fetching data logic */
export async function getProjectsByTypeFirebase(
  type: string,
): Promise<Project[]> {
  // todo: implement pagination and caching
  try {
    const projectsRef = db.collection("projects");
    const snapshot = await projectsRef.where("type", "==", type).get();
    const data: FirebaseFirestore.DocumentData[] = [];

    snapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return z.array(projectSchema).parse(data);
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw new Error("Failed to fetch projects.");
  }
}

export async function getProjectBySlugFirebase(
  slug: string,
): Promise<Project | null> {
  try {
    const projectsRef = db
      .collection("projects")
      .where("slug", "==", slug)
      .limit(1);
    const snapshot = await projectsRef.get();

    if (snapshot.empty) {
      return null;
    }

    const projectData = snapshot.docs[0].data();
    projectData.id = snapshot.docs[0].id;

    return projectSchema.parse(projectData);
  } catch (error) {
    console.error("Error fetching project", error);
    throw new Error("Failed to fetch project.");
  }
}

/* firebase post-only method, no logic here for now */
export async function postProjectFirebase({
  title,
  type,
  slug,
}: {
  title: string;
  type: string;
  slug: string;
}) {
  // todo: erorr handling
  const res = await db.collection("projects").doc().set({ title, type, slug });
  return res;
}
