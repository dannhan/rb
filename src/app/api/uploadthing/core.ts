import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UTApi } from "uploadthing/server";
import { UploadThingError } from "uploadthing/server";
import { z } from "zod";

import { auth } from "@/auth";

import { attachmentCategorySchema } from "@/config/dataSchema";
import type { Attachment, AttachmentCategory, ProjectLocation } from "@/types";

import { db } from "@/lib/firebase/admin";
import { PROJECT_COLLECTION } from "@/lib/utils";
import { createProjectLocationFormSchema } from "@/config/formSchema";

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
        throw new UploadThingError("You must be logged in as admin to upload.");

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
        await ref.set({
          name,
          size,
          type,
          key,
          url,
          appUrl,
          category,
          createdAt: new Date().toISOString(),
        } satisfies Attachment);

        return { success: true };
      } catch (error) {
        await utapi.deleteFiles(file.key);

        return { success: false };
      }
    }),

  designImage: f({ image: { maxFileSize: "32MB", maxFileCount: 64 } })
    .input(
      z.object({
        projectId: z.string(),
        subCategory: z.string(),
      }),
    )
    .middleware(async ({ input }) => {
      const session = await auth();

      // Throw if user isn't signed in
      if (!session || !session.user.isAdmin)
        throw new UploadThingError("You must be logged in as admin to upload.");

      return input;
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const category = "designImage" satisfies AttachmentCategory;
      const { projectId, subCategory } = metadata;
      const { name, size, type, key, url, appUrl } = file;

      const ref = db
        .collection(PROJECT_COLLECTION)
        .doc(projectId)
        .collection("attachments")
        .doc(file.key);

      try {
        await ref.set({
          name,
          size,
          type,
          key,
          url,
          appUrl,
          category,
          subCategory,
          createdAt: new Date().toISOString(),
        } satisfies Attachment);

        return { success: true };
      } catch (error) {
        await utapi.deleteFiles(file.key);

        return { success: false };
      }
    }),

  team: f({
    image: { maxFileSize: "32MB", maxFileCount: 1 },
    pdf: { maxFileSize: "32MB", maxFileCount: 1 },
    text: { maxFileSize: "32MB", maxFileCount: 1 },
    video: { maxFileSize: "32MB", maxFileCount: 1 },
    audio: { maxFileSize: "32MB", maxFileCount: 1 },
    blob: { maxFileSize: "32MB", maxFileCount: 1 },
    "application/zip": { maxFileSize: "32MB", maxFileCount: 1 },
  })
    .input(
      z.object({
        projectId: z.string(),
        teamId: z.string(),
      }),
    )
    .middleware(async ({ input }) => {
      const session = await auth();

      // Throw if user isn't signed in
      if (!session || !session.user.isAdmin)
        throw new UploadThingError("You must be logged in as admin to upload.");

      return input;
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const category = "teamMemberFile" satisfies AttachmentCategory;
      const { projectId, teamId } = metadata;
      const { name, size, type, key, url, appUrl } = file;

      const projectRef = db.collection(PROJECT_COLLECTION).doc(projectId);
      const teamRef = projectRef.collection("teams").doc(teamId);
      const attachmentRef = projectRef.collection("attachments").doc(file.key);

      const attachmentData = {
        name,
        size,
        type,
        key,
        url,
        appUrl,
        category,
        createdAt: new Date().toISOString(),
      } satisfies Attachment;

      try {
        await attachmentRef.set(attachmentData);
        await teamRef.update({ attachment: attachmentData });

        return { success: true };
      } catch (error) {
        console.error(error);
        await utapi.deleteFiles(file.key);

        return { error: "Failed to upload the data." };
      }
    }),

  // TODO: make variable for the argument
  progress: f({
    image: { maxFileSize: "32MB", maxFileCount: 1 },
    pdf: { maxFileSize: "32MB", maxFileCount: 1 },
    text: { maxFileSize: "32MB", maxFileCount: 1 },
    video: { maxFileSize: "32MB", maxFileCount: 1 },
    audio: { maxFileSize: "32MB", maxFileCount: 1 },
    blob: { maxFileSize: "32MB", maxFileCount: 1 },
    "application/zip": { maxFileSize: "32MB", maxFileCount: 1 },
  })
    .input(
      z.object({
        projectId: z.string(),
        progressId: z.string(),
        type: z.enum(["before", "after"]),
      }),
    )
    .middleware(async ({ input }) => {
      const session = await auth();

      // Throw if user isn't signed in
      if (!session || !session.user.isAdmin)
        throw new UploadThingError("You must be logged in as admin to upload.");

      return input;
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const category = "progressFile" satisfies AttachmentCategory;
      const { projectId, progressId } = metadata;

      const { name, size, type, key, url, appUrl } = file;

      const projectRef = db.collection(PROJECT_COLLECTION).doc(projectId);
      const progressRef = projectRef
        .collection("progress-items")
        .doc(progressId);
      const attachmentRef = projectRef.collection("attachments").doc(file.key);

      const attachmentData = {
        name,
        size,
        type,
        key,
        url,
        appUrl,
        category,
        createdAt: new Date().toISOString(),
      } satisfies Attachment;

      try {
        await attachmentRef.set(attachmentData);
        await progressRef.set(
          { attachment: { [metadata.type]: attachmentData } },
          { merge: true },
        );

        return { success: true };
      } catch (error) {
        console.error(error);
        await utapi.deleteFiles(file.key);

        return { error: "Failed to upload the data." };
      }
    }),

  location: f({ image: { maxFileSize: "32MB", maxFileCount: 1 } })
    .input(
      createProjectLocationFormSchema.omit({ image: true }).and(
        z.object({
          projectId: z.string(),
          oldImageKey: z.string().optional(),
        }),
      ),
    )
    .middleware(async ({ input }) => {
      const session = await auth();

      // Throw if user isn't signed in
      if (!session || !session.user.isAdmin)
        throw new UploadThingError("You must be logged in as admin to upload.");

      return input;
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const { projectId, oldImageKey, detailAddress, link } = metadata;
      const { name, size, type, key, url, appUrl } = file;
      const attachmentData = {
        name,
        size,
        type,
        key,
        url,
        appUrl,
        category: "locationMap",
        createdAt: new Date().toISOString(),
      } satisfies Attachment;
      const locationData = {
        detailAddress,
        link,
        image: attachmentData,
      } satisfies ProjectLocation;

      const projectRef = db.collection(PROJECT_COLLECTION).doc(projectId);
      const attachmentsRef = projectRef.collection("attachments").doc(file.key);

      try {
        // when updating the image the old image needs to be deleted
        oldImageKey &&
          (await Promise.all([
            utapi.deleteFiles(oldImageKey),
            projectRef.collection("attachments").doc(oldImageKey).delete(),
          ]));
        await attachmentsRef.set(attachmentData);
        await projectRef.update({ location: locationData });

        return { success: true };
      } catch (error) {
        console.error(error);
        await utapi.deleteFiles(file.key);

        return { success: false, error: "Error during storing image data." };
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof router;
