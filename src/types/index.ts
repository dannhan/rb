import { z } from "zod";
import {
  taskSchema,
  projectSchema,
  teamSchema,
  identitySchema,
  storeLocationSchema,
} from "@/config/schema";

import { type ClientUploadedFileData } from "uploadthing/types";

import { Icons } from "@/components/icons";

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

export type StoredImage = {
  route: string;
  customId: string | null;
  key: string;
  name: string;
  url: string;
};

export type LatLng = {
  lat: number;
  lng: number;
};

export type Task = z.infer<typeof taskSchema>;

export type Project = z.infer<typeof projectSchema>;

export type Team = z.infer<typeof teamSchema>;

export type Identity = z.infer<typeof identitySchema>;

export type StoreLocation = z.infer<typeof storeLocationSchema>;
