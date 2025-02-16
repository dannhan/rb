import { z } from "zod";
// import { Timestamp } from "firebase/firestore";

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

export const projectProgress = z.object({
  id: z.string(),
  weeks: z.array(
    z.object({
      id: z.string(),
      weekNumber: z.number(),
      date: z.any(),
    }),
  ),
  items: z.array(
    z.object({
      id: z.string(),
      no: z.number(),
      description: z.string(),
      progress: z.record(z.string(), z.number()),
    }),
  ),
  project: z.string(),
});

export const projectProgressItemSchema = z.object({
  id: z.string(),
  no: z.number(),
  description: z.string(),
  progress: z.record(z.string(), z.number()),
  project: z.string(),
});

export const projectProgressWeekSchema = z.object({
  id: z.string(),
  weekNumber: z.number(),
  date: z.any(),
  project: z.string(),
});
