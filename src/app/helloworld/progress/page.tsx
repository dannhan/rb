"use client";

import * as NProgress from "nprogress";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Button
        onClick={async () => {
          NProgress.start();
          NProgress.done();
        }}
      >
        Button
      </Button>
    </main>
  );
}
