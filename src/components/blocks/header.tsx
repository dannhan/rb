import { ModeToggle } from "./mode-toggle";
import { SidebarMobile } from "./sidebar-mobile";

export function Header() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <SidebarMobile />
      {/* <SearchInput /> */}

      <h1 className="w-full text-lg font-semibold md:text-2xl">Inventory</h1>
      <ModeToggle />
    </header>
  );
}
