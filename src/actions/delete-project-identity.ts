"use server";

import { z } from "zod";
import { adminAction } from "@/lib/utils/safe-action";
import { projectRef } from "@/lib/firebase/utils";

export const deleteIdentityAction = adminAction
  .schema(z.string())
  .bindArgsSchemas([z.object({ project: z.string() })])
  .action(async ({ parsedInput: id, bindArgsParsedInputs: [params] }) => {
    try {
      await projectRef(params).collection("identities").doc(id).delete();

      return { success: true, result: { id } };
    } catch (error) {
      console.error(error);
      return { success: false, error: (error as Error).message };
    }
  });
