"use server";

import { revalidatePath } from "next/cache";

import { z } from "zod";
import { adminAction } from "@/lib/safe-action";
import { projectRef } from "@/lib/firebase/utils";

export const deleteProgressItemAction = adminAction
  .schema(z.string())
  .bindArgsSchemas([z.object({ project: z.string() })])
  .action(async ({ parsedInput: id, bindArgsParsedInputs: [params] }) => {
    try {
      await projectRef(params).collection("teams").doc(id).delete();

      revalidatePath(`${params.project}/progress`);
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, error: (error as Error).message };
    }
  });
