"use server";

import { revalidatePath } from "next/cache";

import { z } from "zod";
import { UTApi } from "uploadthing/server";

import type { ProgressWeek } from "@/types";
import { auth } from "@/auth";
import { db } from "@/lib/firebase/admin";
import { PROJECT_COLLECTION } from "@/lib/utils";

import {
  updateIdentityFormSchema,
  updateTeamMemberFormSchema,
} from "@/config/formSchema";
import { projectLocationSchema } from "@/config/dataSchema";

const utapi = new UTApi();

export async function updateProjectTitleAction({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const session = await auth();
  if (!session || !session.user.isAdmin)
    return { success: false, error: "Unautorhized" };

  // TODO: there is bug here, when the path is not exist it just return success
  const ref = db.collection(PROJECT_COLLECTION).doc(id);
  await ref.update({ title });

  revalidatePath("home");
  return { success: true };
}

export async function updateTeamMemberStatusAction({
  projectId,
  teamId,
  status,
}: {
  projectId: string;
  teamId: string;
  status: string;
}) {
  // Only manager can change the status
  const session = await auth();
  if (!session || session.user.isAdmin)
    return { success: false, error: "Unautorhized" };

  try {
    const ref = db
      .collection(PROJECT_COLLECTION)
      .doc(projectId)
      .collection("teams")
      .doc(teamId);
    await ref.update({ status });

    revalidatePath(`${projectId}/tim-pelaksana`);
    return { success: true };
  } catch (error) {
    console.error("Error updating team member status:", error);
    return { success: false, error: (error as Error).message };
  }
}

export async function updateTeamMemberAction({
  projectId,
  teamId,
  values,
}: {
  projectId: string;
  teamId: string;
  values: z.infer<typeof updateTeamMemberFormSchema>;
}) {
  const session = await auth();
  if (!session || !session.user.isAdmin)
    return { success: false, error: "Unautorhized" };

  // Validate data before updating Firestore
  const { success, data } = updateTeamMemberFormSchema.safeParse(values);
  if (!success)
    return {
      success: false,
      error: "Invalid form data. Please check your inputs.",
    };

  try {
    const ref = db
      .collection(PROJECT_COLLECTION)
      .doc(projectId)
      .collection("teams")
      .doc(teamId);
    await ref.update({ ...data });

    revalidatePath(`${projectId}/tim-pelaksana`);
    return { success: true };
  } catch (error) {
    console.error("Error updating team member:", error);
    return { success: false, error: (error as Error).message };
  }
}

export async function updateIdentityAction({
  projectId,
  identityId,
  values,
}: {
  projectId: string;
  identityId: string;
  values: z.infer<typeof updateIdentityFormSchema>;
}) {
  // Validate data before updating Firestore
  const { success, data } = updateIdentityFormSchema.safeParse(values);
  if (!success)
    return {
      success: false,
      error: "Invalid form data. Please check your inputs.",
    };

  try {
    // TODO: there is bug here, when the path is not exist it just return success
    const ref = db
      .collection(PROJECT_COLLECTION)
      .doc(projectId)
      .collection("identities")
      .doc(identityId);
    await ref.update({ ...data });

    revalidatePath(`${projectId}/gambar-desain`);
    return { success: true };
  } catch (error) {
    console.error("Error updating identity:", error);
    return { success: false, error: (error as Error).message };
  }
}

// This will be called when user update location detail without changing the
// image or just deleting the image
export async function updateProjectLocationWithoutImageAction({
  projectId,
  values,
  oldImageKey,
}: {
  projectId: string;
  // using the data schema for retainging the image
  values: z.infer<typeof projectLocationSchema>;
  oldImageKey?: string;
}) {
  // Check user authentication
  const session = await auth();
  if (!session || !session.user.isAdmin)
    return { success: false, error: "Unauthorized" };

  const parsed = projectLocationSchema.safeParse(values);
  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid form data. Please check your inputs.",
    };
  }

  const projectRef = db.collection(PROJECT_COLLECTION).doc(projectId);

  try {
    oldImageKey &&
      (await Promise.all([
        utapi.deleteFiles(oldImageKey),
        projectRef.collection("attachments").doc(oldImageKey).delete(),
      ]));
    await projectRef.update({ location: parsed.data });

    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function updateAttachmentDescriptionAction({
  attachmentId,
  projectId,
  description,
}: {
  attachmentId: string;
  projectId: string;
  description: string;
}) {
  // Check user authentication
  const session = await auth();
  if (!session || !session.user.isAdmin)
    return { success: false, error: "Unauthorized" };

  const projectRef = db.collection(PROJECT_COLLECTION).doc(projectId);
  const attachmentRef = projectRef.collection("attachments").doc(attachmentId);

  try {
    await attachmentRef.update({ description });

    // No need for revalidePath here, using state on client side
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function updateProgressItemDescriptionAction(
  projectId: string,
  { id, description }: { id: string; description: string },
) {
  const session = await auth();
  if (!session || !session.user.isAdmin)
    return { success: false, error: "Unautorhized" };

  try {
    await db
      .collection(PROJECT_COLLECTION)
      .doc(projectId)
      .collection("progress-items")
      .doc(id)
      .update({ description });

    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function updateProgressValueAction(
  projectId: string,
  { id, weekId, value }: { id: string; weekId: string; value: number },
) {
  const session = await auth();
  if (!session || !session.user.isAdmin)
    return { success: false, error: "Unautorhized" };

  try {
    await db
      .collection(PROJECT_COLLECTION)
      .doc(projectId)
      .collection("progress-items")
      .doc(id)
      .update({ [`progress.${weekId}`]: value });

    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function updateProgressWeekAction(
  projectId: string,
  { id, weekCount, date }: { id: string; weekCount: number; date: Date },
) {
  const session = await auth();
  if (!session || !session.user.isAdmin)
    return { success: false, error: "Unauthorized" };

  const projectRef = db.collection(PROJECT_COLLECTION).doc(projectId);
  const weeksRef = projectRef.collection("progress-weeks").doc(id);

  try {
    await weeksRef.update({
      weekCount,
      date: new Date(date).toISOString(),
    } satisfies ProgressWeek);
    revalidatePath(`${projectId}/progress-proyek`);

    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
