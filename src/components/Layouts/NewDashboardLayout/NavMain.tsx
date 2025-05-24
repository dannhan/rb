"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import type { SidebarItem } from "@/types";
import { projectConfig } from "@/config/project";

import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import Icons from "@/components/Common/Icons";

/* TODO: migrate to be able to use global css */
const NavMain = () => {
  const pathname = usePathname();
  return projectConfig.sidebarItems.map((item) => (
    <SidebarLink
      key={item.href}
      item={item}
      isActive={item.href === pathname.split("/")[2]}
    />
  ));
};

const SidebarLink = React.memo(
  ({ item, isActive }: { item: SidebarItem; isActive: boolean }) => {
    const Icon = Icons[item.icon || "arrowRight"];
    return (
      <SidebarMenuItem>
        {/* TODO: change background and foreground to just use sidebar background and foreground */}
        <SidebarMenuButton
          className="gap-2.5 px-3 py-2 font-[440] data-[active=true]:bg-primary/5 data-[active=true]:font-[440] data-[active=true]:text-primary"
          asChild
          isActive={isActive}
        >
          <Link href={item.href} scroll={true}>
            <Icon />
            {item.title}
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  },
  // Only re-render if the isActive change
  (prevProps, nextProps) => {
    return prevProps.isActive === nextProps.isActive;
  },
);
SidebarLink.displayName = "SidebarLink";

export default NavMain;
