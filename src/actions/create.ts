"use server";

import { revalidatePath } from "next/cache";

import { Timestamp } from "firebase-admin/firestore";

import { createDoc } from "@/lib/firebase/firestore";
import { nanoid } from "@/lib/nanoid";

export async function createDesignImageCategoryAction(values: {
  name: string;
  slug: string;
}) {
  const id = nanoid();

  await createDoc({
    docId: id,
    collectionName: "design-image-categories",
    errorMessage: "Error adding new category.",
    data: { ...values, createdAt: Timestamp.now() },
  });

  revalidatePath(`${values.slug}/gambar-desain`);
}
