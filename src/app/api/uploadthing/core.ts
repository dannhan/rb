import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UTApi } from "uploadthing/server";
import { UploadThingError } from "uploadthing/server";
import { Timestamp } from "firebase-admin/firestore";
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
          createdAt: Timestamp.now(),
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
          createdAt: Timestamp.now(),
        } satisfies Attachment);

        return { success: true };
      } catch (error) {
        await utapi.deleteFiles(file.key);

        return { success: false };
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
        createdAt: Timestamp.now(),
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
        console.log("ASHIAP ASHIAP");

        return { success: true };
      } catch (error) {
        console.error(error);
        await utapi.deleteFiles(file.key);

        return { success: false, error: "Error during storing image data." };
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof router;
