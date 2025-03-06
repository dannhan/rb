import { z } from "zod";

export const projectSchema = z.object({
  title: z.string(),
  type: z.string(),
  createdAt: z.any(),

  // teams: z.array(z.string()).optional(),
  // identities: z.array(z.string()).optional(),
  // designImages: z.array(z.string()).optional(),
  // projectSchedule: z.string().optional(),
  // costRealization: z.string().optional(),
});

export const identitySchema = z.object({
  // TODO: might change no to position instead
  no: z.number(),
  field: z.string(),
  value: z.string(),
});

export const attachmentCategorySchema = z.enum([
  "teamMemberFile",
  "designImage",
  "rabFile",
  "projectSchedule",
  "costRealization",
  "locationMap",
]);

export const attachmentSchema = z.object({
  name: z.string(),
  size: z.number(),
  type: z.string(),
  key: z.string(),
  url: z.string(),
  appUrl: z.string(),
  category: attachmentCategorySchema,
});

export const teamMemberSchema = z.object({
  position: z.number().int().positive(),
  pekerjaan: z.string(),
  spk: z.string(),
  pelaksana: z.string(),
  status: z.string(),

  // TODO: implement file for team table
  // file: fileSchema.optional(),
});

export const progressItemSchema = z.object({
  position: z.number().int().positive(),
  description: z.string(),
  progress: z.record(z.string(), z.number().min(0).max(100)), // Maps week identifiers to percentage values (0-100)
});

export const storeLocationSchema = z.object({
  title: z.string(),
  address: z.string(),
  link: z.string(),
  lat: z.number(),
  lng: z.number(),
});
