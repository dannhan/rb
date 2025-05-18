"use server";

import { revalidatePath } from "next/cache";

import { z } from "zod";
import { adminAction } from "@/lib/safe-action";
import { projectRef } from "@/lib/firebase/utils";

const weekSchema = z.object({
  weekCount: z.number(),
  date: z.date(),
});

export const updateProgressWeekAction = adminAction
  .schema(weekSchema)
  .bindArgsSchemas([z.string(), z.object({ project: z.string() })])
  .action(async ({ parsedInput, bindArgsParsedInputs: [id, params] }) => {
    const data = { ...parsedInput, date: parsedInput.date.toISOString() };
    const ref = projectRef(params).collection("progress-weeks").doc(id);

    try {
      await ref.update(data);
      return { success: true, result: { ...data, id } };
    } catch (error) {
      console.error(error);
      return { success: false, error: (error as Error).message };
    }
  });

const itemSchema = z.object({
  description: z.string(),
  progress: z.record(z.string(), z.number().min(0).max(100)),
});

export const updateProgressItemAction = adminAction
  .schema(itemSchema)
  .bindArgsSchemas([z.string(), z.object({ project: z.string() })])
  .action(async ({ parsedInput, bindArgsParsedInputs: [id, params] }) => {
    const data = parsedInput;

    try {
      const ref = projectRef(params).collection("progress-items").doc(id);
      await ref.update(data);

      revalidatePath(`${params.project}/progress`);
      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  });
