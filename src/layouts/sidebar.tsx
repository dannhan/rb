"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import { SidebarItem } from "@/types";
import { cn } from "@/lib/utils";

import { Icons } from "@/components/icons";
import { Logo } from "@/components/logo";

export function Sidebar({ items }: { items?: SidebarItem[] }) {
  const segment = useSelectedLayoutSegment();

  return (
    <div className="hidden w-[220px] border-r bg-surface md:block lg:w-[280px]">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-14 lg:px-6">
          <Logo />
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {items?.map((item, index) => {
              const Icon = Icons[item.icon || "arrowRight"];
              return (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    item.href.startsWith(`${segment}`) &&
                      "bg-muted text-primary",
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
    </div>
  );
}
