"use client";

import * as React from "react";

import {
  functionalUpdate,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useProgressWeeksContext } from "@/components/Providers/ProgressWeeksContext";
import { useProgressItemsContext } from "@/components/Providers/ProgressItemsContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import EmptyData from "@/components/Common/EmptyData";
import TablePagination from "@/components/TableFeatures/TablePagination";
import ProgressTableToolbar from "./ProgressTableToolbar";
import getColumns from "./columns";

// TODO:
// - dynamic width, refers to ImageDescription Input
// - auto scroll to the right-most
const ProgressTable: React.FC<{ admin: boolean }> = ({ admin }) => {
  // NOTE: using this make a white screen when reload
  const [pageSize, setPageSize] = useLocalStorage("pageSize", 10);
  const [pagination, setPagination] = React.useState({
    pageSize,
    pageIndex: 0,
  });

  const { weeks } = useProgressWeeksContext();
  const { items, shouldFocus } = useProgressItemsContext();

  const columns = getColumns(admin, weeks);
  const table = useReactTable({
    data: items,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex: false, //turn off auto reset of pageIndex
    onPaginationChange: (updater) => {
      const newValue = functionalUpdate(updater, pagination);
      setPageSize(newValue.pageSize);
      return setPagination(newValue);
    },
    state: { pagination },
  });

  React.useEffect(() => {
    // Move to the prev page after delete last data on current page
    if (table.getState().pagination.pageIndex > table.getPageCount() - 1) {
      table.lastPage();
    }

    // After add new data move to the last page if can go to the next page
    if (table.getCanNextPage() && shouldFocus) {
      table.lastPage();
    }
  }, [items.length]);

  return (
    <div className="space-y-4 pb-16">
      <ProgressTableToolbar admin={admin} weeks={weeks} />
      <div className="relative overflow-clip rounded-lg border border-border">
        <Table className="w-full border-separate border-spacing-0">
          <TableHeader className="bg-accent">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header, index) => (
                  <TableHead
                    key={header.id}
                    className={cn(
                      "relatve min-h-[52px] font-normal text-muted-foreground",
                      header.column.id === "no" &&
                        "sticky left-0 z-10 w-12 border-r bg-accent",
                      header.column.id === "attachment" &&
                        "sticky left-12 z-50 max-w-[132px] border-r bg-accent px-2",
                      header.column.id === "description" &&
                        "sticky left-[180px] z-10 min-w-[200px] whitespace-nowrap border-r bg-accent px-4",
                      header.column.id.startsWith("week") &&
                        "min-w-[80px] max-w-[125px] whitespace-nowrap border-l p-0 text-center md:min-w-[125px]",
                      // Remove border for left-most week column
                      index === 3 && "border-l-0",
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              <>
                {table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.original.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="group"
                  >
                    {row.getVisibleCells().map((cell, rowIndex) => (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          "h-[102px] whitespace-nowrap border-t bg-background transition-colors group-hover:bg-accent",
                          cell.column.id === "no" &&
                            "sticky left-0 z-50 min-w-12 border-r",
                          cell.column.id === "attachment" &&
                            "sticky left-12 z-50 max-w-[132px] border-r px-0",
                          cell.column.id === "description" &&
                            "sticky left-[180px] z-50 min-w-[200px] border-r px-1 py-1",
                          cell.column.id.startsWith("week") &&
                            "max-w-[120px] border-l px-1 py-1 text-center md:min-w-[120px]",
                          cell.column.id === "action" && "sticky left-0",
                          // Remove border for left-most week column
                          rowIndex === 3 && "border-l-0",
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
                ].map((_, indexRow) => {
                  return (
                    <tr key={indexRow} className="h-[102px]">
                      {[...Array(columns.length)].map((_, indexCol) => (
                        <td
                          key={indexCol}
                          className={cn(
                            "row-span-5",
                            indexRow === 0 && "border-t",
                          )}
                        ></td>
                      ))}
                    </tr>
                  );
                })}
              </>
            ) : (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={columns.length}
                  className="h-96 border-t text-center text-lg"
                >
                  <EmptyData
                    admin={admin}
                    className="w-full border-none bg-transparent"
                    title="No data found."
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <TablePagination table={table} />
    </div>
  );
};

export default ProgressTable;
