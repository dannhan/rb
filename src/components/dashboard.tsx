"use client";

import { SidebarItem } from "@/types";
import { Header } from "@/components/blocks/header";
import { Sidebar } from "@/components/blocks/sidebar";
import { SidebarMobile } from "@/components/blocks/sidebar-mobile";
import { useSelectedLayoutSegment } from "next/navigation";

type Props = {
  children?: React.ReactNode;
  items?: SidebarItem[];
};

export function Dashboard({ children, items }: Props) {
  const segment = useSelectedLayoutSegment();

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar items={items} />

      <div className="flex flex-col">
        <Header>
          <SidebarMobile items={items} />
          <h1 className="flex-1 text-lg font-semibold capitalize md:text-2xl">
            {segment?.split("-").join(" ")}
          </h1>
        </Header>

        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
