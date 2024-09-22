"use client";

import * as React from "react";

import { updateTeamStatusAction } from "@/lib/actions";

import type { Row } from "@tanstack/react-table";
import type { Team } from "@/types";
import { teamTableConfig } from "@/config/table";

import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Icons } from "@/components/icons";

type Props = {
  row: Row<Team>;
  slug: string;
  isAdmin: boolean;
};

export function TeamTableStatus({ row, slug, isAdmin }: Props) {
  const initialStatus = teamTableConfig.statuses.find(
    (status) => status.value === row.getValue("status"),
  );
  if (!initialStatus) return null;
  const Icon = Icons[initialStatus.icon || "circle"];

  if (isAdmin) {
    return (
      <Badge
        variant={initialStatus.value === "Finish" ? "default" : "secondary"}
      >
        {initialStatus.icon && <Icon className="mr-2 h-3 w-3" />}
        <span>{initialStatus.label}</span>
      </Badge>
    );
  }

  const [status, setStatus] = React.useState(initialStatus);

  const [isPending, startTransition] = React.useTransition();
  const handleSelect = async (selectedValue: string) => {
    setOpen(false);

    startTransition(async () => {
      try {
        await updateTeamStatusAction(slug, row.getValue("no"), selectedValue);
        toast.success("Status updated.");

        const newStatus = teamTableConfig.statuses.find(
          (status) => status.value === selectedValue,
        );
        setStatus(newStatus || initialStatus);
      } catch (error) {
        toast.error("Error updating status.");
      }
    });
  };

  const [open, setOpen] = React.useState(false);
  return (
    <div className="relative flex min-w-[120px] items-center">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            className="h-fit justify-between p-0 font-normal"
            disabled={isPending}
          >
            <Badge
              variant={status.value === "Finish" ? "default" : "secondary"}
              className="w-full justify-between px-2 py-1"
            >
              {status.icon && <Icon className="mr-2 h-3 w-3" />}
              <span>{status.label}</span>
            </Badge>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[140px] p-0">
          <Command>
            <CommandList>
              <CommandGroup>
                {["On Progress", "Finish"].map((value) => (
                  <CommandItem
                    key={value}
                    value={value}
                    onSelect={handleSelect}
                    disabled={status.value === value}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4 opacity-0",
                        status.value === value && "opacity-100",
                      )}
                    />
                    {value}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
