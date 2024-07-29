import { SidebarItem } from "@/types";
import { Sidebar } from "@/components/blocks/sidebar";
import { ModeToggle } from "@/components/blocks/mode-toggle";
import { SidebarMobile } from "@/components/blocks/sidebar-mobile";

type Props = {
  children?: React.ReactNode;
  items?: SidebarItem[];
};

export function Dashboard({ children, items }: Props) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar items={items} />

      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <SidebarMobile items={items} />
          <h1 className="w-full text-lg font-semibold md:text-2xl">
            Inventory
          </h1>
          <ModeToggle />
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
