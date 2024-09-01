import { cn } from "@/lib/utils";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export function Header({ children, className }: Props) {
  return (
    <header
      className={cn(
        "flex h-14 items-center justify-between gap-4 border-b bg-surface px-4 text-muted-foreground lg:h-14 lg:px-6",
        className,
      )}
    >
      {children}
    </header>
  );
}
