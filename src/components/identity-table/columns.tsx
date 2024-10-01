"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Identity } from "@/types";
import { IdentityTableRowAction } from "./identity-table-row-actions";

export function getColumns(
  slug: string,
  isAdmin: boolean,
): ColumnDef<Identity>[] {
  const column: ColumnDef<Identity>[] = [
    {
      accessorKey: "order",
      cell: ({ row }) => {
        return (
          <span className="w-full truncate text-center">
            {row.getValue("order")}.
          </span>
        );
      },
    },
    {
      accessorKey: "field",
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="truncate font-bold">{row.getValue("field")}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "value",
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="truncate font-normal">
              {row.getValue("value")}
            </span>
          </div>
        );
      },
    },
  ];

  isAdmin &&
    column.push({
      id: "actions",
      cell: ({ row }) => <IdentityTableRowAction row={row} slug={slug} />,
    });

  return column;
}
