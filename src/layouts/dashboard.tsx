import Link from "next/link";

import type { SidebarItem } from "@/types";

import { HomeIcon } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";

import { Header } from "@/layouts/header";
import { Sidebar } from "@/layouts/sidebar";
import { SidebarMobile } from "@/layouts/sidebar-mobile";
import ThemeToggle from "@/components/Common/ThemeToggle";
import ProjectBreadcrumbPage from "@/components/ProjectBreadcrumbPage";
import { MaxWidthWrapper } from "./max-width-wrapper";

type Props = React.PropsWithChildren<{
  items: SidebarItem[];
  projectTitle: string;
}>;

export function Dashboard({ children, items, projectTitle }: Props) {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <div className="relative flex flex-1 flex-col overflow-hidden">
        <Header className="sticky left-0 top-0 justify-normal gap-2">
          <SidebarMobile items={items} />
          <Separator orientation="vertical" className="mr-2 h-4 md:hidden" />
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
                <ProjectBreadcrumbPage />
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <ThemeToggle className="ml-auto hidden md:flex" />
        </Header>
        <main className="flex-1 overflow-auto p-3 md:p-4">
          <MaxWidthWrapper>{children}</MaxWidthWrapper>
        </main>
      </div>
    </div>
  );
}
