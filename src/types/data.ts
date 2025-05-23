import { z } from "zod";
import {
  projectSchema,
  identitySchema,
  progressItemSchema,
  attachmentSchema,
  attachmentCategorySchema,
  designImageSubcategorySchema,
  teamMemberSchema,
  projectLocationSchema,
  progressWeekSchema,
} from "@/config/dataSchema";

export type Project = z.infer<typeof projectSchema>;
export type Identity = z.infer<typeof identitySchema>;
export type AttachmentCategory = z.infer<typeof attachmentCategorySchema>;
export type Attachment = z.infer<typeof attachmentSchema>;
export type TeamMember = z.infer<typeof teamMemberSchema>;
export type DesignImageSubcategory = z.infer<
  typeof designImageSubcategorySchema
>;
export type ProgressItem = z.infer<typeof progressItemSchema>;
export type ProgressWeek = z.infer<typeof progressWeekSchema>;
export type Item = z.infer<typeof progressItemSchema>;
export type ProjectLocation = z.infer<typeof projectLocationSchema>;
