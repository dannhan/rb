import { z } from "zod";

const baseFileSchema = z.object({
  key: z.string(),
  name: z.string(),
  size: z.number(),
  type: z.string(),
  url: z.string(),
  createdAt: z.string().datetime(),
});

export const attachmentSchema = baseFileSchema;

// TODO: better type-safety for the route
export const imageSchema = baseFileSchema.and(
  z.discriminatedUnion("usedBy", [
    // NOTE: there is no need to actually store categoryId
    z.object({ usedBy: z.literal("gambar-desain"), categoryId: z.string() }),
    z.object({ usedBy: z.enum(["rab", "jadwal-proyek", "realisasi-biaya"]) }),
  ]),
);
