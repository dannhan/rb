"use server";

import { revalidatePath } from "next/cache";

import { FieldValue } from "firebase-admin/firestore";
import { UTApi } from "uploadthing/server";

import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { updateDoc, deleteDoc } from "@/lib/firebase/firestore";

export async function deleteIdentityAction({
  slug,
  id,
}: {
  slug: string;
  id: string;
}) {
  Promise.all([
    await updateDoc({
      collectionName: "projects",
      docId: slug,
      errorMessage: "Error deleting data.",
      data: { identities: FieldValue.arrayRemove(id) },
    }),
    await deleteDoc({
      collectionName: "project-identities",
      docId: id,
      errorMessage: "Error deleting data.",
    }),
  ]);

  revalidatePath(`${slug}/identitas-proyek`);
}

export async function deleteTeamAction({
  slug,
  id,
  fileKey,
}: {
  slug: string;
  id: string;
  fileKey?: string;
}) {
  const utapi = new UTApi();

  Promise.all([
    await updateDoc({
      collectionName: "projects",
      docId: slug,
      errorMessage: "Error deleting data.",
      data: { teams: FieldValue.arrayRemove(id) },
    }),
    await deleteDoc({
      collectionName: "project-teams",
      docId: id,
      errorMessage: "Error deleting data.",
    }),
    fileKey &&
      (await deleteDoc({
        collectionName: "project-files",
        docId: fileKey,
        errorMessage: "Error deleting data.",
      })),
    fileKey && (await utapi.deleteFiles([fileKey])),
  ]);

  revalidatePath(`${slug}/tim-pelaksana`);
}

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

export async function deleteImageAction({
  slug,
  route,
  fileKey,
}: {
  slug: string;
  route: keyof OurFileRouter;
  fileKey: string;
}) {
  const utapi = new UTApi();

  Promise.all([
    await updateDoc({
      collectionName: "projects",
      docId: slug,
      errorMessage: "Error deleting data.",
      data: { [route]: FieldValue.delete() },
    }),
    await deleteDoc({
      collectionName: "project-files",
      docId: fileKey,
      errorMessage: "Error deleting data.",
    }),
    await utapi.deleteFiles([fileKey]),
  ]);
}
