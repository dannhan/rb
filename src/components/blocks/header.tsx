import { ModeToggle } from "./mode-toggle";

export function Header({ children }: { children?: React.ReactNode }) {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      {children}
      <ModeToggle />
    </header>
  );
}
