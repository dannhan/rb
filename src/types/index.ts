import type { ClientUploadedFileData } from "uploadthing/types";

import { z } from "zod";
import {
  projectSchema,
  identitySchema,
  teamSchema,
  fileSchema,
  storeLocationSchema,
} from "@/config/schema";

import { Icons } from "@/components/icons";

// todo:
// 1. might remove non-schema type or move schema type to another file
// 2. change store locatoin to project location

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

export interface UploadedFile<T = unknown> extends ClientUploadedFileData<T> {}

export type ProjectProgress = {
  id: number;
  week: number;
  date: Date;
  physicalProgress: number;
  costProgress: number;
};

export type LatLng = {
  lat: number;
  lng: number;
};

export type Project = z.infer<typeof projectSchema>;

export type Identity = z.infer<typeof identitySchema>;

export type Team = z.infer<typeof teamSchema>;

export type File = z.infer<typeof fileSchema>;

export type StoreLocation = z.infer<typeof storeLocationSchema>;
