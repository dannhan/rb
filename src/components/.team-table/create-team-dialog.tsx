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
import { TeamForm } from "./team-form";

type Props = {
  slug: string;
};

export function CreateTeamDialog({ slug }: Props) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className="col-span-2 h-8 w-full">
          <PlusIcon className="mr-2 size-4" aria-hidden="true" />
          Add Data
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Data</DialogTitle>
          <DialogDescription>
            Fill in the details below to add data. Click submit when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <TeamForm setIsDialogOpen={setIsDialogOpen} slug={slug} />
      </DialogContent>
    </Dialog>
  );
}
