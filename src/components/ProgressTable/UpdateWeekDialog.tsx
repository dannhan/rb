"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import UpdateWeekForm from "@/components/Form/UpdateWeekForm";

type Props = React.PropsWithChildren<{ weekId: string }>;
const UpdateWeekDialog: React.FC<Props> = ({ children, weekId }) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425pxw-full max-w-xl]">
        <DialogHeader>
          <DialogTitle>Update Week</DialogTitle>
          <DialogDescription>
            Change the details below to update week. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <UpdateWeekForm weekId={weekId} setIsDialogOpen={setIsDialogOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateWeekDialog;
