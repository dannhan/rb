"use client";

import * as React from "react";
import { useParams } from "next/navigation";

import { toast } from "sonner";
import { EditIcon, EllipsisIcon, Trash2Icon } from "lucide-react";

import type { ColumnDef } from "@tanstack/react-table";
import type { Identity, WithId } from "@/types";

import { deleteIdentityAction } from "@/actions/action-delete";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import UpdateIdentityForm from "@/components/Form/UpdateIdentityForm";

export function getColumns(admin: boolean): ColumnDef<WithId<Identity>>[] {
  const column: ColumnDef<WithId<Identity>>[] = [
    {
      accessorKey: "no",
      cell: ({ row }) => {
        return (
          <span className="w-full truncate text-center">
            {row.getValue("no")}.
          </span>
        );
      },
    },
    {
      accessorKey: "field",
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="truncate font-bold">{row.getValue("field")}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "value",
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="truncate font-normal">
              {row.getValue("value")}
            </span>
          </div>
        );
      },
    },
  ];

  admin &&
    column.push({
      id: "actions",
      cell: ({ row }) => {
        const params = useParams();
        const [dropdownOpen, setDropdownOpen] = React.useState(false);
        const [editDialogOpen, setEditDialogOpen] = React.useState(false);
        const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

        const { id: identityId, field, value } = row.original;
        const handleDelete = async () => {
          const toastId = toast.loading("Deleting data.");
          try {
            const result = await deleteIdentityAction(
              row.original.id,
              params.project as string,
            );

            if (result?.error) {
              toast.error("Failed to delete data.", { id: toastId });
            } else {
              toast.success("Data deleted successfully", { id: toastId });
            }
          } catch (error) {
            // NOTE: track error
            toast.error("Failed to delete data.", { id: toastId });
          }
        };

        return (
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
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
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogTrigger asChild>
                  <DropdownMenuItem
                    onSelect={(event) => {
                      event.preventDefault();
                      setEditDialogOpen(true);
                    }}
                  >
                    <EditIcon className="mr-2.5 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent className="w-full max-w-xl">
                  <DialogHeader>
                    <DialogTitle>Edit Data</DialogTitle>
                    <DialogDescription>
                      Fill in the details below to edit data. Click submit when
                      you&apos;re done.
                    </DialogDescription>
                  </DialogHeader>
                  <UpdateIdentityForm
                    identityId={identityId}
                    defaultValues={{
                      field: field,
                      value: value,
                    }}
                    onSuccess={() => {
                      setEditDialogOpen(false);
                      setDropdownOpen(false);
                    }}
                    onCancel={() => setEditDialogOpen(false)}
                  />
                </DialogContent>
              </Dialog>
              <AlertDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
              >
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    onSelect={(event) => {
                      event.preventDefault();
                      setDeleteDialogOpen(true);
                    }}
                  >
                    <Trash2Icon className="mr-2.5 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        handleDelete();
                        setDeleteDialogOpen(false);
                        setDropdownOpen(false);
                      }}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    });

  return column;
}
