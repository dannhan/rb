"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Team } from "@/types";
import { Row } from "@tanstack/react-table";
import { teamSchema } from "@/config/schema";

import { deleteTeamAction } from "@/lib/actions";

import { toast } from "sonner";
import { EditIcon, EllipsisIcon, Trash2 } from "lucide-react";
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
import { UpdateTeamForm } from "@/components/update-team-form";

interface DataTableRowActionsProps {
  row: Row<Team>;
  slug: string;
}

export function DataTableRowActions({ row, slug }: DataTableRowActionsProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  teamSchema.parse(row.original);

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
          <DropdownMenuItem onSelect={() => setIsDialogOpen(true)}>
            <EditIcon className="mr-2.5 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            // todo: might create a confirmation dialog
            onClick={() => {
              const no = row.getValue("no") as number;
              toast.promise(deleteTeamAction(slug, no), {
                loading: "Deleting data.",
                success: "Data deleted successfully.",
                error: "Failed to to delete data.",
                duration: 1000,
              });

              router.refresh();
            }}
          >
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
          <UpdateTeamForm
            setIsDialogOpen={setIsDialogOpen}
            slug={slug}
            data={row.original}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
