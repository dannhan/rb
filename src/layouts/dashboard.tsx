import * as React from "react";
import type { SidebarItem } from "@/types";

import { Separator } from "@/components/ui/separator";

import { Header } from "@/layouts/header";
import { Sidebar } from "@/layouts/sidebar";
import { SidebarMobile } from "@/layouts/sidebar-mobile";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import ThemeToggle from "@/components/Common/ThemeToggle";
import { MaxWidthWrapper } from "./max-width-wrapper";

type Props = React.PropsWithChildren<{
  items: SidebarItem[];
  projectTitle: string;
}>;

export function Dashboard({ children, items, projectTitle }: Props) {
  return (
    <div className="flex h-screen w-full">
      <Sidebar items={items} />
      <div className="relative flex flex-1 flex-col overflow-hidden">
        <Header className="sticky left-0 top-0 justify-normal gap-2">
          <SidebarMobile items={items} />
          <Separator orientation="vertical" className="mr-2 h-4 md:hidden" />
          <BreadcrumbNav projectTitle={projectTitle} />
          <ThemeToggle className="ml-auto hidden md:flex" />
        </Header>
        <main className="flex-1 overflow-auto p-3 md:p-4">
          <MaxWidthWrapper>{children}</MaxWidthWrapper>
        </main>
      </div>
    </div>
  );
}
