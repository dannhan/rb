"use server";

import { revalidatePath } from "next/cache";

import { z } from "zod";

import { auth } from "@/auth";
import { db } from "@/lib/firebase/admin";
import { PROJECT_COLLECTION } from "@/lib/utils";

import { updateIdentityFormSchema } from "@/config/formSchema";

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

  const ref = db.collection(PROJECT_COLLECTION).doc(id);
  await ref.update({ title });

  revalidatePath("home");
  return { success: true };
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
    const ref = db
      .collection(PROJECT_COLLECTION)
      .doc(projectId)
      .collection("identities")
      .doc(identityId);

    await ref.update({ ...data });

    // Refresh cache for UI updates
    revalidatePath(`${projectId}/gambar-desain`);

    return { success: true };
  } catch (error) {
    console.error("Error updating identity:", error);
    return { success: false, error: (error as Error).message };
  }
}
