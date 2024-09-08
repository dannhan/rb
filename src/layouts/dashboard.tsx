import { SidebarItem } from "@/types";

import { Header } from "@/layouts/header";
import { Sidebar } from "@/layouts/sidebar";
import { SidebarMobile } from "@/layouts/sidebar-mobile";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { ModeToggle } from "@/components/mode-toggle";

type Props = {
  children: React.ReactNode;
  items: SidebarItem[];
  projectTitle: string;
};

export function Dashboard({ children, items, projectTitle }: Props) {
  return (
    <div className="flex h-screen w-full">
      <Sidebar items={items} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header>
          <SidebarMobile items={items} />
          <BreadcrumbNav projectTitle={projectTitle} />
          <ModeToggle />
        </Header>

        <main className="flex-1 overflow-auto p-5">{children}</main>
      </div>
    </div>
  );
}
