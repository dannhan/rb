"use client";

import { useEffect, useState } from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import Link from "next/link";

import { SidebarIcon } from "lucide-react";
import { projectConfig } from "@/config/project";

import { cn } from "@/lib/utils/cn";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Icons from "@/components/Common/Icons";
import HeaderLogo from "@/components/Common/HeaderLogo";

export function SidebarMobile() {
  const segment = useSelectedLayoutSegment();
  const [isOpen, setIsOpen] = useState(false);

  // automatically close sidebar when navigation loading is completed
  useEffect(() => {
    setIsOpen(false);
  }, [segment]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-fit w-fit shrink-0 p-1 md:hidden"
          onClick={() => setIsOpen(true)}
        >
          <SidebarIcon className="h-4 w-4" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <SheetHeader className="sr-only">
          <SheetTitle>Sidebar Navigation</SheetTitle>
          <SheetDescription>Sidebar Navigation for mobile.</SheetDescription>
        </SheetHeader>
        <nav className="relative bottom-5 grid gap-2 text-lg font-medium">
          <HeaderLogo />
          {projectConfig.sidebarItems?.map((item, index) => {
            const Icon = Icons[item.icon || "arrowRight"];
            return (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "mx-[-0.65rem] flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground",
                  item.href.startsWith(`${segment}`) &&
                    "bg-muted text-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
