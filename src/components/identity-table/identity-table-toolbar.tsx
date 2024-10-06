"use client";

import { Table } from "@tanstack/react-table";

import { Identity } from "@/types";
import { DebouncedInput } from "@/components/debounced-input";
import { CreateIdentityDialog } from "./create-identity-dialog";
import { IdentityTablePrint } from "./identity-table-print";

interface DataTableToolbarProps {
  table: Table<Identity>;
  slug: string;
  admin?: boolean;
}

export function IdentityTableToolbar({
  table,
  slug,
  admin,
}: DataTableToolbarProps) {
  return (
    <div className="flex items-center gap-2">
      <DebouncedInput
        debounce={200}
        placeholder="Search"
        value={table.getState().globalFilter}
        onChange={(value) => table.setGlobalFilter(String(value))}
        className="mr-auto h-8 flex-1 sm:max-w-[300px] sm:flex-initial lg:max-w-[450px]"
      />

      {admin && <CreateIdentityDialog slug={slug} />}
      <IdentityTablePrint table={table} />
    </div>
  );
}
