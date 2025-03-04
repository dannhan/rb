import { z } from "zod";
import {
  projectSchema,
  identitySchema,
  teamMemberSchema,
  fileSchema,
  storeLocationSchema,
  progressItemSchema,
} from "@/config/schema";

import { Icons } from "@/components/icons";

// todo:
// 1. might remove non-schema type or move schema type to another file
// 2. change store locatoin to project location

export type Project = z.infer<typeof projectSchema>;
export type Identity = z.infer<typeof identitySchema>;
export type TeamMember = z.infer<typeof teamMemberSchema>;
export type File = z.infer<typeof fileSchema>;
export type StoreLocation = z.infer<typeof storeLocationSchema>;
export type ProgressItem = z.infer<typeof progressItemSchema>;
export type Item = z.infer<typeof progressItemSchema>;

// Utility type for firebase
export type WithId<T> = T & { id: string };

export type ProjectData = {
  konstruksi: WithId<Project>[];
  renovasi: WithId<Project>[];
};

export type SidebarItem = {
  title: string;
  href: string;
  icon: keyof typeof Icons;
};

export type ProjectConfig = {
  sidebarItems: SidebarItem[];
};

export type TeamTableConfig = {
  statuses: {
    value: string;
    label: string;
    icon: keyof typeof Icons;
  }[];
};

export type LatLng = {
  lat: number;
  lng: number;
};
