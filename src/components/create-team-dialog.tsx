"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

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
import TeamForm from "@/components/team-form";

type Props = {
  slug: string;
  className?: string;
};

export function CreateTeamDialog({ slug, className }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className={cn("h-8", className)}>
          <PlusIcon className="mr-2 size-4" aria-hidden="true" />
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
        <TeamForm setIsDialogOpen={setIsDialogOpen} slug={slug} />
      </DialogContent>
    </Dialog>
  );
}
