"use client";

import * as React from "react";

import { updateTeamStatusAction } from "@/actions/update";

import type { Row } from "@tanstack/react-table";
import type { Team } from "@/types";
import { teamTableConfig } from "@/config/table";

import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { PopoverClose } from "@radix-ui/react-popover";
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
  admin: boolean;
};

export function TeamTableStatus({ row, admin }: Props) {
  const [isPending, startTransition] = React.useTransition();
  const status = teamTableConfig.statuses.find(
    (status) => status.value === row.original.status,
  );

  if (!status) return null;
  const Icon = Icons[status.icon || "circle"];

  if (admin) {
    return (
      <div className="min-w-[120px]">
        <Badge variant={status.value === "Finish" ? "default" : "secondary"}>
          {status.icon && <Icon className="mr-2 h-3 w-3" />}
          <span>{status.label}</span>
        </Badge>
      </div>
    );
  }

  const handleSelect = async (selectedValue: string) => {
    startTransition(async () => {
      try {
        await updateTeamStatusAction({
          id: row.original.id,
          slug: row.original.slug,
          status: selectedValue,
        });

        toast.success("Status updated.");
      } catch (error) {
        toast.error("Error updating status.");
      }
    });
  };
  return (
    <div className="relative flex min-w-[120px] items-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            role="combobox"
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
                  <PopoverClose key={value} className="w-full">
                    <CommandItem
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
                  </PopoverClose>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
