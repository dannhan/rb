"use server";

import { revalidatePath } from "next/cache";
import { UTApi } from "uploadthing/server";
import { z } from "zod";

import { db } from "@/lib/firebase/admin";
import { adminAction } from "@/lib/safe-action";
import { PROJECT_COLLECTION } from "@/lib/utils";
import { deleteDocumentWithSubcollections } from "@/lib/firebase/utils";

const utapi = new UTApi();

export const deleteProjectAction = adminAction
  .schema(z.string())
  .action(async ({ parsedInput: id }) => {
    const attachmentsRef = db
      .collection(PROJECT_COLLECTION)
      .doc(id)
      .collection("attachments");

    try {
      // The reason why we have redundant attachment db
      const snapshot = await attachmentsRef.get();
      await utapi.deleteFiles(snapshot.docs.map((doc) => doc.id));
      await deleteDocumentWithSubcollections(PROJECT_COLLECTION, id);

      // NOTE: Do i need to revalide in here, or can i just use state instead?
      revalidatePath("home");
      return { success: true, result: { id } };
    } catch (error) {
      console.error(error);
      return { success: false, error: (error as Error).message };
    }
  });
