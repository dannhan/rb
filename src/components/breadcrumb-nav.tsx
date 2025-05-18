"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HomeIcon } from "lucide-react";
import { projectConfig } from "@/config/project";

type Props = { projectTitle: string };

export function BreadcrumbNav({ projectTitle }: Props) {
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
          <PageNameBreadcrumb />
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function PageNameBreadcrumb() {
  const pathname = usePathname();
  const pageTitle = projectConfig.sidebarItems.find(
    (item) => item.href === pathname.split("/")[2],
  )?.title;

  return <BreadcrumbPage>{pageTitle}</BreadcrumbPage>;
}
