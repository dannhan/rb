import { cn } from "@/lib/utils/cn";

type Props = React.PropsWithChildren<{ className?: string }>;
const Header: React.FC<Props> = ({ children, className }) => {
  return (
    <header
      className={cn(
        "flex h-14 items-center justify-between gap-4 border-b bg-surface px-3 text-muted-foreground md:px-4 lg:h-14 lg:px-6",
        className,
      )}
    >
      {children}
    </header>
  );
};

export default Header;
