"use client";

import { teamTableConfig } from "@/config/table";
import { Table } from "@tanstack/react-table";

import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter";
import { DebouncedInput } from "@/components/debounced-input";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  children?: React.ReactNode;
}

export function DataTableToolbar<TData>({
  table,
  children,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-col-reverse items-center justify-between gap-2 md:flex-row md:gap-0">
      <div className="flex w-full flex-1 items-center space-x-2">
        <DebouncedInput
          debounce={200}
          placeholder="Search"
          value={table.getState().globalFilter}
          onChange={(value) => table.setGlobalFilter(String(value))}
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
        {children}
      </div>
    </div>
  );
}
