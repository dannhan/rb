// todo: what is this
// todo: rate limit
// todo: set permissions and file types for this FileRoute

import { z } from "zod";

import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UTFiles } from "uploadthing/server";
import { postDesignImageFirebase } from "@/firebase/firestore/design-image";
import { postProjectScheduleFirebase } from "@/firebase/firestore/project-schedule";

import { customAlphabet } from "nanoid";
import { postCostRealizationFirebase } from "@/firebase/firestore/cost-realization";
import { postTeamFileFirebase } from "@/firebase/firestore/team";

const f = createUploadthing();

const alphabet =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const nanoid = customAlphabet(alphabet);

// todo: Fake auth function
async function auth(req: Request) {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return { id: "fakeId" };
}

// FileRouter for your app, can contain multiple FileRoutes
export const router = {
  designImages: f({ image: { maxFileSize: "4MB", maxFileCount: 4 } })
    .input(z.object({ slug: z.string() }))
    .middleware(async ({ files, input }) => {
      const fileOverrides = files.map((file) => {
        return { ...file, customId: nanoid() };
      });

      return { slug: input.slug, [UTFiles]: fileOverrides };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // todo: try to throw an error here
      console.log("Upload complete for slug:", metadata.slug);
      const { key, name, url } = file;

      try {
        await postDesignImageFirebase(metadata.slug, {
          route: "designImages",
          key,
          name,
          url,
          customId: file.customId,
        });
      } catch (error) {
        return { error: "Failed to upload the data." };
      }
    }),

  projectSchedule: f({ image: { maxFileSize: "8MB", maxFileCount: 1 } })
    .input(z.object({ slug: z.string() }))
    .middleware(async ({ files, input }) => {
      const fileOverrides = files.map((file) => {
        return { ...file, customId: nanoid() };
      });

      return { slug: input.slug, [UTFiles]: fileOverrides };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for slug:", metadata.slug);
      const { key, name, url } = file;

      try {
        await postProjectScheduleFirebase(metadata.slug, {
          route: "projectSchedule",
          key,
          name,
          url,
          customId: file.customId,
        });
      } catch (error) {
        return { error: "Failed to upload the data." };
      }
    }),

  costRealization: f({ image: { maxFileSize: "8MB", maxFileCount: 1 } })
    .input(z.object({ slug: z.string() }))
    .middleware(async ({ files, input }) => {
      const fileOverrides = files.map((file) => {
        return { ...file, customId: nanoid() };
      });

      return { slug: input.slug, [UTFiles]: fileOverrides };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for slug:", metadata.slug);
      const { key, name, url } = file;

      try {
        await postCostRealizationFirebase(metadata.slug, {
          route: "costRealization",
          key,
          name,
          url,
          customId: file.customId,
        });
      } catch (error) {
        return { error: "Failed to upload the data." };
      }
    }),

  team: f({
    image: { maxFileSize: "8MB", maxFileCount: 1 },
    pdf: { maxFileSize: "8MB", maxFileCount: 1 },
    text: { maxFileSize: "8MB", maxFileCount: 1 },
    video: { maxFileSize: "8MB", maxFileCount: 1 },
    audio: { maxFileSize: "8MB", maxFileCount: 1 },
    blob: { maxFileSize: "8MB", maxFileCount: 1 },
    "application/zip": { maxFileSize: "8MB", maxFileCount: 1 },
  })
    .input(z.object({ slug: z.string(), teamId: z.string() }))
    .middleware(async ({ files, input }) => {
      const fileOverrides = files.map((file) => {
        return { ...file, customId: nanoid() };
      });

      return {
        slug: input.slug,
        teamId: input.teamId,
        [UTFiles]: fileOverrides,
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for slug:", metadata.slug);
      const { customId, key, name, url, type } = file;

      try {
        await postTeamFileFirebase(metadata.slug, metadata.teamId, {
          route: "team",
          customId,
          key,
          name,
          url,
          type,
        });
      } catch (error) {
        return { error: "Failed to upload the data." };
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof router;
