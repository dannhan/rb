import { db } from "@/firebase/init";

import type { UploadedFile } from "@/types";

/* fetching data logic */
export async function getProjectScheduleBySlugFirebase(
  slug: string,
): Promise<UploadedFile | null> {
  try {
    const projectRef = db.collection("projects").doc(slug);
    const doc = await projectRef.get();

    if (!doc.exists || !doc.data()?.projectSchedule) {
      return null;
    }

    return doc.data()?.projectSchedule || null;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw new Error("Failed to fetch images.");
  }
}

/* firebase post-only method, no logic here for now */
export async function postProjectScheduleFirebase(
  slug: string,
  projectSchedule: UploadedFile,
): Promise<void> {
  const projectRef = db.collection("projects").doc(slug);
  await projectRef.set({
    projectSchedule: projectSchedule,
  });
}
