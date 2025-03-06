"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { Timestamp } from "firebase-admin/firestore";
import { z } from "zod";

import type { Project, TeamMember, Identity } from "@/types";

import { auth } from "@/auth";
import { db } from "@/lib/firebase/admin";
import { PROJECT_COLLECTION } from "@/lib/utils";
import { nanoid } from "@/lib/nanoid";

import {
  createProjectFormSchema,
  addTeamMemberFormSchema,
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

  // Check if a project with the same title already exists
  const existingProjectQuery = await db
    .collection(PROJECT_COLLECTION)
    .where("title", "==", data.title)
    .get();

  if (!existingProjectQuery.empty) {
    return {
      success: false,
      error: `A project with the name "${data.title}" already exists. Please choose a different name.`,
    };
  }

  // Generate a unique ID for the new project
  const id = nanoid();
  const ref = db.collection(PROJECT_COLLECTION).doc(id);

  try {
    // Add new project
    await ref.set({
      ...data,
      createdAt: Timestamp.now(),
    } satisfies Project);
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }

  // If successful, revalidate cache and redirect
  revalidatePath("/home");
  redirect(`/${id}/identitas-proyek`);
}

export async function addTeamMemberAction(
  values: z.infer<typeof addTeamMemberFormSchema>,
  projectId: string,
) {
  // Check user authentication
  const session = await auth();
  if (!session || !session.user.isAdmin)
    return { success: false, error: "Unauthorized" };

  // Validate the data
  const { success, data } = addTeamMemberFormSchema.safeParse(values);
  if (!success) {
    return {
      success: false,
      error: "Invalid form data. Please check your inputs.",
    };
  }

  const teamsCollection = db
    .collection(PROJECT_COLLECTION)
    .doc(projectId)
    .collection("teams");

  return db.runTransaction(async (transaction) => {
    // 🔥 Get the last item's position
    const lastItemSnapshot = await transaction.get(
      teamsCollection.orderBy("position", "desc").limit(1),
    );

    // ✅ Add new team member
    const newProgress = {
      position: lastItemSnapshot.empty
        ? 1000
        : lastItemSnapshot.docs[0].data().position + 1000,
      status: "On Progress",
      ...data,
    } satisfies TeamMember;

    const ref = teamsCollection.doc();
    transaction.set(ref, newProgress);

    revalidatePath(`${projectId}/gambar-desain`);
    return { success: true };
  });
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
      } satisfies Identity);
    });
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }

  revalidatePath(`${projectId}/gambar-desain`);
}

export async function addProgressItemAction({
  projectId,
}: {
  projectId: string;
}): Promise<
  | { success: false; error: string }
  | { success: true; progressId: string; position: number }
> {
  const session = await auth();
  if (!session || !session.user.isAdmin)
    return { success: false, error: "Unauthorized" };

  const progressCollection = db
    .collection(PROJECT_COLLECTION)
    .doc(projectId)
    .collection("progress");

  return db.runTransaction(async (transaction) => {
    // 🔥 Get the last item's position
    const lastItemSnapshot = await transaction.get(
      progressCollection.orderBy("position", "desc").limit(1),
    );

    let newPosition = 1000; // Default position if no items exist
    if (!lastItemSnapshot.empty) {
      newPosition = lastItemSnapshot.docs[0].data().position + 1000;
    }

    // ✅ Add new progress item
    const newProgress = {
      description: "",
      progress: {},
      position: newPosition,
    };

    const ref = progressCollection.doc();
    transaction.set(ref, newProgress);

    return { success: true, progressId: ref.id, position: newPosition };
  });
}

// TODO: change the structure of week and progress
export async function addProgressWeekAction({
  projectId,
  week,
}: {
  projectId: string;
  week: string;
}) {
  const session = await auth();
  if (!session || !session.user.isAdmin)
    return { success: false, error: "Unauthorized" };

  const progressRef = db
    .collection(PROJECT_COLLECTION)
    .doc(projectId)
    .collection("progress");

  const progressDocs = await progressRef.get();
  const batch = db.batch();

  progressDocs.forEach((doc) => {
    batch.update(doc.ref, {
      [`progress.${week}`]: 0, // Default value for the new week
    });
  });

  await batch.commit();

  // need for the change to be visible
  revalidatePath("/home");

  return { success: true };
}
