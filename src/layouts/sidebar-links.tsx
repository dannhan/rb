import * as React from "react";
import Link from "next/link";

import type { SidebarItem } from "@/types";
import { projectConfig } from "@/config/project";

import { cn } from "@/lib/utils";

type Props = { items?: SidebarItem[] };

const SidebarLinks: React.FC<Props> = () => {
  return projectConfig.sidebarItems?.map((item) => (
    <Link
      key={item.href}
      prefetch={true}
      href={item.href}
      className={cn(
        "flex items-center gap-2.5 rounded-md p-2 text-sm font-[455] leading-none text-muted-foreground transition-[color,font-weight] hover:text-primary",
        "outline-none focus-visible:ring-2 focus-visible:ring-black/50",
      )}
    >
      {item.title}
    </Link>
  ));
};

export default SidebarLinks;
