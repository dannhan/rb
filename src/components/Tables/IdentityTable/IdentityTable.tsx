"use client";
"use no memo";

import * as React from "react";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import type { ColumnDef, Row } from "@tanstack/react-table";
import type { Identity, WithId } from "@/types";
import { isClickOnInteractiveChild } from "@/lib/utils/is-click-on-interactive-child";

import { cn } from "@/lib/utils/cn";
import { useRoleContext } from "@/components/Providers/UserRoleProvider";
import { useIdentitiesContext } from "@/components/Providers/IdentityProvider";
import { useCreateUpdateIdentityModal } from "@/components/Dialogs/CreateUpdateIdentityDialog";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DebouncedInput } from "@/components/debounced-input";
import IdentityTablePrint from "./IdentityTablePrint";
import IdentityTableActionColumn from "./IdentityTableActionColumn";

const IdentityTable: React.FC = () => {
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [globalFilter, setGlobalFilter] = React.useState<string>("");
  const { admin } = useRoleContext();
  const { identities: data } = useIdentitiesContext();
  const {
    setShowCreateUpdateIdentityModal,
    CreateUpdateIdentityModal,
    CreateIdentityButton,
  } = useCreateUpdateIdentityModal({ id: selectedId, setSelectedId });

  const table = useReactTable({
    data,
    columns: [
      {
        accessorKey: "no",
        cell: ({ row }) => (
          <Badge
            variant="outline"
            className="truncate bg-muted/40 text-center font-medium"
          >
            {row.index + 1}
          </Badge>
        ),
      },
      {
        accessorKey: "field",
        cell: ({ row }) => (
          <div className="flex space-x-2">
            <span className="truncate font-medium">
              {row.getValue("field")}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "value",
        cell: ({ row }) => (
          <div className="flex space-x-2">
            <span className="truncate font-normal">
              {row.getValue("value")}
            </span>
          </div>
        ),
      },

      // Menu
      ...(admin
        ? ([
            {
              id: "actions",
              cell: ({ row }) => (
                <IdentityTableActionColumn
                  id={row.original.id}
                  onEdit={() => {
                    setSelectedId(row.original.id);
                    setShowCreateUpdateIdentityModal(true);
                  }}
                />
              ),
            },
          ] as ColumnDef<WithId<Identity>>[])
        : []),
    ],
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "includesString",
  });

  return (
    <div className="space-y-4 pb-16">
      <CreateUpdateIdentityModal />
      <div className="flex items-center gap-2">
        <DebouncedInput
          debounce={200}
          placeholder="Search"
          value={table.getState().globalFilter}
          onChange={(value) => table.setGlobalFilter(String(value))}
          className="mr-auto flex-1 sm:max-w-[250px] sm:flex-initial lg:max-w-[400px]"
        />
        <CreateIdentityButton />
        <IdentityTablePrint />
      </div>
      <div className="rounded-md border shadow-sm">
        <Table>
          <TableHeader className="sr-only">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
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
              table.getRowModel().rows.map((row) => (
                <IdentityTableRow
                  key={row.id}
                  row={row}
                  onSelect={(id) => {
                    setSelectedId(id);
                    setShowCreateUpdateIdentityModal(true);
                  }}
                />
              ))
            ) : (
              <TableRow>
                <TableCell className="h-96 text-center text-lg">
                  No data found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default IdentityTable;

const IdentityTableRow: React.FC<{
  row: Row<WithId<Identity>>;
  onSelect: (id: string) => void;
}> = React.memo(
  ({ row, onSelect }) => {
    return (
      <TableRow
        onClick={(e) => {
          if (isClickOnInteractiveChild(e)) return;
          onSelect(row.original.id);
        }}
        key={row.id}
        className="group/row cursor-pointer select-none"
      >
        {row.getVisibleCells().map((cell) => (
          <TableCell
            key={cell.id}
            className={cn(
              "h-[50px]",
              cell.column.id === "no" && "w-10 p-2.5 text-center",
              cell.column.id === "field" && "w-[45%]",
              cell.column.id === "value" && "w-[45%]",
              cell.column.id === "actions" && "w-10 py-0 text-center",
            )}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    );
  },
  (prevProps, nextProps) => {
    // Only re-render if the row id or data changes
    return prevProps.row.original === nextProps.row.original;
  },
);
IdentityTableRow.displayName = "IdentityTableRow";
