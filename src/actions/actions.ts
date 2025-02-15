"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { Timestamp } from "firebase-admin/firestore";
import { z } from "zod";

import type { Project } from "@/types";
import { db } from "@/lib/firebase/admin";
import { PROJECT_COLLECTION } from "@/lib/utils";

import { createProjectFormSchema } from "@/config/formSchema";

// NOTE: might check the note-app project
export async function createProjectAction(
  values: z.infer<typeof createProjectFormSchema>,
): Promise<{ success: false; error: string } | undefined> {
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
    // NOTE: might use analytics here
    return { success: false, error: (error as Error).message };
  }

  // If successful, revalidate cache and redirect
  revalidatePath("/home");
  redirect(`/${id}/identitas-proyek`);
}
