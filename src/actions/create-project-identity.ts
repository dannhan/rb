"use server";

import { z } from "zod";
import { adminAction } from "@/lib/safe-action";
import { projectRef } from "@/lib/firebase/utils";
import { nanoid } from "@/lib/nanoid";
import { Identity } from "@/types";

export const createIdentityAction = adminAction
  .schema(z.object({ field: z.string(), value: z.string() }))
  .bindArgsSchemas([z.number(), z.object({ project: z.string() })])
  .action(async ({ parsedInput, bindArgsParsedInputs: [position, params] }) => {
    const id = nanoid();
    const data = { ...parsedInput, position } satisfies Identity;

    try {
      await projectRef(params).collection("identities").doc(id).set(data);

      return { success: true, result: { ...data, id } };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  });
