import { ChevronsRight } from "lucide-react";

import { Header } from "@/layouts/header";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { ProjectListCommandDialog } from "@/components/project-list-command-dialog";

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header className="border-none bg-background text-muted-foreground shadow-md">
        <Logo />
        <div className="flex items-center gap-2">
          <ProjectListCommandDialog
            konstruksiProjects={[]}
            renovasiProjects={[]}
          />
          <ModeToggle />
        </div>
      </Header>

      <main className="flex flex-col items-center gap-4 p-4 md:flex-1 lg:p-6 lg:pb-10">
        <section className="flex w-full max-w-screen-lg flex-1 flex-col gap-4 md:flex-initial lg:max-h-64 lg:flex-1 xl:max-h-72 2xl:max-w-screen-xl">
          <h2 className="text-lg font-medium capitalize">Konstruksi</h2>
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
        <Separator className="my-2 w-full max-w-screen-lg 2xl:max-w-screen-xl" />
        <section className="flex w-full max-w-screen-lg flex-1 flex-col gap-4 md:flex-initial lg:max-h-64 lg:flex-1 xl:max-h-72 2xl:max-w-screen-xl">
          <h2 className="text-lg font-medium capitalize">Renovasi</h2>
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
      </main>
    </div>
  );
}
