// todo: think about the purpose of this file

import { db } from "@/firebase/config";

import { z } from "zod";
import { projectSchema } from "@/config/schema";

export async function getProjectsFirebase() {
  const projectsRef = db.collection("projects");
  const snapshot = await projectsRef.get();
  const data: FirebaseFirestore.DocumentData[] = [];

  snapshot.forEach((doc) => {
    data.push(doc.data());
  });

  // todo: this might return an error, please wrap it inside try catch in the future
  const parsedData = z.array(projectSchema).parse(data);
  return parsedData;
}

export async function postProjectFirebase({
  title,
  type,
  slug,
}: {
  title: string;
  type: string;
  slug: string;
}) {
  const res = await db.collection("projects").doc().set({ title, type, slug });
  return res;
}
