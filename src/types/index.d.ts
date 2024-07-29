import { Icons } from "@/components/icons";

export type SidebarItem = {
  title: string;
  href: string;
  icon: keyof typeof Icons
};

export type ProjectConfig = {
  sidebarItems: SidebarItem[];
};
