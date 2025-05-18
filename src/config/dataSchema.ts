import { z } from "zod";
import { attachmentSchema, imageSchema } from "./fileSchema";

export const projectLocationSchema = z.object({
  detailAddress: z.string(),
  link: z.string().url().or(z.string().min(0).max(0)),
  image: z.array(imageSchema).optional(),
});

export const projectSchema = z.object({
  title: z.string(),
  type: z.enum(["renovasi", "konstruksi"]),
  createdAt: z.string().datetime(),
  location: projectLocationSchema.optional(),
});

export const identitySchema = z.object({
  position: z.number().int(),
  field: z.string(),
  value: z.string(),
});

export const teamMemberSchema = z.object({
  position: z.number().int(),
  pekerjaan: z.string(),
  spk: z.string(),
  pelaksana: z.string(),
  status: z.string(),
  attachments: z.array(attachmentSchema).optional(),
});

export const designDrawingCategorySchema = z.object({
  title: z.string(),
  createdAt: z.string().datetime(),
  imageURLs: z.array(z.string()).optional(),
});

export const progressWeekSchema = z.object({
  weekCount: z.number(),
  date: z.string().datetime(),
});

export const progressItemSchema = z.object({
  position: z.number().int(),
  description: z.string(),
  progress: z.record(z.string(), z.number().min(0).max(100)),
  attachment: z.array(attachmentSchema).optional(),
});
