import { z } from "zod";
import { taskSchema, projectSchema, teamSchema, designImageSchema } from "@/config/schema";

import { type ClientUploadedFileData } from "uploadthing/types"

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

export interface UploadedFile<T = unknown> extends ClientUploadedFileData<T> { }

export type Task = z.infer<typeof taskSchema>;

export type Project = z.infer<typeof projectSchema>;

export type Team = z.infer<typeof teamSchema>;
