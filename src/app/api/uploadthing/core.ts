import { type FileRouter } from "uploadthing/next";

import { teamAttachments } from "@/lib/uploaders/team-attachments";
import { designDrawingImages } from "@/lib/uploaders/design-drawing-images";
import { progressAttachments } from "@/lib/uploaders/progress-attachments";
import { images } from "@/lib/uploaders/images";

export const router = {
  teamAttachments,
  designDrawingImages,
  progressAttachments,
  images,
} satisfies FileRouter;

export type OurFileRouter = typeof router;
