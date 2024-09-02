"use client";

import { useEffect } from "react";

import { TriangleAlert } from "lucide-react";
import { toast } from "sonner";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// todo: maybe revamp this page
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    setTimeout(() => {
      toast.error("An error occurred. Please contact the administrator.", {
        duration: 5000,
      });
    });
  }, []);

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
          <CardTitle className="text-2xl">Something went wrong!</CardTitle>
          <CardDescription className="line-clamp-4">
            {error.message || "An error occurred."}
          </CardDescription>
        </div>
        <Button variant="outline" onClick={() => reset()}>
          Try again
        </Button>
      </Card>
    </div>
  );
}
