"use client";

import { type ReactNode, type CSSProperties } from "react";

import { cn } from "@/lib/utils/cn";
import Cards from "./AnimatedEmptyStateCards";

type Props = {
  title: string;
  description: string;
  icon: ReactNode;
  addButton?: ReactNode;
  className?: string;
};
const AnimatedEmptyState: React.FC<Props> = (props) => {
  const { title, description, icon, addButton, className } = props;
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-6 rounded-lg border px-4 py-10 md:min-h-[480px]",
        className,
      )}
    >
      <div className="animate-fade-in h-36 w-full max-w-64 overflow-hidden px-4 [mask-image:linear-gradient(transparent,black_10%,black_90%,transparent)]">
        <div
          style={{ "--scroll": "-50%" } as CSSProperties}
          className="flex animate-infinite-scroll-y flex-col [animation-duration:10s]"
        >
          <Cards icon={icon} />
        </div>
      </div>
      <div className="max-w-sm text-pretty text-center">
        <span className="text-base font-medium">{title}</span>
        <p className="mt-2 text-pretty text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      <div className="flex items-center gap-2">{addButton}</div>
    </div>
  );
};
export default AnimatedEmptyState;
