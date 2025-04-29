"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { Timestamp } from "firebase-admin/firestore";
import { z } from "zod";

import type {
  Project,
  TeamMember,
  Identity,
  DesignImageSubcategory,
} from "@/types";

import { auth } from "@/auth";
import { db } from "@/lib/firebase/admin";
import { PROJECT_COLLECTION } from "@/lib/utils";
import { nanoid } from "@/lib/nanoid";

import {
  createProjectFormSchema,
  addTeamMemberFormSchema,
  addIdentityFormSchema,
  createDesignImageSubcategoryFormSchema,
  createProjectLocationFormSchema,
} from "@/config/formSchema";

// NOTE: check the note-app project, use analytics inside catch block
export async function createProjectAction(
  values: z.infer<typeof createProjectFormSchema>,
): Promise<{ success: boolean; error?: string } | undefined> {
  // Check user authentication
  const session = await auth();
  if (!session || !session.user.isAdmin)
    return { success: false, error: "Unauthorized" };

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
    // Get the last item's position
    const lastItemSnapshot = await transaction.get(
      teamsCollection.orderBy("position", "desc").limit(1),
    );

    // Add new team member
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
  // Check user authentication
  const session = await auth();
  if (!session || !session.user.isAdmin)
    return { success: false, error: "Unauthorized" };

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

export async function createDesignImageSubcategoryAction({
  projectId,
  values,
}: {
  projectId: string;
  values: z.infer<typeof createDesignImageSubcategoryFormSchema>;
}) {
  // Check user authentication
  const session = await auth();
  if (!session || !session.user.isAdmin)
    return { success: false, error: "Unauthorized" };

  // Validate the data
  const parsed = createDesignImageSubcategoryFormSchema.safeParse(values);
  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid form data. Please check your inputs.",
    };
  }

  const ref = db
    .collection(PROJECT_COLLECTION)
    .doc(projectId)
    .collection("design-image-subcategories");

  try {
    await ref.add({
      ...parsed.data,
      createAt: Timestamp.now(),
    } satisfies DesignImageSubcategory);

    revalidatePath(`/${projectId}/gambar-desain`);
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

// This will be called when create location detail at new project, but without
// uploading any image
export async function createProjectLocationWithoutImageAction({
  projectId,
  values,
}: {
  projectId: string;
  values: Omit<z.infer<typeof createProjectLocationFormSchema>, "image">;
}) {
  // Check user authentication
  const session = await auth();
  if (!session || !session.user.isAdmin)
    return { success: false, error: "Unauthorized" };

  const parsed = createProjectLocationFormSchema
    .omit({ image: true })
    .safeParse(values);
  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid form data. Please check your inputs.",
    };
  }

  const ref = db.collection(PROJECT_COLLECTION).doc(projectId);

  try {
    await ref.update({ location: parsed.data });

    revalidatePath(`/${projectId}/lokadi`);
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function addProgressItemAction(
  projectId: string,
  { id, position }: { id: string; position: number },
) {
  const session = await auth();
  if (!session || !session.user.isAdmin)
    return { success: false, error: "Unauthorized" };

  const projectRef = db.collection(PROJECT_COLLECTION).doc(projectId);
  const itemsCollection = projectRef.collection("progress-items").doc(id);

  try {
    const data = { position, description: "", progress: {} };
    await itemsCollection.set(data);

    revalidatePath(`${projectId}/progress-proyek`);
    return { success: true, data: { id, ...data } };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function addProgressWeekAction(
  projectId: string,
  { weekCount, date }: { weekCount: number; date: Date },
) {
  const session = await auth();
  if (!session || !session.user.isAdmin)
    return { success: false, error: "Unauthorized" };

  const projectRef = db.collection(PROJECT_COLLECTION).doc(projectId);
  const weeksRef = projectRef.collection("progress-weeks");

  try {
    await weeksRef.add({ weekCount, date: Timestamp.fromDate(date) });
    revalidatePath(`${projectId}/progress-proyek`);

    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
