import { UTFiles, UTApi } from "uploadthing/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { FieldValue } from "firebase-admin/firestore";
import { z } from "zod";

import { fileSchema } from "@/config/schema";
import { createDoc, updateDoc } from "@/lib/firebase/firestore";
import { getErrorMessage } from "@/lib/handle-error";

// todo, important:
// 1. auth
// 2. is rate limit necessary
// 3. better error handling
// 4. match the maxFileSize with the front-end
// 5. store the width and height for better ui

const utapi = new UTApi();

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const router = {
  projectTeam: f({
    image: { maxFileSize: "16MB", maxFileCount: 1 },
    pdf: { maxFileSize: "16MB", maxFileCount: 1 },
    text: { maxFileSize: "16MB", maxFileCount: 1 },
    video: { maxFileSize: "16MB", maxFileCount: 1 },
    audio: { maxFileSize: "16MB", maxFileCount: 1 },
    blob: { maxFileSize: "16MB", maxFileCount: 1 },
    "application/zip": { maxFileSize: "16MB", maxFileCount: 1 },
  })
    .input(z.object({ slug: z.string(), teamId: z.string() }))
    .middleware(async ({ files, input }) => {
      const fileOverrides = files.map((f) => f);

      return {
        slug: input.slug,
        teamId: input.teamId,
        [UTFiles]: fileOverrides,
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const route = "projectTeam";

      try {
        const parsed = fileSchema.parse({
          route,
          key: file.key,
          name: file.name,
          url: file.url,
          type: file.type,
        });

        await Promise.all([
          updateDoc({
            docId: metadata.teamId,
            collectionName: "project-teams",
            errorMessage: "Error uploading image.",
            data: { file: file.key },
          }),
          createDoc({
            docId: file.key,
            collectionName: "project-files",
            errorMessage: "Error uploading image.",
            data: parsed,
          }),
        ]);
      } catch (error) {
        await utapi.deleteFiles(file.key);
        console.error(getErrorMessage(error));

        throw new Error("Failed to upload the image.");
      }
    }),

  designImages: f({ image: { maxFileSize: "8MB", maxFileCount: 4 } })
    .input(z.object({ slug: z.string() }))
    .middleware(async ({ files, input }) => {
      const fileOverrides = files.map((f) => f);

      return { slug: input.slug, [UTFiles]: fileOverrides };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const route = "designImages";

      try {
        const parsed = fileSchema.parse({
          route,
          key: file.key,
          name: file.name,
          url: file.url,
          type: file.type,
        });

        await Promise.allSettled([
          updateDoc({
            docId: metadata.slug,
            collectionName: "projects",
            errorMessage: "Error uploading image.",
            data: { [route]: FieldValue.arrayUnion(file.key) },
          }),
          createDoc({
            docId: file.key,
            collectionName: "project-files",
            errorMessage: "Error uploading image.",
            data: parsed,
          }),
        ]);
      } catch (error) {
        await utapi.deleteFiles(file.key);
        console.error(getErrorMessage(error));

        throw new Error("Failed to upload the image.");
      }
    }),

  projectSchedule: f({ image: { maxFileSize: "8MB", maxFileCount: 1 } })
    .input(z.object({ slug: z.string() }))
    .middleware(async ({ files, input }) => {
      const fileOverrides = files.map((f) => f);

      return { slug: input.slug, [UTFiles]: fileOverrides };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const route = "projectSchedule";

      try {
        const parsed = fileSchema.parse({
          route,
          key: file.key,
          name: file.name,
          url: file.url,
          type: file.type,
        });

        await Promise.all([
          updateDoc({
            docId: metadata.slug,
            collectionName: "projects",
            errorMessage: "Error uploading image.",
            data: { [route]: file.key },
          }),
          createDoc({
            docId: file.key,
            collectionName: "project-files",
            errorMessage: "Error uploading image.",
            data: parsed,
          }),
        ]);
      } catch (error) {
        await utapi.deleteFiles(file.key);
        console.error(getErrorMessage(error));

        throw new Error("Failed to upload the image.");
      }
    }),

  costRealization: f({ image: { maxFileSize: "8MB", maxFileCount: 1 } })
    .input(z.object({ slug: z.string() }))
    .middleware(async ({ files, input }) => {
      const fileOverrides = files.map((f) => f);

      return { slug: input.slug, [UTFiles]: fileOverrides };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const route = "costRealization";

      try {
        const parsed = fileSchema.parse({
          route,
          key: file.key,
          name: file.name,
          url: file.url,
          type: file.type,
        });

        await Promise.all([
          updateDoc({
            docId: metadata.slug,
            collectionName: "projects",
            errorMessage: "Error uploading image.",
            data: { [route]: file.key },
          }),
          createDoc({
            docId: file.key,
            collectionName: "project-files",
            errorMessage: "Error uploading image.",
            data: parsed,
          }),
        ]);
      } catch (error) {
        await utapi.deleteFiles(file.key);
        console.error(getErrorMessage(error));

        throw new Error("Failed to upload the image.");
      }
    }),

  testUpload: f({ image: { maxFileSize: "32MB", maxFileCount: 8 } })
    .input(z.object({ slug: z.string() }))
    .middleware(async ({ files, input }) => {
      const fileOverrides = files.map((f) => f);

      return { slug: input.slug, [UTFiles]: fileOverrides };
    })
    .onUploadComplete(async ({ file }) => {
      try {
        await utapi.deleteFiles(file.key);
      } catch (error) {
        await utapi.deleteFiles(file.key);
        console.error(getErrorMessage(error));

        throw new Error("Failed to upload the image.");
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof router;
