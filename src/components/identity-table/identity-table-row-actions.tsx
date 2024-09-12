"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Identity } from "@/types";
import { identitySchema } from "@/config/schema";
import { Row } from "@tanstack/react-table";

import { deleteIdentityAction } from "@/lib/actions";

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

interface IdentityTableRowActionProps {
  row: Row<Identity>;
  slug: string;
}

export function IdentityTableRowAction({
  row,
  slug,
}: IdentityTableRowActionProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  identitySchema.parse(row.original);

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
          {/* <DropdownMenuItem onSelect={() => setIsDialogOpen(true)}>
            <EditIcon className="mr-2.5 h-4 w-4" />
            Edit
          </DropdownMenuItem> */}
          <DropdownMenuItem
            // todo: might create a confirmation dialog
            onClick={() => {
              const no = row.getValue("no") as number;
              toast.promise(deleteIdentityAction(slug, no), {
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

      {/* <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
      </Dialog> */}
    </>
  );
}
