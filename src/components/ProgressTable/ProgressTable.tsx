"use client";

import * as React from "react";

import { Plus } from "lucide-react";
import {
  type Column,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import type { WithId, ProgressItem } from "@/types";
import { addProgressItemAction } from "@/actions/create";

import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import getColumns from "./columns";

interface Props {
  projectId: string;
  progress: WithId<ProgressItem>[];
}

const getCommonPinningStyles = (column: Column<any>): React.CSSProperties => {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === "left" && column.getIsLastColumn("left");
  const isFirstRightPinnedColumn =
    isPinned === "right" && column.getIsFirstColumn("right");

  return {
    boxShadow: isLastLeftPinnedColumn
      ? "-4px 0 4px -4px gray inset"
      : isFirstRightPinnedColumn
        ? "4px 0 4px -4px gray inset"
        : undefined,
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    opacity: isPinned ? 0.95 : 1,
    position: isPinned ? "sticky" : "relative",
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  };
};

const ProgressTable: React.FC<Props> = ({ projectId, progress }: Props) => {
  const [data, setData] = React.useState(progress);
  const [lastAddedId, setLastAddedId] = React.useState<string | null>(null);

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
    <div className="relative w-full overflow-x-scroll rounded-lg border">
      <Table>
        <TableHeader className="bg-accent">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  style={{ ...getCommonPinningStyles(header.column) }}
                  className={cn(
                    "font-normal text-muted-foreground",
                    // header.column.id === "description" && "border-l",
                    header.column.id.startsWith("week-") &&
                      "w-[120px] text-center",
                    // header.column.id.startsWith("week-") &&
                    //   "border-l",
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
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  style={{ ...getCommonPinningStyles(cell.column) }}
                  className={cn(
                    cell.column.id === "description" && "border-l px-1 py-0",
                    cell.column.id.startsWith("week-") &&
                      "w-10 border-l px-1 py-0",
                  )}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={5} className="p-0 text-muted-foreground">
              <button
                className="flex h-full w-full items-center px-4 py-2"
                onClick={() => handleAddNewItem()}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add new item
              </button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ProgressTable;
