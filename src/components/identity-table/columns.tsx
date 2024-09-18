"use client";

import type { Identity } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { IdentityTableRowAction } from "./identity-table-row-actions";

export function getColumns(
  slug: string,
  isAdmin: boolean,
): ColumnDef<Identity>[] {
  const column: ColumnDef<Identity>[] = [
    {
      accessorKey: "no",
      cell: ({ row }) => {
        return (
          <span className="w-full truncate text-center">
            {row.getValue("no")}.
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
