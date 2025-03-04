"use client";

import * as React from "react";

import { toast } from "sonner";
import { EditIcon, EllipsisIcon, Trash2 } from "lucide-react";

import type { Team } from "@/types";
import type { Row } from "@tanstack/react-table";
import { teamSchema } from "@/config/dataSchema";

import { deleteTeamAction } from "@/actions/delete";

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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TeamForm } from "./team-form";

// todo:
// 1. might create a confirmation dialog
// 2. why use router.refresh?

type DataTableRowActionsProps = {
  row: Row<Team>;
  slug: string;
};

export function DataTableRowActions({ row, slug }: DataTableRowActionsProps) {
  teamSchema.parse(row.original);

  const [isFormDialogOpen, setIsFormDialogOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

  const handleDelete = () => {
    toast.promise(
      deleteTeamAction({
        slug,
        id: row.original.id,
        fileKey: row.original.file?.key,
      }),
      {
        loading: "Deleting data.",
        success: "Data deleted successfully.",
        error: "Failed to to delete data.",
        duration: 2000,
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
        <DropdownMenuContent
          collisionPadding={{ bottom: 100 }}
          align="end"
          className="w-[160px]"
        >
          <DropdownMenuItem onSelect={() => setIsFormDialogOpen(true)}>
            <EditIcon className="mr-2.5 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
            <Trash2 className="mr-2.5 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Data</DialogTitle>
            <DialogDescription>
              Fill in the details below to update data.
            </DialogDescription>
          </DialogHeader>
          <TeamForm
            setIsDialogOpen={setIsFormDialogOpen}
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
