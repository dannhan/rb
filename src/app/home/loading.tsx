import { Sun, Moon, ChevronsRight, Search, LogOut } from "lucide-react";

import { Header } from "@/layouts/header";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header className="border-none bg-background text-muted-foreground shadow-md">
        <Logo />
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="relative h-10 w-10 rounded-[0.5rem] bg-muted/50 p-0 text-sm font-normal text-muted-foreground shadow-none sm:w-40 sm:justify-start sm:px-4 sm:pr-12 md:w-64"
          >
            <Search className="h-[1.2rem] w-[1.2rem] sm:hidden" />
            <span className="hidden md:inline-flex">Search Projects...</span>
            <span className="hidden sm:inline-flex md:hidden">Search...</span>
            <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-7 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>J
            </kbd>
          </Button>
          <Button variant="outline" size="icon" className="bg-muted/50">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button variant="outline" size="icon" className="bg-muted/50">
            <LogOut className="size-[1.2rem]" />
          </Button>
        </div>
      </Header>
      <main className="flex flex-col items-center gap-4 p-4 md:flex-1 lg:p-6 lg:pb-10">
        <section className="flex w-full max-w-screen-lg flex-1 flex-col gap-4 md:flex-initial lg:max-h-64 lg:flex-1 xl:max-h-72 xl:max-w-screen-xl">
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
        <section className="flex w-full max-w-screen-lg flex-1 flex-col gap-4 md:flex-initial lg:max-h-64 lg:flex-1 xl:max-h-72 xl:max-w-screen-xl">
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
