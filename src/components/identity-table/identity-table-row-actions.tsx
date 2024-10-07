"use client";

import * as React from "react";

import type { Row } from "@tanstack/react-table";
import { toast } from "sonner";
import { EditIcon, EllipsisIcon, Trash2 } from "lucide-react";

import { Identity } from "@/types";
import { identitySchema } from "@/config/schema";
import { deleteIdentityAction } from "@/actions/delete";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IdentityForm } from "./identity-form";

interface IdentityTableRowActionProps {
  row: Row<Identity>;
  slug: string;
}

export function IdentityTableRowAction({
  row,
  slug,
}: IdentityTableRowActionProps) {
  identitySchema.parse(row.original);

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

  const handleDelete = () => {
    toast.promise(
      deleteIdentityAction({
        slug,
        id: row.original.id,
      }),
      {
        loading: "Deleting data.",
        success: "Data deleted successfully.",
        error: "Failed to to delete data.",
        duration: 1000,
      },
    );
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <EllipsisIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          {/* todo:  */}
          <DropdownMenuItem onSelect={() => setIsDialogOpen(true)}>
            <EditIcon className="mr-2.5 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
            <Trash2 className="mr-2.5 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Data</DialogTitle>
            <DialogDescription>
              Fill in the details below to update data.
            </DialogDescription>
          </DialogHeader>
          <IdentityForm
            setIsDialogOpen={setIsDialogOpen}
            slug={slug}
            isUpdate
            data={row.original}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
