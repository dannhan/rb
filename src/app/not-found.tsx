import Link from "next/link";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";

export default function Page() {
  return (
    <div className="container flex h-dvh max-w-md flex-col items-center justify-center">
      <Card
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        className="flex w-full min-w-0 flex-col items-center justify-center overflow-hidden p-10"
      >
        <div className="grid place-items-center rounded-full border border-dashed border-muted-foreground/75 p-6">
          <TriangleAlert
            className="size-10 text-muted-foreground/75"
            aria-hidden="true"
          />
        </div>
        <div className="flex flex-col items-center justify-center space-y-1.5 py-14 text-center">
          <CardTitle className="text-2xl">Page not found</CardTitle>
          <CardDescription className="line-clamp-4">
            The page you are looking for does not exist
          </CardDescription>
        </div>
        <Button asChild variant="ghost">
          <Link href="/">
            Go to Home
            <span className="sr-only">Go to Home</span>
          </Link>
        </Button>
      </Card>
    </div>
  );
}
