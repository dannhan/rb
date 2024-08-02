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
    <div className="flex h-screen w-full">
      <Sidebar items={items} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header>
          <SidebarMobile items={items} />
          <h1 className="flex-1 text-lg font-semibold capitalize md:text-xl">
            {segment?.split("-").join(" ")}
          </h1>
        </Header>

        <main className="flex-1 overflow-auto p-5">
          {children}
        </main>
      </div>
    </div>
  );
}
