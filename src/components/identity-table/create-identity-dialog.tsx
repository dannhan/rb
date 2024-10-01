"use client";

import * as React from "react";

import { PlusIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IdentityForm } from "./identity-form";

type Props = {
  slug: string;
  className?: string;
};

export function CreateIdentityDialog({ slug, className }: Props) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className="h-8">
          <PlusIcon className="mr-2 size-4" aria-hidden="true" />
          Add Data
        </Button>
      </DialogTrigger>
      <DialogContent className={className}>
        <DialogHeader>
          <DialogTitle>Add Data</DialogTitle>
          <DialogDescription>
            Fill in the details below to add data. Click submit when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <IdentityForm setIsDialogOpen={setIsDialogOpen} slug={slug} />
      </DialogContent>
    </Dialog>
  );
}
