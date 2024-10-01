"use client";

import * as React from "react";

import type { Team } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

import { DataTableRowActions } from "./team-table-row-actions";
import { DataTableFileColumns } from "./team-table-file-columns";
import { TeamTableStatus } from "./team-table-status";

export function getColumns(slug: string, admin: boolean): ColumnDef<Team>[] {
  const column: ColumnDef<Team>[] = [
    {
      accessorKey: "order",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="No." className="w-14" />
      ),
      cell: ({ row }) => <div className="w-14">{row.getValue("order")}</div>,
      enableSorting: true,
      enableHiding: false,
    },
    {
      accessorKey: "pekerjaan",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Pekerjaan" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("pekerjaan")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "spk",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="SPK" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("spk")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "pelaksana",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Pelaksana" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("pelaksana")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => <TeamTableStatus row={row} admin={admin} />,
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "fileId",
      id: "fileId",
      header: () => <span>File</span>,
      cell: ({ row }) => <DataTableFileColumns row={row} slug={slug} />,
    },
  ];

  admin &&
    column.push({
      id: "actions",
      cell: ({ row }) => <DataTableRowActions row={row} slug={slug} />,
    });

  return column;
}
