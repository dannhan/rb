import type { StoredImage } from "@/types";
import { db } from "@/firebase/init";

/* fetching data logic */
export async function getProjectScheduleBySlugFirebase(
  slug: string,
): Promise<StoredImage | null> {
  try {
    const filesRef = db.collection("projects").doc(slug).collection("files");
    const snapshot = await filesRef
      .where("route", "==", "projectSchedule")
      .get();
    const data: FirebaseFirestore.DocumentData[] = [];

    snapshot.forEach((doc) => {
      data.push(doc.data());
    });

    if (data.length === 0) {
      return null;
    }

    return data[0] as StoredImage;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw new Error("Failed to fetch images.");
  }
}

/* firebase post-only method, no logic here for now */
export async function postProjectScheduleFirebase(
  slug: string,
  projectSchedule: StoredImage,
): Promise<void> {
  if (!projectSchedule.customId) {
    throw new Error("customId is required.");
  }

  const projectRef = db
    .collection("projects")
    .doc(slug)
    .collection("files")
    .doc(projectSchedule.customId);
  await projectRef.set(projectSchedule);
}

export async function deleteProjectScheduleBySlugAndIdFirebase(
  slug: string,
  id: string,
): Promise<void> {
  const projectRef = db
    .collection("projects")
    .doc(slug)
    .collection("files")
    .doc(id);
  await projectRef.delete();
}
