import { z } from "zod";

export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
});

export const projectSchema = z.object({
  title: z.string().trim().min(1, { message: "Project name is required" }),
  type: z.string().trim().min(1, { message: "Project type is required" }),
  slug: z.string().trim(),
});

export const teamSchema = z.object({
  id: z.number(),
  pekerjaan: z.string(),
  spk: z.string(),
  pelaksana: z.string(),
  status: z.string(),
});
