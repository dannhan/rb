"use client";
"use no memo";

import * as React from "react";
import { format } from "date-fns";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { EllipsisIcon, PaperclipIcon } from "lucide-react";

import type { WithId, ProgressItem } from "@/types";

import { cn } from "@/lib/utils";
import { useRoleContext } from "@/components/Providers/UserRoleProvider";
import { useProgressWeeksContext } from "@/components/Providers/ProgressWeeksProvider";
import { useProgressItemsContext } from "@/components/Providers/ProgressItemsProvider";
import { useCreateUpdateProgressWeekModal } from "@/components/Dialogs/CreateUpdateProgressWeek";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import EmptyState from "@/components/Common/EmptyState";
import TablePagination from "@/components/Tables/TablePagination";
import ProgressTablePrint from "./ProgressTablePrint";
import progressTableConfig from "./progressTableConfig";
import { Button } from "@/components/ui/button";

const columnHelper = createColumnHelper<WithId<ProgressItem>>();

// NOTE: might create some placeholder space when the week less than 4
const ProgressTable: React.FC = () => {
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  const { admin } = useRoleContext();
  const { weeks } = useProgressWeeksContext();
  const { items, shouldFocus } = useProgressItemsContext();
  const { CreateUpdateProgressWeekModal, CreateProgressWeekButton } =
    useCreateUpdateProgressWeekModal({ id: selectedId, setSelectedId });

  const table = useReactTable({
    data: items,
    columns: [
      columnHelper.display({
        header: "No.",
        cell: ({ row }) => (
          <span className="text-muted-foreground">{`${row.index + 1}`}</span>
        ),
        size: progressTableConfig.columnWidths.number,
        meta: {
          headerClassName: "sticky z-10 border-r left-0 bg-accent",
          cellClassName: "sticky z-10  border-r left-0 bg-background",
        },
      }),
      columnHelper.accessor("description", {
        header: "Description",
        cell: ({ row }) => <span>{row.getValue("description")}</span>,
        size: progressTableConfig.columnWidths.description,
        meta: {
          headerClassName: "sticky z-10 border-r bg-accent",
          cellClassName: "sticky z-10 border-r px-1 py-1 bg-background",
          style: { left: `${progressTableConfig.leftPositions.description}px` },
        },
      }),
      columnHelper.accessor("attachment", {
        header: "Attachment",
        cell: () => (
          <div className="flex flex-col gap-1">
            <Button
              variant="outline"
              className="mx-2 h-7 bg-transparent text-sm hover:bg-muted"
              size="sm"
            >
              <PaperclipIcon className="mr-2 size-3" />
              Attach file
            </Button>
            <hr className="h-[1px] border-t-0 bg-border" />
            <Button
              variant="outline"
              className="mx-2 h-7 bg-transparent text-sm hover:bg-muted"
              size="sm"
            >
              <PaperclipIcon className="mr-2 size-3" />
              Attach file
            </Button>
          </div>
        ),
        size: progressTableConfig.columnWidths.attachment,
        meta: {
          headerClassName: "sticky border-r z-10 bg-accent",
          cellClassName: "sticky border-r pz-10 px-0 py-1 bg-background",
          style: { left: `${progressTableConfig.leftPositions.attachment}px` },
        },
      }),
      ...weeks.map(({ id, weekCount, date }, index) =>
        columnHelper.accessor((row) => row.progress[id] || 0, {
          id,
          header: () => (
            <div>
              W{weekCount}
              <div className="text-xs font-normal text-gray-500">
                {format(new Date(date), "dd-MM-yy")}
              </div>
            </div>
          ),
          size: progressTableConfig.columnWidths.week,
          meta: {
            headerClassName: cn(
              "whitespace-nowrap p-0 text-center",
              index + 1 !== weeks.length && "border-r",
            ),
            cellClassName: cn(
              "px-1 py-1 text-center",
              index + 1 !== weeks.length && "border-r",
            ),
          },
        }),
      ),
      columnHelper.display({
        id: "actions",
        cell: () => <EllipsisIcon className="mx-auto h-4 w-4" />,
        size: progressTableConfig.columnWidths.actions,
        meta: {
          headerClassName: "sticky right-0 z-10 border-l bg-accent",
          cellClassName: "sticky right-0 z-10 border-l bg-background",
        },
      }),
    ],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex: false,
  });

  React.useEffect(() => {
    // Move to the prev page after delete last data on current page
    if (table.getState().pagination.pageIndex > table.getPageCount() - 1) {
      table.lastPage();
    }

    // After add new data move to the last page if can go to the next page
    if (table.getCanNextPage() && shouldFocus) {
      table.lastPage();
    }
  }, [items.length, shouldFocus, table]);

  return (
    <div className="space-y-4 pb-16">
      <CreateUpdateProgressWeekModal />
      <div className="flex items-center gap-2">
        <h2 className="hidden flex-1 text-xl font-semibold leading-none tracking-tight sm:block">
          Progress Proyek
        </h2>
        <CreateProgressWeekButton />
        <ProgressTablePrint className="ml-auto flex justify-end sm:ml-0" />
      </div>
      <div className="relative overflow-hidden rounded-lg border">
        <Table className="w-full border-separate border-spacing-0">
          <TableHeader className="bg-accent">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  const meta = header.column.columnDef.meta;
                  return (
                    <TableHead
                      key={header.id}
                      style={{
                        minWidth: `${header.getSize()}px`,
                        ...meta?.style,
                      }}
                      className={cn(
                        "relative min-h-[52px] font-normal text-muted-foreground",
                        meta?.headerClassName,
                      )}
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
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.original.id}
                data-state={row.getIsSelected() && "selected"}
                className="group/row"
              >
                {row.getVisibleCells().map(({ id, column, getContext }) => (
                  <TableCell
                    key={id}
                    style={column.columnDef.meta?.style}
                    className={cn(
                      "whitespace-nowrap border-t transition-colors group-hover/row:bg-accent dark:group-hover/row:bg-accent",
                      column.columnDef.meta?.cellClassName,
                    )}
                  >
                    {flexRender(column.columnDef.cell, getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {!table.getRowModel().rows?.length && (
          <div className="hover:bg-transparent">
            <div className="flex h-96 items-center justify-center text-center text-lg">
              <EmptyState
                admin={admin}
                className="w-full border-none bg-transparent shadow-none"
                title="No data found."
              />
            </div>
          </div>
        )}
        <div className="sticky -bottom-4 z-50 border-t bg-background p-3">
          <TablePagination table={table} />
        </div>
      </div>
    </div>
  );
};

export default ProgressTable;
