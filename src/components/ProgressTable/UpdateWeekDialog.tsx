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
  DialogDescription,
} from "@/components/ui/dialog";
import UpdateWeekForm from "@/components/Form/UpdateWeekForm";

type Props = React.PropsWithChildren<{ weekId: string }>;
const UpdateWeekDialog: React.FC<Props> = ({ children, weekId }) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        {/* <Button> */}
        {/*   <PlusCircleIcon className="mr-2 h-3.5 w-3.5" /> */}
        {/*   New week */}
        {/* </Button> */}
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425pxw-full max-w-xl]">
        <DialogHeader>
          <DialogTitle>New Week</DialogTitle>
          <DialogDescription>
            Fill in the details below to add new week. Click submit when
            you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <UpdateWeekForm weekId={weekId} setIsDialogOpen={setIsDialogOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateWeekDialog;
