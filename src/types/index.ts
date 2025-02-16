import { z } from "zod";
import {
  projectSchema,
  identitySchema,
  teamSchema,
  fileSchema,
  storeLocationSchema,
  projectProgressItemSchema,
  projectProgressWeekSchema,
  projectProgress,
} from "@/config/schema";

import { Icons } from "@/components/icons";

// todo:
// 1. might remove non-schema type or move schema type to another file
// 2. change store locatoin to project location

export type Project = z.infer<typeof projectSchema>;
export type Identity = z.infer<typeof identitySchema>;
export type Team = z.infer<typeof teamSchema>;
export type File = z.infer<typeof fileSchema>;
export type StoreLocation = z.infer<typeof storeLocationSchema>;
export type Progress = z.infer<typeof projectProgress>;
export type Item = z.infer<typeof projectProgressItemSchema>;
export type Week = z.infer<typeof projectProgressWeekSchema>;

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

// TODO:
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
