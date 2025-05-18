import * as React from "react";
import Link from "next/link";

import { SidebarItem } from "@/types";
import Icons from "@/components/Common/Icons";

const SidebarLink = React.memo(
  ({ item, active }: { item: SidebarItem; active: boolean }) => {
    const Icon = Icons[item.icon || "arrowRight"];

    return (
      <Link
        key={item.href}
        prefetch={true}
        href={item.href}
        data-state={active ? "active" : "inactive"}
        className="flex items-center gap-2.5 rounded-md p-2 text-sm font-[455] leading-none text-muted-foreground outline-none transition-[color,font-weight] hover:text-primary focus-visible:ring-2 focus-visible:ring-black/50 data-[state=active]:bg-muted data-[state=active]:text-primary"
      >
        <Icon className="h-4 w-4" />
        {item.title}
      </Link>
    );
  },
  (prevProps, nextProps) => {
    // Only re-render if the active change
    return prevProps.active === nextProps.active;
  },
);
SidebarLink.displayName = "SidebarLink";

export default SidebarLink;
