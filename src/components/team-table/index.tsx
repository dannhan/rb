"use client";

import * as React from "react";

import { Team } from "@/types";

import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { CreateTeamDialog } from "@/components/create-team-dialog";
import { getColumns } from "./columns";
import { DataTablePrint } from "./team-table-print";

interface DataTableProps {
  data: Team[];
  slug: string;
  isLoading?: boolean;
}

export function DataTable({ data, slug, isLoading }: DataTableProps) {
  const initialRowSelection: Record<string, boolean> = {};
  data.forEach((team, index) => {
    if (team.checked === true) {
      initialRowSelection[index.toString()] = true;
    }
  });

  const [rowSelection, setRowSelection] = React.useState(initialRowSelection);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [globalFilter, setGlobalFilter] = React.useState<string>("");
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const columns = React.useMemo(() => getColumns(slug), []);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      globalFilter,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="space-y-4 pb-16">
      <DataTableToolbar table={table}>
        <CreateTeamDialog slug={slug} />
        <DataTablePrint table={table} />
        <DataTableViewOptions table={table} />
      </DataTableToolbar>

      <ScrollArea className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              <>
                {table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={cn("data-[state=selected]:bg-background")}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          cell.column.id === "select" && "",
                          cell.column.id === "actions" && "w-0 p-2.5",
                          cell.column.id === "pekerjaan" &&
                            row.getIsSelected() &&
                            "text-primary",
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
                {[
                  ...Array(
                    table.getState().pagination.pageSize -
                      table.getRowModel().rows.length,
                  ),
                ].map((_, i) => (
                  <tr key={i} className="h-[53px]"></tr>
                ))}
              </>
            ) : isLoading ? (
              // todo: improve skeleton loading
              <TableRow>
                <TableCell colSpan={columns.length} className="p-0">
                  <Skeleton className="h-96 w-full rounded-none"></Skeleton>
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-96 text-center text-lg"
                >
                  No data found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <DataTablePagination table={table} />
    </div>
  );
}
