"use server";

import { FieldValue } from "firebase-admin/firestore";
import { UTApi } from "uploadthing/server";
import { z } from "zod";

import { db } from "@/lib/firebase/admin";
import { projectRef as getProjectRef } from "@/lib/firebase/utils";
import { adminAction } from "@/lib/utils/safe-action";
import { getFileKey } from "@/lib/utils/get-file-key";

const utapi = new UTApi();

export const deleteDesignDrawingImageAction = adminAction
  .schema(z.object({ id: z.string(), imageURL: z.string() }))
  .bindArgsSchemas([z.object({ project: z.string() })])
  .action(async ({ parsedInput, bindArgsParsedInputs: [params] }) => {
    const { id, imageURL } = parsedInput;
    const projectRef = getProjectRef(params);
    const categoryRef = projectRef
      .collection("design-drawing-categories")
      .doc(id);

    try {
      const imageKey = getFileKey(imageURL);
      if (!imageKey) throw new Error("Not valid image URL");

      const batch = db.batch();
      batch.delete(projectRef.collection("attachments").doc(imageKey));
      batch.update(categoryRef, {
        imageURLs: FieldValue.arrayRemove(imageURL),
      });

      await batch.commit();
      await utapi.deleteFiles(imageKey);

      return { success: true, result: { id } };
    } catch (error) {
      console.error(error);
      return { success: false, error: (error as Error).message };
    }
  });
