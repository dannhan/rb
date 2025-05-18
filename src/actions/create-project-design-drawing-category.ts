"use server";

import { z } from "zod";

import { DesignDrawingCategory } from "@/types";
import { adminAction } from "@/lib/utils/safe-action";
import { projectRef } from "@/lib/firebase/utils";
import { nanoid } from "@/lib/utils/nanoid";

export const createDesignDrawingCategoryAction = adminAction
  .schema(z.object({ title: z.string() }))
  .bindArgsSchemas([z.object({ project: z.string() }), z.null()])
  .action(async ({ parsedInput, bindArgsParsedInputs: [params] }) => {
    const id = nanoid();
    const data = { ...parsedInput, createdAt: new Date().toISOString() };

    try {
      await projectRef(params)
        .collection("design-drawing-categories")
        .doc(id)
        .set(data satisfies DesignDrawingCategory);

      return { success: true, result: { ...data, id } };
    } catch (error) {
      console.error(error);
      return { success: false, error: (error as Error).message };
    }
  });
