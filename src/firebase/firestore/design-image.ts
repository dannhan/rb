import { db } from "@/firebase/init";

import type { UploadedFile } from "@/types"
import { FieldValue } from "firebase-admin/firestore";

/* fetching data logic */
export async function getDesignImagesBySlugFirebase(slug: string): Promise<UploadedFile[]> {
  try {
    const projectRef = db.collection("projects").doc(slug);
    const doc = await projectRef.get();
    if (!doc.exists) {
      return [];
    }

    return doc.data()?.designImages || [];
  } catch (error) {
    console.error("Error fetching images:", error);
    throw new Error("Failed to fetch images.");
  }
}

/* firebase post-only method, no logic here for now */
export async function postDesignImageUrlFirebase(slug: string, designImages: UploadedFile[]): Promise<void> {
  const projectRef = db.collection("projects").doc(slug);
  await projectRef.update({
    designImages: FieldValue.arrayUnion(...designImages)
  });
}