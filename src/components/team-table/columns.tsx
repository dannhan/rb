"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Team } from "@/types";

import { teamTableConfig } from "@/config/table";

import { Checkbox } from "@/components/ui/checkbox";
import { Icons } from "@/components/icons";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<Team>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "no",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No." />
    ),
    cell: ({ row }) => <div className="w-[40px]">{row.getValue("no")}</div>,
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
    cell: ({ row }) => {
      const status = teamTableConfig.statuses.find(
        (status) => status.value === row.getValue("status"),
      );

      if (!status) {
        return null;
      }

      const Icon = Icons[status.icon || "circle"];
      return (
        <div className="flex max-w-[120px] items-center">
          {status.icon && (
            <Icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
