import { z } from "zod";

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
  subCategory: z.string().optional(),
  createdAt: z.any(),
});

// TODO:
export const projectLocationSchema = z.object({
  detailAddress: z.string(),
  link: z.string().url().or(z.string().min(0).max(0)),
  image: attachmentSchema.optional(),
});

// TODO: change createdAt from any to more specific type
export const projectSchema = z.object({
  title: z.string(),
  type: z.string(),
  createdAt: z.any(),
  location: projectLocationSchema.optional(),
});

export const identitySchema = z.object({
  // TODO: might change no to position instead
  no: z.number(),
  field: z.string(),
  value: z.string(),
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

export const designImageSubcategorySchema = z.object({
  title: z.string(),
  createAt: z.any(),
});

export const progressItemSchema = z.object({
  position: z.number().int().positive(),
  description: z.string(),
  progress: z.record(z.string(), z.number().min(0).max(100)), // Maps week identifiers to percentage values (0-100)
});
