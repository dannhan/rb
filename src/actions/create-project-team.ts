"use server";

import { z } from "zod";

import type { TeamMember } from "@/types";
import { adminAction } from "@/lib/utils/safe-action";
import { projectRef } from "@/lib/firebase/utils";
import { nanoid } from "@/lib/utils/nanoid";

const schema = z.object({
  pekerjaan: z.string(),
  spk: z.string(),
  pelaksana: z.string(),
});

export const createTeamMemberAction = adminAction
  .schema(schema)
  .bindArgsSchemas([z.number(), z.object({ project: z.string() })])
  .action(async ({ parsedInput, bindArgsParsedInputs: [position, params] }) => {
    const id = nanoid();
    const data = {
      ...parsedInput,
      status: "On Progress",
      position,
    } satisfies TeamMember;

    try {
      await projectRef(params).collection("teams").doc(id).set(data);

      return { success: true, result: { ...data, id } };
    } catch (error) {
      console.error(error);
      return { success: false, error: (error as Error).message };
    }
  });
