"use client";

import * as React from "react";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import type { WithId, ProgressItem } from "@/types";

import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

import TablePagination from "@/components/TableFeatures/TablePagination";
import ProgressTableToolbar from "./ProgressTableToolbar";
import getColumns from "./columns";

interface Props {
  admin: boolean;
  progress: WithId<ProgressItem>[];
  weekKeys: string[];
  latestWeekNumber: number;
  handleAddNewProgressItem: () => void;
}

// TODO:
// - dynamic width, refers to ImageDescription Input
// - auto focus input
// - auto scroll to the right-most
const ProgressTable: React.FC<Props> = ({
  admin,
  progress,
  weekKeys,
  latestWeekNumber,
  handleAddNewProgressItem,
}) => {
  const newInputRef = React.useRef<HTMLInputElement | null>(null);

  const table = useReactTable({
    data: progress,
    columns: getColumns(admin, progress, weekKeys, newInputRef),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex: false, //turn off auto reset of pageIndex
  });

  return (
    <div className="space-y-4 pb-16">
      <ProgressTableToolbar
        admin={admin}
        progress={progress}
        weekKeys={weekKeys}
        latestWeekNumber={latestWeekNumber}
        handleAddNewProgressItem={async () => {
          handleAddNewProgressItem();
          // wait for new page created
          await new Promise((resolve) => setTimeout(resolve, 0));
          if (table.getCanNextPage())
            table.setPageIndex(table.getPageCount() - 1);
        }}
      />
      <div className="relative overflow-clip rounded-lg border border-border">
        <Table className="w-full">
          <TableHeader className="bg-accent">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header, index) => (
                  <TableHead
                    key={header.id}
                    className={cn(
                      "relatve min-h-[52px] font-normal text-muted-foreground",
                      header.column.id === "no" &&
                      "sticky left-0 z-10 w-12 bg-accent",
                      header.column.id === "description" &&
                      "sticky left-12 z-10 min-w-[200px] whitespace-nowrap bg-accent px-4",
                      header.column.id.startsWith("week") &&
                      "min-w-[80px] max-w-[125px] whitespace-nowrap border-l text-center md:min-w-[125px]",
                      // Remove border for left-most week column
                      index === 2 && "border-l-0",
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    {(header.column.id === "no" ||
                      header.column.id === "description") && (
                        <Separator
                          className="absolute right-0 top-0 h-[52px] w-[0.75px]"
                          orientation="vertical"
                        />
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="group"
              >
                {row.getVisibleCells().map((cell, rowIndex) => (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      "h-[40px] whitespace-nowrap bg-background transition-colors group-hover:bg-accent",
                      cell.column.id === "no" && "sticky left-0 z-50 min-w-12",
                      cell.column.id === "description" &&
                      "sticky left-12 z-50 min-w-[200px] px-1 py-1",
                      cell.column.id.startsWith("week") &&
                      "max-w-[120px] border-l px-1 py-1 text-center md:min-w-[120px]",
                      cell.column.id === "action" && "sticky left-0",
                      // Remove border for left-most week column
                      rowIndex === 2 && "border-l-0",
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    {(cell.column.id === "no" ||
                      cell.column.id === "description") && (
                        <Separator
                          className="absolute right-0 top-0 h-[40px] w-[0.75px]"
                          orientation="vertical"
                        />
                      )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* {admin && ( */}
        {/*   <Button */}
        {/*     className="w-full justify-start rounded-t-none border-x-0 border-b-0 border-t text-muted-foreground hover:text-muted-foreground" */}
        {/*     variant="outline" */}
        {/*     onClick={() => handleAddNewProgressItem()} */}
        {/*   > */}
        {/*     <Plus className="mr-2 h-4 w-4" /> */}
        {/*     Add new item */}
        {/*   </Button> */}
        {/* )} */}
      </div>
      <TablePagination table={table} />
    </div>
  );
};

export default ProgressTable;
