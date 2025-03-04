"use server";

import { revalidatePath } from "next/cache";

import { z } from "zod";

import { auth } from "@/auth";
import { db } from "@/lib/firebase/admin";
import { PROJECT_COLLECTION } from "@/lib/utils";

import {
  updateIdentityFormSchema,
  updateTeamMemberFormSchema,
} from "@/config/formSchema";

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
  const session = await auth();
  if (!session || !session.user.isAdmin)
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

export async function updateDesignImageAction() { }

export async function updateProgressItemDescriptionAction({
  projectId,
  progressId,
  description,
}: {
  projectId: string;
  progressId: string;
  description: string;
}) {
  const session = await auth();
  if (!session || !session.user.isAdmin)
    return { success: false, error: "Unautorhized" };

  const ref = db
    .collection(PROJECT_COLLECTION)
    .doc(projectId)
    .collection("progress")
    .doc(progressId);

  await ref.update({ description });

  return { success: true };
}

export async function updateProgressValueAction({
  projectId,
  progressId,
  week,
  value,
}: {
  projectId: string;
  progressId: string;
  week: string;
  value: number;
}) {
  const session = await auth();
