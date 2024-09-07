// todo: what is this
// todo: rate limit
// todo: set permissions and file types for this FileRoute

import { z } from "zod";

import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { postDesignImageUrlFirebase } from "@/firebase/firestore/design-image";

const f = createUploadthing();

// todo: Fake auth function
async function auth(req: Request) {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return { id: "fakeId" };
}

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // todo: rate limit

      // This code runs on your server before upload
      const user = await auth(req);

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),

  designImages: f({ image: { maxFileSize: "4MB", maxFileCount: 4 } })
    .input(z.object({ slug: z.string() }))
    .middleware(async ({ input }) => ({ slug: input.slug }))
    .onUploadComplete(async ({ metadata, file }) => {
      // todo: try to throw an error here
      // This code RUNS ON YOUR SERVER after upload
      console.log("file url", file.url);
      console.log("Upload complete for slug:", metadata.slug);
      const { key, type, name, url, size } = file;

      try {
        await postDesignImageUrlFirebase(metadata.slug, {
          key,
          type,
          name,
          url,
          size,
          customId: null,
          serverData: null,
        });
      } catch (error) {
        return { error: "Failed to upload the data." };
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
