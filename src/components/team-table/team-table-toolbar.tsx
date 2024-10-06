"use client";

import { Table } from "@tanstack/react-table";

import { XIcon } from "lucide-react";

import type { Team } from "@/types";
import { teamTableConfig } from "@/config/table";

import { Button } from "@/components/ui/button";
import { DebouncedInput } from "@/components/debounced-input";
import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { TeamTablePrint } from "./team-table-print";
import { CreateTeamDialog } from "./create-team-dialog";

interface TeamTableToolbarProps {
  table: Table<Team>;
  slug: string;
  admin?: boolean;
}

export function TeamTableToolbar({
  table,
  slug,
  admin,
}: TeamTableToolbarProps) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
      <div className="flex w-full flex-1 items-center space-x-2 sm:max-w-[500px]">
        <DebouncedInput
          debounce={200}
          placeholder="Search"
          value={table.getState().globalFilter}
          onChange={(value) => table.setGlobalFilter(String(value))}
          className="h-8 flex-1 sm:max-w-[150px] sm:flex-initial lg:max-w-[225px]"
        />
        <DataTableFacetedFilter
          column={table.getColumn("status")}
          title="Status"
          options={teamTableConfig.statuses}
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="hidden h-8 px-2 lg:flex lg:px-3"
          >
            Reset
            <XIcon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-fit">
        {admin && <CreateTeamDialog slug={slug} />}
        <TeamTablePrint table={table} />
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
