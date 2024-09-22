"use client";

import * as React from "react";

import type { Team } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";

import {
  updateTeamCheckedAction,
  updateTeamCheckedBatchAction,
} from "@/lib/actions";

import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

import { DataTableRowActions } from "./team-table-row-actions";
import { DataTableFileColumns } from "./team-table-file-columns";
import { TeamTableStatus } from "./team-table-status";

export function getColumns(slug: string, isAdmin: boolean): ColumnDef<Team>[] {
  const column: ColumnDef<Team>[] = [
    {
      id: "select",
      header: function TableHeaderCheckbox({ table }) {
        const [isPending, startTransition] = React.useTransition();

        return (
          <Checkbox
            disabled={isPending}
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={async (value) => {
              startTransition(async () => {
                try {
                  await updateTeamCheckedBatchAction(slug, !!value);
                } catch (error) {
                  toast.error("Error updating team.");
                }
                table.toggleAllPageRowsSelected(!!value);
              });
            }}
            aria-label="Select all"
          />
        );
      },
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={async (value) => {
            try {
              await updateTeamCheckedAction(slug, row.getValue("no"), !!value);
              row.toggleSelected(!!value);
            } catch (error) {
              toast.error("Error updating team.");
            }
          }}
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
      cell: ({ row }) => (
        <TeamTableStatus row={row} slug={slug} isAdmin={isAdmin} />
      ),
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "fileId",
      id: "fileId",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="File"
          className="line-clamp-1"
        />
      ),
      cell: ({ row }) => <DataTableFileColumns row={row} slug={slug} />,
    },
  ];

  isAdmin &&
    column.push({
      id: "actions",
      cell: ({ row }) => <DataTableRowActions row={row} slug={slug} />,
    });

  return column;
}
