"use server";

import { revalidatePath } from "next/cache";

import { UTApi } from "uploadthing/server";
import { FieldValue } from "firebase-admin/firestore";

import { auth } from "@/auth";
import { db } from "@/lib/firebase/admin";
import { deleteDocumentWithSubcollections } from "@/lib/firebase/utils";
import { PROJECT_COLLECTION } from "@/lib/utils";

const utapi = new UTApi();

export async function deleteProjectAction(id: string) {
  if (!id) return { success: false, error: "Invalid." };

  const attachmentsRef = db
    .collection(PROJECT_COLLECTION)
    .doc(id)
    .collection("attachments");
  try {
    // delete all image in uploadthing
    const snapshot = await attachmentsRef.get();
    // TODO: might not delete images here but inside the utility function
    await utapi.deleteFiles(snapshot.docs.map((doc) => doc.id));

    await deleteDocumentWithSubcollections(PROJECT_COLLECTION, id);

    revalidatePath("home");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteAttachmentAction(key: string, projectId: string) {
  if (!key || !projectId) return { success: false, error: "Invalid." };

  const session = await auth();
  if (!session || !session.user.isAdmin)
    return { success: false, error: "Unautorhized" };

  const projectRef = db.collection(PROJECT_COLLECTION).doc(projectId);
  const targetRef = projectRef.collection("attachments").doc(key);

  try {
    await utapi.deleteFiles(key);
    await targetRef.delete();

    revalidatePath(`${projectId}/gambar-desain`);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteTeamMemberAction(
  id: string,
  attachmentKey: string | undefined,
  projectId: string,
) {
  if (!id || !projectId) return { success: false, error: "Invalid." };

  const session = await auth();
  if (!session || !session.user.isAdmin)
    return { success: false, error: "Unautorhized" };

  const projectRef = db.collection(PROJECT_COLLECTION).doc(projectId);
  const teamRef = projectRef.collection("teams").doc(id);

  try {
    await teamRef.delete();
    attachmentKey && deleteTeamMemberFileAction(attachmentKey, projectId);

    revalidatePath(`${projectId}/tim-pelaksana`);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteTeamMemberFileAction(
  attachmentKey: string | undefined,
  projectId: string,
  teamId?: string,
) {
  if (!attachmentKey) return { success: false, error: "Invalid." };

  const session = await auth();
  if (!session || !session.user.isAdmin)
    return { success: false, error: "Unautorhized" };

  const projectRef = db.collection(PROJECT_COLLECTION).doc(projectId);
  const attachmentsRef = projectRef
    .collection("attachments")
    .doc(attachmentKey);

  try {
    await Promise.all([
      utapi.deleteFiles(attachmentKey),
      attachmentsRef.delete(),
      teamId &&
        projectRef
          .collection("teams")
          .doc(teamId)
          .update({ attachment: FieldValue.delete() }),
    ]);

    revalidatePath(`${projectId}/tim-pelaksana`);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: (error as Error).message };
  }
}

// NOTE: track error inside catch block
export async function deleteIdentityAction(id: string, projectId: string) {
  if (!id || !projectId) return { success: false, error: "Invalid." };

  const projectRef = db.collection(PROJECT_COLLECTION).doc(projectId);
  const identitiesRef = projectRef.collection("identities");
  const targetRef = identitiesRef.doc(id);

  try {
    await db.runTransaction(async (transaction) => {
      // Read the document to be deleted
      const targetSnapshot = await transaction.get(targetRef);
      if (!targetSnapshot.exists) {
        throw new Error("Identity not found.");
      }

      const targetNo = targetSnapshot.data()?.no;

      // TODO: this should not necessary, can use high number position instead
      // Read all documents with 'no' greater than the deleted one
      const snapshot = await transaction.get(
        identitiesRef.where("no", ">", targetNo),
      );

      // Perform all writes (delete & decrement)
      transaction.delete(targetRef);
      snapshot.docs.forEach((doc) => {
        transaction.update(doc.ref, { no: doc.data().no - 1 });
      });
    });

    revalidatePath(`${projectId}/gambar-desain`);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: (error as Error).message };
  }
}
