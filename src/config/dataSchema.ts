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

export const fileSchema = z.union([
  z.object({
    route: z.literal("designImages"),
    key: z.string(),
    name: z.string(),
    url: z.string(),
    type: z.string(),
    category: z.string(), // Required only if route is "designImages"
  }),
  z.object({
    route: z.string().refine((val) => val !== "designImages"), // Ensures this case does not handle "designImages"
    key: z.string(),
    name: z.string(),
    url: z.string(),
    type: z.string(),
  }),
]);

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
