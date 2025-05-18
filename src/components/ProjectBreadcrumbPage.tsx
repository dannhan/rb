"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

import { projectConfig } from "@/config/project";
import { BreadcrumbPage } from "@/components/ui/breadcrumb";

const ProjectBreacrumbPage = () => {
  const pathname = usePathname();
  const pageTitle = React.useMemo(
    () =>
      projectConfig.sidebarItems.find(
        (item) => item.href === pathname.split("/")[2],
      )?.title,
    [pathname],
  );

  return <BreadcrumbPage>{pageTitle}</BreadcrumbPage>;
};

export default ProjectBreacrumbPage;
