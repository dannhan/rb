import { ChevronsRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  type: string;
};

export function ProjectCardsListSkeleton({ type }: Props) {
  return (
    <section className="flex w-full max-w-screen-lg flex-1 flex-col gap-4 md:flex-initial lg:max-h-64 lg:flex-1 xl:max-h-72 2xl:max-w-screen-xl">
      <h2 className="text-lg font-medium capitalize">{type}</h2>
      <div className="grid flex-1 gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
        <Skeleton className="h-20 border-none shadow-[0px_1px_2px_.75px_#00000024] lg:h-full" />
        <Skeleton className="h-20 border-none shadow-[0px_1px_2px_.75px_#00000024] lg:h-full" />
        <Skeleton className="h-20 border-none shadow-[0px_1px_2px_.75px_#00000024] lg:h-full" />
        <Skeleton className="h-20 border-none shadow-[0px_1px_2px_.75px_#00000024] lg:h-full" />
      </div>
      <Button
        className="flex items-center bg-background"
        size="sm"
        variant="outline"
        disabled
      >
        <span className="mr-1">See More</span>
        <ChevronsRight className="h-5 w-5" />
      </Button>
    </section>
  );
}
