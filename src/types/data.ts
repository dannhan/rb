import { z } from "zod";
import {
  projectSchema,
  identitySchema,
  progressItemSchema,
  teamMemberSchema,
  designDrawingCategorySchema,
  projectLocationSchema,
  progressWeekSchema,
} from "@/config/dataSchema";
import { attachmentSchema, imageSchema } from "@/config/fileSchema";

export type Project = z.infer<typeof projectSchema>;
export type Identity = z.infer<typeof identitySchema>;
export type Attachment = z.infer<typeof attachmentSchema>;
export type Image = z.infer<typeof imageSchema>;
export type TeamMember = z.infer<typeof teamMemberSchema>;
export type DesignDrawingCategory = z.infer<typeof designDrawingCategorySchema>;
export type ProgressItem = z.infer<typeof progressItemSchema>;
export type ProgressWeek = z.infer<typeof progressWeekSchema>;
export type Item = z.infer<typeof progressItemSchema>;
export type ProjectLocation = z.infer<typeof projectLocationSchema>;
