"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import { Slash } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";

type Props = { className?: string; projectTitle: string };

export function BreadcrumbNav({ className, projectTitle }: Props) {
  const segment = useSelectedLayoutSegment();

  return (
    <Breadcrumb className={cn("hidden flex-1 sm:flex", className)}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link
            href="/home"
            className="text-base transition-colors hover:text-foreground"
          >
            Home
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <Link
            href="#"
            className="text-base transition-colors hover:text-foreground"
          >
            {projectTitle}
          </Link>
        </BreadcrumbItem>
        {/* todo, important */}
        {/* <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-0.5 text-base">
              {projectTitle}
              <Icons.arrowDown className="h-[18px] fill-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Documentation</DropdownMenuItem>
              <DropdownMenuItem>Themes</DropdownMenuItem>
              <DropdownMenuItem>GitHub</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem> */}
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage className="text-base capitalize">
            {segment?.split("-").join(" ") || ""}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
