"use server";

import { z } from "zod";

import { ProgressItem } from "@/types";
import { adminAction } from "@/lib/safe-action";
import { projectRef } from "@/lib/firebase/utils";
import { nanoid } from "@/lib/nanoid";

const weekSchema = z.object({
  weekCount: z.number(),
  date: z.date(),
});

export const createProgressWeekAction = adminAction
  .schema(weekSchema)
  .bindArgsSchemas([z.object({ project: z.string() }), z.null()])
  .action(async ({ parsedInput, bindArgsParsedInputs: [params] }) => {
    const id = nanoid();
    const data = { ...parsedInput, date: parsedInput.date.toISOString() };

    try {
      await projectRef(params).collection("progress-weeks").doc(id).set(data);
      return { success: true, result: { ...data, id } };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  });

export const createProgressItemAction = adminAction
  .bindArgsSchemas([z.string(), z.number(), z.object({ project: z.string() })])
  .action(async ({ bindArgsParsedInputs: [id, position, params] }) => {
    const data = {
      position,
      description: "",
      progress: {},
    } satisfies ProgressItem;
    try {
      await projectRef(params).collection("progress-items").doc(id).set(data);
      return { success: true, result: { ...data, id } };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  });
