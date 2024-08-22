import { cn } from "@/lib/utils";

type Props = {
  children?: React.ReactNode,
  className?: string,
}

export function Header({ children, className }: Props) {
  return (
    <header className={cn("flex h-14 items-center justify-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6", className)}>
      {/* <div className="flex items-center w-full max-w-screen-xl"> */}
        {children}
      {/* </div> */}
    </header>
  );
}
