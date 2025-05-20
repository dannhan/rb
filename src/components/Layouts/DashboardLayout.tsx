import Link from "next/link";

import { HomeIcon } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";

import { Sidebar } from "@/components/Sidebar/sidebar";
import { SidebarMobile } from "@/components/Sidebar/sidebar-mobile";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Header from "@/components/Header";
import ProjectBreadcrumbPage from "@/components/ProjectBreadcrumbPage";
import ThemeToggle from "@/components/Common/ThemeToggle";

type Props = React.PropsWithChildren<{ projectTitle: string }>;

const DashboardLayout: React.FC<Props> = ({ children, projectTitle }) => {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <div className="relative flex flex-1 flex-col overflow-hidden">
        <Header className="sticky left-0 top-0 justify-normal gap-2">
          <SidebarMobile />
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
        <main className="flex-1 overflow-auto p-3 sm:px-4 md:p-4 lg:px-10">
          <MaxWidthWrapper>{children}</MaxWidthWrapper>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
