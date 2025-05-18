import { auth } from "@/auth";
import { UploadThingError, createUploadthing } from "uploadthing/server";
import { z } from "zod";

import { updateProgressItemAttachmentService } from "@/lib/services/update-project-progress-service";
import { storeProjectAttachmentKeyService } from "@/lib/services/create-project-attachment-service";

const f = createUploadthing();

export const progressAttachments = f({
  image: { maxFileSize: "2GB", maxFileCount: 1 },
})
  .input(
    z.object({
      params: z.object({ project: z.string() }),
      collectionId: z.string(),
      type: z.string(),
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
      const { type, ...restMetadata } = metadata;
      if (type === undefined) throw new Error();

      const [result] = await Promise.all([
        updateProgressItemAttachmentService(file, { type, ...restMetadata }),
        storeProjectAttachmentKeyService(file.key, metadata.params),
      ]);
      return { success: true, result };
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  });
