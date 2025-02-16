"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { Timestamp } from "firebase-admin/firestore";
import { z } from "zod";

import type { Project } from "@/types";
import { db } from "@/lib/firebase/admin";
import { PROJECT_COLLECTION } from "@/lib/utils";

import {
  createProjectFormSchema,
  addIdentityFormSchema,
} from "@/config/formSchema";

// NOTE:
// - check the note-app project
// - use analytics inside catch block
export async function createProjectAction(
  values: z.infer<typeof createProjectFormSchema>,
): Promise<{ success: boolean; error?: string } | undefined> {
  // Validate the data
  const { success, data } = createProjectFormSchema.safeParse(values);
  if (!success) {
    return {
      success: false,
      error: "Invalid form data. Please check your inputs.",
    };
  }

  const id = data.title.trim().toLowerCase().replace(/\s+/g, "-");

  // Write the new project if the id not exist yet
  const ref = db.collection(PROJECT_COLLECTION).doc(id);
  try {
    await db.runTransaction(async (transaction) => {
      const doc = await transaction.get(ref);

      // TODO: this soulnd not use the id for fetch but instead use title
      if (doc.exists) {
        throw new Error(
          `A project with the name "${data.title}" already exists. Please choose a different name.`,
        );
      }

      // Add new project
      transaction.set(ref, {
        ...data,
        createdAt: Timestamp.now(),
      } satisfies Project);
    });
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }

  // If successful, revalidate cache and redirect
  revalidatePath("/home");
  redirect(`/${id}/identitas-proyek`);
}

export async function addIdentityAction(
  values: z.infer<typeof addIdentityFormSchema>,
  projectId: string,
) {
  const { success, data } = addIdentityFormSchema.safeParse(values);
  if (!success) {
    return {
      success: false,
      error: "Invalid form data. Please check your inputs.",
    };
  }

  const ref = db
    .collection(PROJECT_COLLECTION)
    .doc(projectId)
    .collection("identities");
  try {
    await db.runTransaction(async (transaction) => {
      // Get the count of existing identities
      const snapshot = await transaction.get(ref);
      const count = snapshot.size; // Number of existing documents

      // Add new identity with incremented 'no' field
      const newDocRef = ref.doc(); // Auto-generate ID
      transaction.set(newDocRef, {
        no: count + 1, // Assign number based on existing count
        ...data,
      });
    });
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }

  revalidatePath(`${projectId}/gambar-desain`);
}
