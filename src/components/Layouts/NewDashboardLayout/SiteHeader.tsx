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
import { SidebarTrigger } from "@/components/ui/sidebar";
import ThemeToggle from "@/components/Common/ThemeToggle";

const SiteHeader = ({ projectTitle }: { projectTitle: string }) => {
  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-14 sticky top-0 z-50 flex h-14 shrink-0 items-center gap-2 border-b bg-background transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb className="flex items-center whitespace-nowrap">
          <BreadcrumbList className="text-base font-[440]">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/home">
                  <HomeIcon className="h-4 w-4 md:hidden" />
                  <span className="hidden md:block">Home</span>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="font-medium">
              {projectTitle}
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <ThemeToggle className="ml-auto" />
      </div>
    </header>
  );
};
export default SiteHeader;
