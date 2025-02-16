import { z } from "zod";

export const createProjectFormSchema = z.object({
  title: z.string().min(1, "Project name is required.").trim(),
  type: z.string().min(3, "Please select a type.").trim(),
});

export const addIdentityFormSchema = z.object({
  field: z.string().min(0, "Required").trim(),
  value: z.string().min(0, "Required").trim(),
});

export const updateIdentityFormSchema = addIdentityFormSchema;
