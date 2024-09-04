import { db } from "@/firebase/init";

import { DesignImage } from "@/types";
import { z } from "zod";
import { designImageSchema } from "@/config/schema";

/* fetching data logic */
export async function getDesignImagesBySlugFirebase(slug: string): Promise<DesignImage[]> {
  try {
    const designImageRef = db.collection("projects").doc(slug).collection("designImages");
    const snapshot = await designImageRef.get();
    const data: FirebaseFirestore.DocumentData[] = [];
    snapshot.forEach((doc) => { data.push(doc.data()); });

    return z.array(designImageSchema).parse(data);
  } catch (error) {
    console.error("Error fetching images:", error);
    throw new Error("Failed to fetch images.");
  }
}

export async function postDesignImageUrlFirebase(slug: string, imageUrl: string): Promise<void> {
  const designImageRef = db.collection("projects").doc(slug).collection("designImages");
  await designImageRef.add({ url: imageUrl });
}