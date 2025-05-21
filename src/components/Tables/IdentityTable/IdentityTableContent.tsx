"use client";
"use no memo";

import * as React from "react";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useQueryState } from "nuqs";
import { InfoIcon } from "lucide-react";

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
import AnimatedEmptyState from "@/components/Common/AnimatedEmptyState";
import IdentityTableActionColumn from "./IdentityTableActionColumn";

const IdentityTableContent: React.FC = () => {
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const isFiltered = React.useMemo(() => !!search.length, [search]);

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
    state: { globalFilter: search },
    onGlobalFilterChange: setSearch,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "includesString",
  });

  return (
    <div className="rounded-md border shadow-sm">
      <CreateUpdateIdentityModal />
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
              <TableCell className="h-96 p-0 text-center text-lg">
                <AnimatedEmptyState
                  className="border-none"
                  title={`No ${isFiltered ? "matching data" : "data found"}`}
                  description={`No data ${isFiltered ? `match “${search}”.` : "have been created for this project yet."}`}
                  icon={<InfoIcon className="size-4 text-muted-foreground" />}
                  {...(!isFiltered && {
                    addButton: <CreateIdentityButton />,
                  })}
                />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default IdentityTableContent;

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
