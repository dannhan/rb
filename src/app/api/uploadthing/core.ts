import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UTFiles, UTApi } from "uploadthing/server";
import { UploadThingError } from "uploadthing/server";
import { z } from "zod";

import { auth } from "@/auth";

import { getErrorMessage } from "@/lib/handle-error";
import { db } from "@/lib/firebase/admin";
import { PROJECT_COLLECTION } from "@/lib/utils";
import { attachmentCategorySchema } from "@/config/dataSchema";

// TODO::
// is rate limit necessary?
// better error handling
// match the maxFileSize with the front-end
// store the width and height for better ui

const utapi = new UTApi();

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const router = {
  singleImage: f({ image: { maxFileSize: "32MB", maxFileCount: 1 } })
    .input(
      z.object({ projectId: z.string(), category: attachmentCategorySchema }),
    )
    .middleware(async ({ input }) => {
      const session = await auth();

      // Throw if user isn't signed in
      if (!session || !session.user.isAdmin)
        throw new UploadThingError(
          "You must be logged in as admin to upload a profile picture",
        );

      return input;
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const { projectId, category } = metadata;
      const { name, size, type, key, url, appUrl } = file;

      const ref = db
        .collection(PROJECT_COLLECTION)
        .doc(projectId)
        .collection("attachments")
        .doc(file.key);

      try {
        await ref.set({ name, size, type, key, url, appUrl, category });

        return { success: true };
      } catch (error) {
        await utapi.deleteFiles(file.key);

        return { success: false };
      }
    }),

  // projectTeam: f({
  //   image: { maxFileSize: "16MB", maxFileCount: 1 },
  //   pdf: { maxFileSize: "16MB", maxFileCount: 1 },
  //   text: { maxFileSize: "16MB", maxFileCount: 1 },
  //   video: { maxFileSize: "16MB", maxFileCount: 1 },
  //   audio: { maxFileSize: "16MB", maxFileCount: 1 },
  //   blob: { maxFileSize: "16MB", maxFileCount: 1 },
  //   "application/zip": { maxFileSize: "16MB", maxFileCount: 1 },
  // })
  //   .input(z.object({ slug: z.string(), teamId: z.string() }))
  //   .middleware(async ({ files, input }) => {
  //     const fileOverrides = files.map((f) => f);
  //
  //     return {
  //       slug: input.slug,
  //       teamId: input.teamId,
  //       [UTFiles]: fileOverrides,
  //     };
  //   })
  //   .onUploadComplete(async ({ metadata, file }) => {
  //     const route = "projectTeam";
  //
  //     try {
  //       const parsed = fileSchema.parse({
  //         route,
  //         key: file.key,
  //         name: file.name,
  //         url: file.url,
  //         type: file.type,
  //       });
  //
  //       await Promise.all([
  //         updateDoc({
  //           docId: metadata.teamId,
  //           collectionName: "project-teams",
  //           errorMessage: "Error uploading image.",
  //           data: { file: file.key },
  //         }),
  //         createDoc({
  //           docId: file.key,
  //           collectionName: "project-files",
  //           errorMessage: "Error uploading image.",
  //           data: parsed,
  //         }),
  //       ]);
  //     } catch (error) {
  //       await utapi.deleteFiles(file.key);
  //       console.error(getErrorMessage(error));
  //
  //       throw new Error("Failed to upload the image.");
  //     }
  //   }),
  //
  // // TODO: no maximum file upload
  // designImages: f({ image: { maxFileSize: "8MB", maxFileCount: 4 } })
  //   .input(z.object({ slug: z.string(), category: z.string() }))
  //   .middleware(async ({ files, input }) => {
  //     const fileOverrides = files.map((f) => f);
  //
  //     return {
  //       slug: input.slug,
  //       category: input.category,
  //       [UTFiles]: fileOverrides,
  //     };
  //   })
  //   .onUploadComplete(async ({ metadata, file }) => {
  //     const route = "designImages";
  //
  //     try {
  //       const parsed = fileSchema.parse({
  //         route,
  //         key: file.key,
  //         name: file.name,
  //         url: file.url,
  //         type: file.type,
  //         category: metadata.category,
  //       });
  //
  //       await Promise.allSettled([
  //         updateDoc({
  //           docId: metadata.slug,
  //           collectionName: "projects",
  //           errorMessage: "Error uploading image.",
  //           data: { [route]: FieldValue.arrayUnion(file.key) },
  //         }),
  //         createDoc({
  //           docId: file.key,
  //           collectionName: "project-files",
  //           errorMessage: "Error uploading image.",
  //           data: parsed,
  //         }),
  //       ]);
  //     } catch (error) {
  //       await utapi.deleteFiles(file.key);
  //       console.error(getErrorMessage(error));
  //
  //       throw new Error("Failed to upload the image.");
  //     }
  //   }),
  //
  // projectSchedule: f({ image: { maxFileSize: "8MB", maxFileCount: 1 } })
  //   .input(z.object({ slug: z.string() }))
  //   .middleware(async ({ files, input }) => {
  //     const fileOverrides = files.map((f) => f);
  //
  //     return { slug: input.slug, [UTFiles]: fileOverrides };
  //   })
  //   .onUploadComplete(async ({ metadata, file }) => {
  //     const route = "projectSchedule";
  //
  //     try {
  //       const parsed = fileSchema.parse({
  //         route,
  //         key: file.key,
  //         name: file.name,
  //         url: file.url,
  //         type: file.type,
  //       });
  //
  //       await Promise.all([
  //         updateDoc({
  //           docId: metadata.slug,
  //           collectionName: "projects",
  //           errorMessage: "Error uploading image.",
  //           data: { [route]: file.key },
  //         }),
  //         createDoc({
  //           docId: file.key,
  //           collectionName: "project-files",
  //           errorMessage: "Error uploading image.",
  //           data: parsed,
  //         }),
  //       ]);
  //     } catch (error) {
  //       await utapi.deleteFiles(file.key);
  //       console.error(getErrorMessage(error));
  //
  //       throw new Error("Failed to upload the image.");
  //     }
  //   }),
  //
  // costRealization: f({ image: { maxFileSize: "8MB", maxFileCount: 1 } })
  //   .input(z.object({ slug: z.string() }))
  //   .middleware(async ({ files, input }) => {
  //     const fileOverrides = files.map((f) => f);
  //
  //     return { slug: input.slug, [UTFiles]: fileOverrides };
  //   })
  //   .onUploadComplete(async ({ metadata, file }) => {
  //     const route = "costRealization";
  //
  //     try {
  //       const parsed = fileSchema.parse({
  //         route,
  //         key: file.key,
  //         name: file.name,
  //         url: file.url,
  //         type: file.type,
  //       });
  //
  //       await Promise.all([
  //         updateDoc({
  //           docId: metadata.slug,
  //           collectionName: "projects",
  //           errorMessage: "Error uploading image.",
  //           data: { [route]: file.key },
  //         }),
  //         createDoc({
  //           docId: file.key,
  //           collectionName: "project-files",
  //           errorMessage: "Error uploading image.",
  //           data: parsed,
  //         }),
  //       ]);
  //     } catch (error) {
  //       await utapi.deleteFiles(file.key);
  //       console.error(getErrorMessage(error));
  //
  //       throw new Error("Failed to upload the image.");
  //     }
  //   }),
  //
  // testUpload: f({ image: { maxFileSize: "32MB", maxFileCount: 8 } })
  //   .middleware(async ({ files }) => {
  //     const fileOverrides = files.map((f) => f);
  //
  //     return { [UTFiles]: fileOverrides };
  //   })
  //   .onUploadComplete(async ({ file }) => {
  //     try {
  //       await utapi.deleteFiles(file.key);
  //     } catch (error) {
  //       await utapi.deleteFiles(file.key);
  //       console.error(getErrorMessage(error));
  //
  //       return { success: false, message: getErrorMessage(error) };
  //     }
  //
  //     return { success: true };
  //   }),
} satisfies FileRouter;

export type OurFileRouter = typeof router;
