"use client";

import { usePathname } from "next/navigation";
import * as React from "react";

import { projectConfig } from "@/config/project";
import { Logo } from "@/components/logo";
import SidebarLink from "./sidebar-link";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden w-[220px] border-r bg-surface md:block lg:w-[240px]">
      <div className="flex h-14 items-center border-b px-4 lg:h-14 lg:px-6">
        <Logo />
      </div>
      <div className="p-3">
        <nav className="flex flex-col gap-0.5">
          {projectConfig.sidebarItems?.map((item) => (
            <SidebarLink
              key={item.href}
              item={item}
              active={item.href === pathname.split("/")[2]}
            />
          ))}
        </nav>
      </div>
    </div>
  );
}
