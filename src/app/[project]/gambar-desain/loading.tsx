import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Card>
      <CardHeader className="mb-0 flex flex-col justify-between pb-0">
        <div>
          <CardTitle className="text-xl">Gambar Desain</CardTitle>
          <CardDescription className="text-xs sm:block">
            These are all of the images that have been uploaded.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="mt-6 h-[425px] w-full" />
      </CardContent>
    </Card>
  );
}
