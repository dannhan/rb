"use client";

import * as React from "react";

import { PlusCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

interface Props {}

export default function AddProgressForm({}: Props) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const openDialog = () => {
    // const nextWeek = getNextWeekNumber();
    // setNewWeek({ ...newWeek, week: nextWeek });
    setIsDialogOpen(true);
  };
  const handleSubmit = () => {
    // TODO: implement
    console.log("TODO");
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button onClick={openDialog} size="sm">
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          Add New Week
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Week Data</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="rounded-md bg-muted p-4 text-center">
            <p className="text-lg font-semibold">
              Adding data for {/* {newWeek.week} */} TODO
            </p>
            <p className="text-sm text-muted-foreground">
              This will be the next week in the sequence
            </p>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="physical">Physical Progress (%)</Label>
            <Input
              type="number"
              id="physical"
              name="physical"
              placeholder="0"
              min="0"
              max="100"
              step="5"
              required
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="cost">Cost Progress (%)</Label>
            <Input
              type="number"
              id="cost"
              name="cost"
              placeholder="0"
              min="0"
              max="100"
              step="5"
              required
            />
          </div>
          <Button type="submit">Add Week</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
