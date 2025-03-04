"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { SearchIcon } from "lucide-react";

import type { WithId, Project } from "@/types";
import { cn } from "@/lib/utils";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";

type Props = {
  projects: { konstruksi: WithId<Project>[]; renovasi: WithId<Project>[] };
};

const ProjectSearchDialog: React.FC<Props> = ({ projects }) => {
  const router = useRouter();
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

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-10 w-10 rounded-[0.5rem] bg-muted/50 p-0 text-sm font-normal text-muted-foreground shadow-none sm:w-40 sm:justify-start sm:px-4 sm:pr-12 md:w-64",
        )}
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="h-[1.2rem] w-[1.2rem] sm:hidden" />
        <span className="hidden md:inline-flex">Search Projects...</span>
        <span className="hidden sm:inline-flex md:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-7 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>J
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Konstruksi">
            {projects.konstruksi.map((project) => (
              <CommandItem
                key={project.id}
                onSelect={() => {
                  runCommand(() =>
                    router.push(`${project.id}/identitas-proyek`),
                  );
                }}
              >
                <span>{project.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Renovasi">
            {projects.renovasi.map((project) => (
              <CommandItem
                key={project.id}
                onSelect={() => {
                  runCommand(() =>
                    router.push(`${project.id}/identitas-proyek`),
                  );
                }}
              >
                <span>{project.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default ProjectSearchDialog;
