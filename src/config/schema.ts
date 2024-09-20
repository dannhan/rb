import { z } from "zod";

export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
});

export const projectSchema = z.object({
  slug: z.string().trim(),
  title: z.string().trim().min(1, { message: "Project name is required" }),
  type: z.string().trim().min(1, { message: "Project type is required" }),
});

export const projectFormSchema = z.object({
  title: z.string().trim().min(1, { message: "Project name is required" }),
  type: z.string().trim().min(1, { message: "Project type is required" }),
});

export const teamSchema = z.object({
  no: z.number(),
  pekerjaan: z.string(),
  spk: z.string(),
  pelaksana: z.string(),
  status: z.string(),
  checked: z.boolean().optional(),
});

export const teamFormSchema = z.object({
  pekerjaan: z.string().trim().min(1, { message: "Pekerjaan is required" }),
  spk: z.string().trim().min(1, { message: "SPK is required" }),
  pelaksana: z
    .string()
    .trim()
    .min(1, { message: "Pelaksana name is required" }),
  status: z.string().trim().min(1, { message: "Status name is required" }),
});

export const identitySchema = z.object({
  no: z.number(),
  field: z.string(),
  value: z.string(),
});

export const identityFormSchema = z.object({
  field: z.string().trim(),
  value: z.string().trim(),
});

export const storeLocationSchema = z.object({
  address: z.string(),
  link: z.string(),
  lat: z.number(),
  lng: z.number(),
});
