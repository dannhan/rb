"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { z } from "zod";
import { adminAction } from "@/lib/safe-action";

import { db } from "@/lib/firebase/admin";
import { PROJECT_COLLECTION } from "@/lib/utils";
import { nanoid } from "@/lib/nanoid";

const schema = z.object({
  title: z.string().min(1),
  type: z.enum(["konstruksi", "renovasi"]),
});

export const createProjectAction = adminAction
  .schema(schema)
  .action(async ({ parsedInput }) => {
    const id = nanoid();
    const data = { ...parsedInput, createdAt: new Date().toISOString() };

    try {
      await db.collection(PROJECT_COLLECTION).doc(id).set(data);
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }

    revalidatePath("/home");
    redirect(`/${id}/identitas-proyek`);
  });
