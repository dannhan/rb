import { z } from "zod";
import { taskSchema, projectSchema, teamSchema } from "@/config/schema";

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

export type Task = z.infer<typeof taskSchema>;

export type Project = z.infer<typeof projectSchema>;

export type Team = z.infer<typeof teamSchema>;
