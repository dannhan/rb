"use server";

import { revalidatePath } from "next/cache";

import { FieldValue } from "firebase-admin/firestore";
import { UTApi } from "uploadthing/server";

import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { updateDoc, deleteDoc } from "@/lib/firebase/firestore";

export async function deleteDesignImageAction({
  slug,
  fileKey,
}: {
  slug: string;
  fileKey: string;
}) {
  const utapi = new UTApi();

  Promise.all([
    await updateDoc({
      collectionName: "projects",
      docId: slug,
      errorMessage: "Error deleting data.",
      data: { designImages: FieldValue.arrayRemove(fileKey) },
    }),
    await deleteDoc({
      collectionName: "project-files",
      docId: fileKey,
      errorMessage: "Error deleting data.",
    }),
    await utapi.deleteFiles([fileKey]),
  ]);

  revalidatePath(`${slug}/gambar-desain`);
}
