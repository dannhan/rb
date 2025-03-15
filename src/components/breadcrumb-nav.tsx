"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HomeIcon } from "lucide-react";

type Props = { projectTitle: string };

export function BreadcrumbNav({ projectTitle }: Props) {
  const segment = useSelectedLayoutSegment();

  return (
    <Breadcrumb className="whitespace-nowrap">
      <BreadcrumbList className="md:text-base">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/home">
              <HomeIcon className="h-4 w-4 md:hidden" />
              <span className="hidden md:block">Home</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>{projectTitle}</BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="capitalize">
            {segment?.split("-").join(" ") || ""}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
