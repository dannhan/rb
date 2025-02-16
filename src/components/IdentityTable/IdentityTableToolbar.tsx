"use client";

import * as React from "react";

import { PlusIcon } from "lucide-react";

import type { Table } from "@tanstack/react-table";
import type { WithId, Identity } from "@/types";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DebouncedInput } from "@/components/debounced-input";

import AddIdentityForm from "@/components/Form/AddIdentityForm";
import IdentityTablePrint from "./IdentityTablePrint";

type Props = { table: Table<WithId<Identity>>; admin: boolean };

const IdentityTableToolbar = ({ table, admin }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  return (
    <div className="flex items-center gap-2">
      <DebouncedInput
        debounce={200}
        placeholder="Search"
        value={table.getState().globalFilter}
        onChange={(value) => table.setGlobalFilter(String(value))}
        className="mr-auto h-8 flex-1 sm:max-w-[300px] sm:flex-initial lg:max-w-[450px]"
      />
      {admin && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="default" size="sm" className="h-8">
              <PlusIcon className="mr-2 size-4" aria-hidden="true" />
              Add Data
            </Button>
          </DialogTrigger>
          <DialogContent className="w-full max-w-xl">
            <DialogHeader>
              <DialogTitle>Add Data</DialogTitle>
              <DialogDescription>
                Fill in the details below to add data. Click submit when
                you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <AddIdentityForm setIsDialogOpen={setIsDialogOpen} />
          </DialogContent>
        </Dialog>
      )}
      <IdentityTablePrint table={table} />
    </div>
  );
};

export default IdentityTableToolbar;
