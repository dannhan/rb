"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/firebase/admin";
import { deleteDocumentWithSubcollections } from "@/lib/firebase/utils";

import { PROJECT_COLLECTION } from "@/lib/utils";

export async function deleteProjectAction(id: string) {
  if (!id) return { success: false, error: "Invalid." };

  try {
    await deleteDocumentWithSubcollections(PROJECT_COLLECTION, id);

    revalidatePath("home");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteTeamMemberAction(id: string, projectId: string) {
  if (!id || !projectId) return { success: false, error: "Invalid." };

  const projectRef = db.collection(PROJECT_COLLECTION).doc(projectId);
  const teamsRef = projectRef.collection("teams");
  const targetRef = teamsRef.doc(id);

  try {
    await targetRef.delete();

    revalidatePath(`${projectId}/gambar-desain`);
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
