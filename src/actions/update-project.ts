"use server";

import { revalidatePath } from "next/cache";

import { z } from "zod";
import { adminAction } from "@/lib/utils/safe-action";

import { db } from "@/lib/firebase/admin";
import { PROJECT_COLLECTION } from "@/lib/utils/constants";

const schema = z.object({
  title: z.string().min(1),
});

export const updateProjectAction = adminAction
  .schema(schema)
  .bindArgsSchemas([z.string()])
  .action(async ({ parsedInput, bindArgsParsedInputs: [id] }) => {
    const data = { ...parsedInput };

    try {
      await db.collection(PROJECT_COLLECTION).doc(id).update(data);
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }

    revalidatePath("/home");
  });
