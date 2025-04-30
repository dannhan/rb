import * as React from "react";

import { PlusIcon, XIcon } from "lucide-react";

import type { Table } from "@tanstack/react-table";
import type { TeamMember, WithId } from "@/types";

import { teamTableConfig } from "@/config/table";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { DebouncedInput } from "@/components/debounced-input";
import AddTeamMemberForm from "@/components/Form/AddTeamMemberForm";

import TableFacetedFilter from "@/components/TableFeatures/TableFacetedFilter";
import TableViewOptions from "@/components/TableFeatures/TableViewOptions";
import TeamTablePrint from "./TeamTablePrint";

type Props = {
  table: Table<WithId<TeamMember>>;
  admin: boolean;
};

const TeamTableToolbar: React.FC<Props> = ({ table, admin }) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
      <div className="flex w-full flex-1 items-center space-x-2 sm:max-w-[500px]">
        <DebouncedInput
          debounce={200}
          placeholder="Search"
          value={table.getState().globalFilter}
          onChange={(value) => table.setGlobalFilter(String(value))}
          className="flex-1 sm:max-w-[150px] sm:flex-initial lg:max-w-[225px]"
        />
        <TableFacetedFilter
          column={table.getColumn("status")}
          title="Status"
          options={teamTableConfig.statuses}
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="hidden h-8 px-2 lg:flex lg:px-3"
          >
            Reset
            <XIcon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-fit">
        {admin &&
          (isDesktop ? (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="default" className="col-span-2 w-full">
                  <PlusIcon className="mr-2 size-4" aria-hidden="true" />
                  Add Data
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Data</DialogTitle>
                  <DialogDescription>
                    Fill in the details below to add data. Click submit when
                    you&apos;re done.
                  </DialogDescription>
                </DialogHeader>
                <AddTeamMemberForm setDialogOpen={setDialogOpen} />
              </DialogContent>
            </Dialog>
          ) : (
            <Drawer open={dialogOpen} onOpenChange={setDialogOpen}>
              <DrawerTrigger asChild>
                <Button variant="default" className="col-span-2 w-full">
                  <PlusIcon className="mr-2 size-4" aria-hidden="true" />
                  Add Data
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Add Data</DrawerTitle>
                  <DrawerDescription>
                    Fill in the details below to add data. Click submit when
                    you&apos;re done.
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerBody>
                  <AddTeamMemberForm setDialogOpen={setDialogOpen} />
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          ))}
        <TeamTablePrint table={table} />
        <TableViewOptions table={table} />
      </div>
    </div>
  );
};

export default TeamTableToolbar;
