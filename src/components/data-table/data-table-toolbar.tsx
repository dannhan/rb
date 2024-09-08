"use client";

import { XIcon } from "lucide-react";
import { Table } from "@tanstack/react-table";

import { teamTableConfig } from "@/config/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateTeamDialog } from "@/components/create-team-dialog";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  slug: string;
}

export function DataTableToolbar<TData>({
  table,
  slug,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-col-reverse items-center justify-between gap-2 md:flex-row md:gap-0">
      <div className="flex w-full flex-1 items-center space-x-2">
        <Input
          placeholder="Search"
          value={
            (table.getColumn("pelaksana")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("pelaksana")?.setFilterValue(event.target.value)
          }
          className="h-8 flex-1 md:w-[125px] md:flex-initial lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={teamTableConfig.statuses}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <XIcon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex w-full justify-between gap-2 md:w-fit">
        <CreateTeamDialog slug={slug} />
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
