import { cn } from "@/lib/utils/cn";
import { ReactNode } from "react";

type Props = { className?: string; children: ReactNode };
const MaxWidthWrapper: React.FC<Props> = ({ className, children }) => {
  return (
    <div
      className={cn("mx-auto w-full max-w-screen-xl px-3 lg:px-10", className)}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
