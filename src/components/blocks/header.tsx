import { SearchInput } from "./search-input";
import { ModeToggle } from "./mode-toggle";
import { SidebarMobile } from "./sidebar-mobile";

export function Header() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <SidebarMobile />
      <SearchInput />
      <ModeToggle />
    </header>
  );
}
