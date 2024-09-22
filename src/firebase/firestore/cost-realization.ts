import type { StoredImage } from "@/types";
import { db } from "@/firebase/init";

/* fetching data logic */
export async function getCostRealizationBySlugFirebase(
  slug: string,
): Promise<StoredImage | null> {
  try {
    const filesRef = db.collection("projects").doc(slug).collection("files");
    const snapshot = await filesRef
      .where("route", "==", "costRealization")
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
    console.error("Error fetching image:", error);
    throw new Error("Failed to fetch image.");
  }
}

export async function postCostRealizationFirebase(
  slug: string,
  costRealization: StoredImage,
): Promise<void> {
  if (!costRealization.customId) {
    throw new Error("customId is required.");
  }

  const filesRef = db
    .collection("projects")
    .doc(slug)
    .collection("files")
    .doc(costRealization.customId);
  await filesRef.set(costRealization);
}

// export async function removeCostRealizationBySlugAndIdFirebase(
export async function deleteCostRealizationBySlugAndIdFirebase(
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
