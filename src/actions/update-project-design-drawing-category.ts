"use server";

import { z } from "zod";

import { adminAction } from "@/lib/utils/safe-action";
import { projectRef } from "@/lib/firebase/utils";

export const updateDesignDrawingCategoryAction = adminAction
  .schema(z.object({ title: z.string() }))
  .bindArgsSchemas([z.string(), z.object({ project: z.string() })])
  .action(async ({ parsedInput, bindArgsParsedInputs: [id, params] }) => {
    const data = { ...parsedInput };

    try {
      await projectRef(params)
        .collection("design-drawing-categories")
        .doc(id)
        .update(data);

      return { success: true, result: { ...data, id } };
    } catch (error) {
      console.error(error);
      return { success: false, error: (error as Error).message };
    }
  });
