"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import * as React from "react";

import { SidebarItem } from "@/types";
import { cn } from "@/lib/utils";

import { Icons } from "@/components/icons";
import { Logo } from "@/components/logo";

export function Sidebar({ items }: { items?: SidebarItem[] }) {
  const segment = useSelectedLayoutSegment();

  return (
    <div className="hidden w-[220px] border-r bg-surface md:block lg:w-[240px]">
      <div className="flex h-14 items-center border-b px-4 lg:h-14 lg:px-6">
        <Logo />
      </div>
      <div className="p-3">
        <nav className="flex flex-col gap-0.5">
          {items?.map((item, index) => {
            const isActive = React.useMemo(() => {
              const hrefWithoutQuery = item.href.split("?")[0];
              return segment?.startsWith(hrefWithoutQuery);
            }, [segment]);
            const Icon = Icons[item.icon || "arrowRight"];

            return (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-md p-2 text-sm leading-none text-muted-foreground transition-[color,font-weight] hover:text-primary",
                  "outline-none focus-visible:ring-2 focus-visible:ring-black/50",
                  isActive && "bg-muted text-primary",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
