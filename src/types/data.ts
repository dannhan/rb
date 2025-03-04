import { z } from "zod";
import {
  projectSchema,
  identitySchema,
  teamMemberSchema,
  fileSchema,
  storeLocationSchema,
  progressItemSchema,
} from "@/config/dataSchema";

export type Project = z.infer<typeof projectSchema>;
export type Identity = z.infer<typeof identitySchema>;
export type TeamMember = z.infer<typeof teamMemberSchema>;
export type File = z.infer<typeof fileSchema>;
export type StoreLocation = z.infer<typeof storeLocationSchema>;
export type ProgressItem = z.infer<typeof progressItemSchema>;
export type Item = z.infer<typeof progressItemSchema>;
