"use client";

import * as React from "react";

import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Identity } from "@/types";
import { cn } from "@/lib/utils";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";

import { IdentityTablePrint } from "./identity-table-print";
import { CreateIdentityDialog } from "./create-identity-dialog";
import { getColumns } from "./columns";

interface DataTableProps {
  data: Identity[];
  slug: string;
  admin?: boolean;
}

export function DataTable({ data, slug, admin }: DataTableProps) {
  const [globalFilter, setGlobalFilter] = React.useState<string>("");

  const columns = React.useMemo(() => getColumns(slug, !!admin), [slug, admin]);

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="w-full max-w-screen-md flex-1 space-y-2.5 pb-16">
      <DataTableToolbar table={table}>
        {admin && (
          <CreateIdentityDialog className="w-full max-w-xl" slug={slug} />
        )}
        <IdentityTablePrint table={table} />
      </DataTableToolbar>

      <div className="rounded-md border">
        <Table>
          <TableHeader className="sr-only">
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
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          cell.column.id === "field" && "border-l",
                          cell.column.id === "value" && "border-x",
                          (cell.column.id === "order" ||
                            cell.column.id === "actions") &&
                            "w-0 p-2.5 text-center",
                          "h-[53px]",
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
              </>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-96 text-center text-lg"
                >
                  No data uploaded yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
