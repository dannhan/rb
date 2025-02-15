import { z } from "zod";

export const createProjectFormSchema = z.object({
  title: z.string().min(1, "Project name is required."),
  type: z.string().min(3, "Please select a type."),
});
