import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="mx-auto max-w-[750px] space-y-4">
      <Skeleton className="h-52" />
    </main>
  );
}
