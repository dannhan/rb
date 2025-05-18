"use server";

import { z } from "zod";
import { adminAction, managerAction } from "@/lib/safe-action";
import { projectRef } from "@/lib/firebase/utils";

const schema = z.object({
  pekerjaan: z.string(),
  spk: z.string(),
  pelaksana: z.string(),
});

export const updateTeamMemberAction = adminAction
  .schema(schema)
  .bindArgsSchemas([z.string(), z.object({ project: z.string() })])
  .action(async ({ parsedInput, bindArgsParsedInputs: [id, params] }) => {
    const data = parsedInput;

    try {
      await projectRef(params).collection("teams").doc(id).update(data);

      return { success: true, result: { ...data, id, status: "" } };
    } catch (error) {
      console.error(error);
      return { success: false, error: (error as Error).message };
    }
  });

export const updateTeamMemberStatusAction = managerAction
  .schema(z.string())
  .bindArgsSchemas([z.string(), z.object({ project: z.string() })])
  .action(
    async ({ parsedInput: status, bindArgsClientInputs: [id, params] }) => {
      try {
        await projectRef(params).collection("teams").doc(id).update({ status });

        return { success: true, result: { id, status } };
      } catch (error) {
        return { success: false, error: (error as Error).message };
      }
    },
  );
