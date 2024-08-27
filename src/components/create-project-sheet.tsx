"use client";

import { useState } from "react";

import { Plus, X } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type CreateProjectSheetProps = {};

export function CreateProjectSheet({}: CreateProjectSheetProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Sheet open={isModalOpen} onOpenChange={setIsModalOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-full gap-2 rounded-lg bg-background p-4 shadow-[0px_1px_2px_.75px_#00000024] transition-colors hover:bg-accent/75 dark:bg-accent/25 dark:hover:bg-accent/40 lg:flex-col lg:p-8"
        >
          <Plus className="h-5 w-5 lg:h-8 lg:w-8" />
          <span className="text-base lg:text-lg lg:font-semibold">
            Create a project
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent
        hideCloseButton
        className="min-w-full border-none pt-12 data-[state=closed]:duration-200 data-[state=open]:duration-300 md:p-12 lg:p-20 "
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
        <div className="flex max-w-screen-md flex-col gap-8 sm:px-10">
          <Select>
            <SelectTrigger className="rounded-sm border-2 text-lg">
              <SelectValue
                placeholder="Select project type"
                defaultValue="konstruksi"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="konstruksi">Konstruksi</SelectItem>
              <SelectItem value="renovasi">Renovasi</SelectItem>
            </SelectContent>
          </Select>
          <Input
            id="name"
            placeholder="Enter the project name"
            className="col-span-3 rounded-none border-0 border-b-2 text-xl focus-visible:ring-offset-0"
          />
          <SheetClose asChild>
            <Button type="submit" className="sm:ml-auto sm:h-11 sm:px-8" size="sm">
              Continue
            </Button>
          </SheetClose>
        </div>
        {/* <SheetFooter className="pt-4"></SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
}
