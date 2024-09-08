import type { StoredImage, UploadedFile } from "@/types";

import { db } from "@/firebase/init";
import { FieldValue } from "firebase-admin/firestore";

/* fetching data logic */
export async function getDesignImageIdsBySlugFirebase(
  slug: string,
): Promise<string[]> {
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

export async function getDesignImagesBySlugAndIdsFirebase(
  slug: string,
  ids: string[],
): Promise<StoredImage[]> {
  try {
    const images: StoredImage[] = [];
    for (const id of ids) {
      const imageRef = db
        .collection("projects")
        .doc(slug)
        .collection("files")
        .doc(id);
      const doc = await imageRef.get();

      // todo: do zod validation here
      if (doc.exists) {
        images.push(doc.data() as StoredImage);
      }
    }

    return images;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw new Error("Failed to fetch images.");
  }
}

export async function postDesignImageFirebase(
  slug: string,
  designImage: StoredImage,
): Promise<void> {
  const filesRef = db.collection("projects").doc(slug).collection("files");

  if (!designImage.customId) {
    throw new Error("customId is required.");
  }

  await Promise.all([
    storeDesignImageIdFirebase(slug, designImage.customId),
    filesRef.doc(designImage.customId).set(designImage),
  ]);
}

export async function storeDesignImageIdFirebase(
  slug: string,
  designImageId: string,
): Promise<void> {
  const projectRef = db.collection("projects").doc(slug);
  await projectRef.update({
    designImages: FieldValue.arrayUnion(designImageId),
  });
}

export async function deleteDesignImageIdFirebase(
  slug: string,
  designImageId: string,
): Promise<void> {
  const projectRef = db.collection("projects").doc(slug);
  await projectRef.update({
    designImages: FieldValue.arrayRemove(designImageId),
  });
}

export async function deleteDesignImageByIdFirebase(
  slug: string,
  designImageId: string,
): Promise<void> {
  await db
    .collection("projects")
    .doc(slug)
    .collection("files")
    .doc(designImageId)
    .delete();
}

/* firebase post-only method, no logic here for now */
export async function postDesignImageUrlFirebase(
  slug: string,
  designImages: UploadedFile,
): Promise<void> {
  const projectRef = db.collection("projects").doc(slug);
  await projectRef.update({
    designImages: FieldValue.arrayUnion(designImages),
  });
}

export async function deleteDesignImageBySlugFirebase(
  slug: string,
  designImage: UploadedFile,
): Promise<void> {
  const projectRef = db.collection("projects").doc(slug);
  await projectRef.update({
    designImages: FieldValue.arrayRemove(designImage),
  });
  console.log("designImage", JSON.stringify(designImage, null, 2));
}

// 6BW0Ze81CD45M8xMDApbs
