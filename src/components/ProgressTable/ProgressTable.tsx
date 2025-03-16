"use client";

import * as React from "react";

import { Plus } from "lucide-react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import type { WithId, ProgressItem } from "@/types";
import { addProgressItemAction } from "@/actions/create";

import { nanoid } from "@/lib/nanoid";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import getColumns from "./columns";

interface Props {
  projectId: string;
  progress: WithId<ProgressItem>[];
}

// TODO:
// - dynamic width, refers to ImageDescription Input
// - optimistic update
// - auto focus input
// - auto scroll to the right-most
const ProgressTable: React.FC<Props> = ({ projectId, progress }: Props) => {
  const newInputRef = React.useRef<HTMLInputElement | null>(null);

  const table = useReactTable({
    data: progress,
    columns: getColumns(progress, newInputRef), // Pass progress data to extract week keys
    getCoreRowModel: getCoreRowModel(),
  });

  async function handleAddNewItem() {
    const progressId = nanoid();
    const newPosition =
      progress.length > 0
        ? progress[progress.length - 1].position + 1000
        : 1000;
    await addProgressItemAction({
      progressId,
      projectId,
      newPosition,
    });
  }

  return (
    <div className="relative overflow-hidden rounded-lg border border-border">
      <Table className="w-full">
        <TableHeader className="bg-accent">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header, index) => (
                <TableHead
                  key={header.id}
                  className={cn(
                    "relatve font-normal text-muted-foreground",
                    header.column.id === "no" &&
                    "sticky left-0 z-10 w-12 bg-accent",
                    header.column.id === "description" &&
                    "sticky left-12 z-10 min-w-[200px] whitespace-nowrap bg-accent px-4",
                    header.column.id.startsWith("week") &&
                    "min-w-[80px] max-w-[125px] whitespace-nowrap border-l text-center md:min-w-[125px]",
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
          {table.getRowModel().rows.map((row, index) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell, rowIndex) => (
                <TableCell
                  key={cell.id}
                  // style={{ ...getCommonPinningStyles(cell.column) }}
                  className={cn(
                    "h-[40px]",
                    cell.column.id === "no" &&
                    "sticky left-0 z-10 min-w-12 bg-background",
                    cell.column.id === "description" &&
                    "sticky left-12 z-10 min-w-[200px] whitespace-nowrap bg-background px-1 py-1",
                    cell.column.id.startsWith("week") &&
                    "max-w-[120px] whitespace-nowrap border-l bg-background px-1 py-1 text-center md:min-w-[120px]",
                    table.getRowCount() === index + 1 && "h-[42px] pb-1.5",
                    rowIndex === 2 && "border-l-0",
                  )}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  {(cell.column.id === "no" ||
                    cell.column.id === "description") && (
                      <Separator
                        className={cn(
                          "absolute right-0 top-0 h-[40px] w-[0.75px]",
                          table.getRowCount() === index + 1 && "h-[42px]",
                        )}
                        orientation="vertical"
                      />
                    )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        className="w-full justify-start rounded-t-none border-x-0 border-b-0 border-t text-muted-foreground"
        variant="outline"
        onClick={() => handleAddNewItem()}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add new item
      </Button>
    </div>
  );
};

export default ProgressTable;
