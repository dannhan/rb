// TODO: might just change the createdAt to be an ISO string

import { z } from "zod";

export const attachmentCategorySchema = z.enum([
  "teamMemberFile",
  "progressFile",
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
  description: z.string().optional(),
  createdAt: z.any(),
});

export const projectLocationSchema = z.object({
  detailAddress: z.string(),
  link: z.string().url().or(z.string().min(0).max(0)),
  image: attachmentSchema.optional(),
});

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
  attachment: attachmentSchema.optional(),
});

export const designImageSubcategorySchema = z.object({
  title: z.string(),
  createAt: z.any(),
});

export const progressWeekSchema = z.object({
  weekCount: z.number(),
  date: z.any(),
});

export const progressItemSchema = z.object({
  position: z.number().int().positive(),
  attachment: z
    .record(z.enum(["before", "after"]), attachmentSchema)
    .optional(),
  description: z.string(),
  progress: z.record(z.string(), z.number().min(0).max(100)), // Maps week identifiers to percentage values (0-100)
});
