"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Plus, X } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import CreateProjectForm from "@/components/Form/CreateProjectForm";

type Props = {
  defaultType?: string;
};

const CreateProjectSheet: React.FC<Props> = ({ defaultType }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <Sheet open={isModalOpen} onOpenChange={setIsModalOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "flex flex-row gap-2 rounded-lg border-none p-6 md:h-full lg:flex-col lg:gap-0",
            "bg-card text-primary shadow-[0px_1px_2px_.75px_#00000024] transition-colors",
            "hover:bg-accent hover:text-primary",
          )}
        >
          <Plus className="h-5 w-5 lg:h-8 lg:w-8" />
          <span className="text-base lg:text-lg lg:font-semibold">
            Create a project
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent
        hideCloseButton
        className="min-w-full border-none pt-12 focus-visible:outline-none focus-visible:ring-0 md:p-12 lg:p-20"
      >
        <SheetHeader className="pb-16">
          <SheetTitle className="flex flex-row-reverse items-center gap-4 text-2xl font-normal sm:flex-row">
            <SheetClose>
              <X className="h-6 w-6 text-muted-foreground" />
              <span className="sr-only">Close</span>
            </SheetClose>
            <span className="mr-auto">Create a project</span>
          </SheetTitle>
        </SheetHeader>
        <CreateProjectForm defaultType={defaultType} />
      </SheetContent>
    </Sheet>
  );
};

export default CreateProjectSheet;
