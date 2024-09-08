"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<{ field: string; value: string }>[] = [
  // create number column
  {
    accessorKey: "id",
    cell: ({ row }) => {
      return (
        <span className="w-full truncate text-center">{row.index + 1}.</span>
      );
    },
  },
  {
    accessorKey: "field",
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="truncate font-medium">{row.getValue("field")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "value",
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="truncate">{row.getValue("value")}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
