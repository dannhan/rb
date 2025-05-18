import { auth } from "@/auth";
import { UploadThingError, createUploadthing } from "uploadthing/server";
import { z } from "zod";

import { createProjectAttachmentService } from "@/lib/services/create-project-attachment-service";

const f = createUploadthing();

export const images = f({
  image: { maxFileSize: "2GB", maxFileCount: Infinity },
})
  .input(
    z.object({
      params: z.object({ project: z.string() }),
      usedBy: z.enum(["rab", "jadwal-proyek", "realisasi-biaya"]),
    }),
  )
  .middleware(async ({ input }) => {
    const session = await auth();
    if (session?.user.role !== "admin") {
      console.error("Authorization error from file router middleware");
      throw new UploadThingError("Unauthorized.");
    }

    return input;
  })
  .onUploadComplete(async ({ file, metadata }) => {
    try {
      const result = await createProjectAttachmentService(file, metadata);
      return { success: true, result };
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  });
