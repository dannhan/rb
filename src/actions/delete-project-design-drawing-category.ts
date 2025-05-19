"use server";

import { UTApi } from "uploadthing/server";
import { z } from "zod";

import { db } from "@/lib/firebase/admin";
import { adminAction } from "@/lib/utils/safe-action";
import { getFileKey } from "@/lib/utils/get-file-key";
import { projectRef as getProjectRef } from "@/lib/firebase/utils";

const utapi = new UTApi();

export const deleteDesignDrawingCategoryAction = adminAction
  .schema(
    z.object({ id: z.string(), imageURLs: z.array(z.string()).optional() }),
  )
  .bindArgsSchemas([z.object({ project: z.string() })])
  .action(async ({ parsedInput, bindArgsParsedInputs: [params] }) => {
    const { id, imageURLs } = parsedInput;
    const projectRef = getProjectRef(params);

    try {
      const imageKeys = imageURLs?.map((u) => {
        const key = getFileKey(u);
        if (key === null) throw new Error("One of the URL is not valid");

        return key;
      });

      const batch = db.batch();
      batch.delete(projectRef.collection("design-drawing-categories").doc(id));
      imageKeys?.forEach((key) =>
        batch.delete(projectRef.collection("attachments").doc(key)),
      );

      await batch.commit();
      await utapi.deleteFiles(imageKeys || []);

      return { success: true, result: { id } };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  });
