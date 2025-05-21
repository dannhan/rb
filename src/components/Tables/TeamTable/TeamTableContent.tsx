"use client";
"use no memo";

import { useState } from "react";
import { geistMono } from "@/styles/fonts";

import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import {
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import type { ColumnDef } from "@tanstack/react-table";
import type { WithId, TeamMember } from "@/types";

import { cn } from "@/lib/utils/cn";
import { useRoleContext } from "@/components/Providers/UserRoleProvider";
import { useTeamContext } from "@/components/Providers/TeamProvider";
import { useCreateUpdateTeamModal } from "@/components/Dialogs/CreateUpdateTeamDialog";
import { useUploadTeamAttachmentModal } from "@/components/Dialogs/UploadTeamAttachmentDialog";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TablePagination from "@/components/Tables/TablePagination";
import TableColumnHeader from "@/components/Tables/TableColumnHeader";
import TeamTableStatusColumn from "./TeamTableStatusColumn";
import TeamTableRow from "./TeamTableRow";
import TeamTableActionColumn from "./TeamTableActionColumn";
import TeamTableAttachmentColumn from "./TeamTableAttachmentColumn";

const TeamTableContent: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);

  const [globalFilter] = useQueryState("search");

  const [selectedStatus] = useQueryState("status", {
    ...parseAsArrayOf(parseAsString),
  });
  const columnFilters: ColumnFiltersState = [
    ...(selectedStatus ? [{ id: "status", value: selectedStatus }] : []),
  ];

  const [hiddenColumns] = useQueryState("hide", {
    ...parseAsArrayOf(parseAsString),
    defaultValue: [],
  });
  const columnVisibility: VisibilityState = Object.fromEntries(
    hiddenColumns.map((key) => [key, false]),
  );

  const { admin } = useRoleContext();
  const { team } = useTeamContext();
  const { setShowCreateUpdateTeamModal, CreateUpdateTeamModal } =
    useCreateUpdateTeamModal({ id: selectedId, setSelectedId });
  const { setShowUploadTeamAttachmentModal, UploadTeamAttachmentModal } =
    useUploadTeamAttachmentModal({ id: selectedId, setSelectedId });

  const table = useReactTable({
    data: team,
    columns: [
      {
        id: "no",
        accessorKey: "position",
        enableSorting: false,
        enableHiding: false,
        header: ({ column }) => (
          <TableColumnHeader column={column} title="No." />
        ),
        cell: ({ row }) => (
          <Badge
            variant="outline"
            className="truncate bg-muted/40 text-center font-medium"
          >
            {row.index + 1}
          </Badge>
        ),
        meta: {
          headerClassName:
            "flex h-[50px] w-full max-w-[50px] items-center justify-center",
          cellClassName: "w-10 p-2.5 text-center",
        },
      },
      {
        accessorKey: "pekerjaan",
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Pekerjaan" />
        ),
        cell: ({ row }) => (
          <span className="max-w-[500px] truncate font-[450]">
            {row.getValue("pekerjaan")}
          </span>
        ),
      },
      {
        accessorKey: "spk",
        header: ({ column }) => (
          <TableColumnHeader column={column} title="SPK" />
        ),
        cell: ({ row }) => (
          <span
            className={cn(
              "max-w-[500px] truncate text-sm",
              geistMono.className,
            )}
          >
            {row.getValue("spk")}
          </span>
        ),
      },
      {
        accessorKey: "pelaksana",
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Pelaksana" />
        ),
        cell: ({ row }) => (
          <span className="max-w-[500px] truncate font-[450]">
            {row.getValue("pelaksana")}
          </span>
        ),
      },
      {
        accessorKey: "status",
        filterFn: (row, id, value) => value.includes(row.getValue(id)),
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => (
          <TeamTableStatusColumn
            id={row.original.id}
            status={row.original.status}
          />
        ),
        meta: { cellClassName: "min-w-[130px] px-2.5" },
      },
      {
        accessorKey: "attachment",
        header: "Attachment",
        cell: ({ row }) => (
          <TeamTableAttachmentColumn
            attachments={row.original.attachments}
            onUpload={() => {
              setSelectedId(row.original.id);
              setShowUploadTeamAttachmentModal(true);
            }}
          />
        ),
        meta: { cellClassName: "px-2.5 py-2" },
      },

      // Menu
      ...(admin
        ? ([
            {
              id: "actions",
              cell: ({ row }) => (
                <TeamTableActionColumn
                  id={row.original.id}
                  fileKeys={row.original.attachments?.map((f) => f.key)}
                  onEdit={() => {
                    setSelectedId(row.original.id);
                    setShowCreateUpdateTeamModal(true);
                  }}
                />
              ),
              meta: {
                cellClassName: "w-[60px] px-2.5",
              },
            },
          ] as ColumnDef<WithId<TeamMember>>[])
        : []),
    ],
    state: { sorting, columnVisibility, columnFilters, globalFilter },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    autoResetPageIndex: false,
  });

  return (
    <div className="rounded-md border">
      <CreateUpdateTeamModal />
      <UploadTeamAttachmentModal />
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="h-[50px]">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    className={header.column.columnDef.meta?.headerClassName}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            <>
              {table.getRowModel().rows.map((row) => (
                <TeamTableRow
                  key={row.id}
                  row={row}
                  visibleRowLength={row.getVisibleCells().length}
                  onSelect={(id) => {
                    setSelectedId(id);
                    setShowCreateUpdateTeamModal(true);
                  }}
                />
              ))}
              {[
                ...Array(
                  table.getState().pagination.pageSize -
                    table.getRowModel().rows.length,
                ),
              ].map((_, i) => (
                <tr key={i} className="h-[50px]"></tr>
              ))}
            </>
          ) : (
            <TableRow>
              <TableCell className="h-96 text-center text-lg" colSpan={6}>
                No data found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="sticky -bottom-4 z-20 rounded-b-md border-t bg-background p-3">
        <TablePagination table={table} />
      </div>
    </div>
  );
};

export default TeamTableContent;
