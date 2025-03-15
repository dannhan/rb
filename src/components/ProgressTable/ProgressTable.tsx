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
const ProgressTable: React.FC<Props> = ({ projectId, progress }: Props) => {
  const [data, setData] = React.useState(progress);
  const [lastAddedId, setLastAddedId] = React.useState<string | null>(null);
  const tableContainerRef = React.useRef<HTMLDivElement | null>(null);

  const newInputRef = React.useRef<HTMLInputElement | null>(null);

  const table = useReactTable({
    data: data,
    columns: getColumns(progress, newInputRef), // Pass progress data to extract week keys
    getCoreRowModel: getCoreRowModel(),
    initialState: {
      columnPinning: {
        left: ["no", "description"],
      },
    },
  });

  React.useEffect(() => {
    if (lastAddedId) {
      newInputRef.current?.focus();
    }
  }, [lastAddedId]);

  React.useEffect(() => {
    setTimeout(() => {
      if (tableContainerRef.current) {
        tableContainerRef.current.scrollLeft =
          tableContainerRef.current.scrollWidth;
        console.log(tableContainerRef.current.scrollWidth);
      }
    }, 0); // Short delay to ensure DOM is updated
  }, [data]);

  async function handleAddNewItem() {
    const result = await addProgressItemAction({ projectId });

    if (result.success) {
      // Add new item locally
      setData((prev) => [
        ...prev,
        {
          id: result.progressId,
          description: "",
          progress: {},
          position: result.position,
        },
      ]);
      setLastAddedId(result.progressId); // Track the newly added item
    }
  }

  return (
    <div className="relative rounded-lg border border-border">
      <Table className="w-full">
        <TableHeader className="bg-accent">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className={cn(
                    "relatve font-normal text-muted-foreground",
                    header.column.id === "no" &&
                      "sticky left-0 z-10 min-w-14 bg-accent",
                    header.column.id === "description" &&
                      "sticky left-14 z-10 min-w-[214px] whitespace-nowrap bg-accent px-4",
                    header.column.id.startsWith("week") &&
                      "min-w-[120px] whitespace-nowrap border-l text-center",
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
                      className="absolute right-0 top-0 h-[52px]"
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
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  // style={{ ...getCommonPinningStyles(cell.column) }}
                  className={cn(
                    cell.column.id === "no" &&
                      "sticky left-0 z-10 min-w-14 bg-background",
                    cell.column.id === "description" &&
                      "sticky left-14 z-10 min-w-[214px] whitespace-nowrap bg-background px-1 py-1",
                    cell.column.id.startsWith("week") &&
                      "min-w-[120px] whitespace-nowrap border-l bg-background px-1 py-1 text-center",
                    table.getRowCount() === index + 1 && "pb-1.5",
                  )}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  {(cell.column.id === "no" ||
                    cell.column.id === "description") && (
                    <Separator
                      className={cn(
                        "absolute right-0 top-0 h-[40px]",
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
