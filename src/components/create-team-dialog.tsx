"use client";

import { useState } from "react";

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
import { CreateTeamForm } from "@/components/create-team-form";

export function CreateTeamDialog({ slug }: { slug: string }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="sm"
          className="ml-2 h-8 sm:ml-0 lg:mr-2"
        >
          <PlusIcon
            className="mr-2 hidden size-4 md:block"
            aria-hidden="true"
          />
          Add Data
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Data</DialogTitle>
          <DialogDescription>
            Fill in the details below to add data.
          </DialogDescription>
        </DialogHeader>
        <CreateTeamForm setIsDialogOpen={setIsDialogOpen} slug={slug} />
      </DialogContent>
    </Dialog>
  );
}
