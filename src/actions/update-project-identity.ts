"use server";

import { z } from "zod";
import { adminAction } from "@/lib/utils/safe-action";
import { projectRef } from "@/lib/firebase/utils";

export const updateIdentityAction = adminAction
  .schema(z.object({ field: z.string(), value: z.string() }))
  .bindArgsSchemas([z.string(), z.object({ project: z.string() })])
  .action(async ({ parsedInput, bindArgsParsedInputs: [id, params] }) => {
    const data = parsedInput;

    try {
      await projectRef(params).collection("identities").doc(id).update(data);

      return { success: true, result: { id, ...data } };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  });
