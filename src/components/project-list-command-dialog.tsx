"use client";

import * as React from "react";

import { Project } from "@/types";

import {
  CalendarIcon,
  MailIcon,
  SmileIcon,
  SettingsIcon,
  UserIcon,
  RocketIcon,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

type Props = {
  konstruksiProjects: Project[];
  renovasiProjects: Project[];
};

export function ProjectListCommandDialog({
  konstruksiProjects,
  renovasiProjects,
}: Props) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-10 w-fit justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:w-40 sm:pr-12 md:w-64",
        )}
        onClick={() => setOpen(true)}
      >
        <span className="hidden md:inline-flex">Search Projects...</span>
        <span className="inline-flex md:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-7 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>J
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Konstruksi">
            {konstruksiProjects.map((project, index) => (
              <CommandItem key={index}>
                <span>{project.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Renovasi">
            {renovasiProjects.map((project, index) => (
              <CommandItem key={index}>
                <span>{project.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}