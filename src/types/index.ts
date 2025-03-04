import { Icons } from "@/components/icons";

export * from "./data";

// Utility type for firebase
export type WithId<T> = T & { id: string };

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
