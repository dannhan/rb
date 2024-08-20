import { z } from "zod";

export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
});

export const projectSchema = z.object({
  title: z.string(),
  slug: z.string(),
  type: z.string(),
});

export const teamSchema = z.object({
  id: z.number(),
  pekerjaan: z.string(),
  spk: z.string(),
  pelaksana: z.string(),
  status: z.string(),
});
