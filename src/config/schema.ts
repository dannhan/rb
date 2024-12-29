import { z } from "zod";

export const projectSchema = z.object({
  slug: z.string().trim(),
  title: z.string().trim().min(1, { message: "Project name is required" }),
  type: z.string().trim().min(1, { message: "Project type is required" }),
  // TODO: remove the optional
  createdAt: z.any().optional(),
  teams: z.array(z.string()).optional(),
  identities: z.array(z.string()).optional(),
  designImages: z.array(z.string()).optional(),
  projectSchedule: z.string().optional(),
  costRealization: z.string().optional(),
});

export const identitySchema = z.object({
  id: z.string(),
  field: z.string().trim(),
  value: z.string().trim(),
  slug: z.string(),
});

export const fileSchema = z.object({
  route: z.string(),
  key: z.string(),
  name: z.string(),
  url: z.string(),
  type: z.string(),
});

export const teamSchema = z.object({
  id: z.string(),
  pekerjaan: z.string().trim(),
  spk: z.string().trim(),
  pelaksana: z.string().trim(),
  status: z.string(),
  slug: z.string(),
  file: fileSchema.optional(),
});

export const storeLocationSchema = z.object({
  title: z.string(),
  address: z.string(),
  link: z.string(),
  lat: z.number(),
  lng: z.number(),
});
