"use server";

import { UTApi } from "uploadthing/server";
import { z } from "zod";

import { db } from "@/lib/firebase/admin";
import { adminAction } from "@/lib/safe-action";
import { projectRef as getProjectRef } from "@/lib/firebase/utils";

const utapi = new UTApi();

export const deleteTeamMemberAction = adminAction
  .schema(
    z.object({ id: z.string(), fileKeys: z.array(z.string()).optional() }),
  )
  .bindArgsSchemas([z.object({ project: z.string() })])
  .action(async ({ parsedInput, bindArgsParsedInputs: [params] }) => {
    const { id, fileKeys = [] } = parsedInput;
    const projectRef = getProjectRef(params);

    try {
      const batch = db.batch();
      batch.delete(projectRef.collection("teams").doc(id));
      fileKeys.forEach((key) =>
        batch.delete(projectRef.collection("attachments").doc(key)),
      );

      await batch.commit();
      await utapi.deleteFiles(fileKeys);

      return { success: true, result: { id } };
    } catch (error) {
      console.error(error);
      return { success: false, error: (error as Error).message };
    }
  });
