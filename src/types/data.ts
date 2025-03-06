import { z } from "zod";
import {
  projectSchema,
  identitySchema,
  progressItemSchema,
  attachmentSchema,
  attachmentCategorySchema,
  designImageSubcategorySchema,
  teamMemberSchema,
  storeLocationSchema,
} from "@/config/dataSchema";

export type Project = z.infer<typeof projectSchema>;
export type Identity = z.infer<typeof identitySchema>;
export type AttachmentCategory = z.infer<typeof attachmentCategorySchema>;
export type Attachment = z.infer<typeof attachmentSchema>;
export type TeamMember = z.infer<typeof teamMemberSchema>;
export type DesignImageSubcategory = z.infer<
  typeof designImageSubcategorySchema
>;
export type StoreLocation = z.infer<typeof storeLocationSchema>;
export type ProgressItem = z.infer<typeof progressItemSchema>;
export type Item = z.infer<typeof progressItemSchema>;
