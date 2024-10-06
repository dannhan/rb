import {
  CirclePlusIcon,
  PlusIcon,
  PrinterIcon,
  SlidersHorizontalIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Loading() {
  return (
    <div className="flex flex-1 flex-col space-y-4">
      <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
        <div className="flex w-full flex-1 items-center space-x-2 sm:max-w-[500px]">
          <Input
            className="h-8 flex-1 sm:max-w-[150px] sm:flex-initial lg:max-w-[225px]"
            placeholder="Search"
          />
          <Button variant="outline" size="sm" className="h-8 border-dashed">
            <CirclePlusIcon className="mr-2 h-4 w-4" /> Status
          </Button>
        </div>
        <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-fit">
          <Button variant="default" size="sm" className="col-span-2 h-8 w-full">
            <PlusIcon className="mr-2 size-4" aria-hidden="true" />
            Add Data
          </Button>
          <Button size="sm" variant="secondary" className="h-8 border">
            <PrinterIcon className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" size="sm" className="h-8">
            <SlidersHorizontalIcon className="mr-2 h-4 w-4 sm:mr-0" />
            <span className="sm:hidden">Toggle</span>
          </Button>
        </div>
      </div>
      <div className="h-full rounded-md border">
        <Table>
          <TableHeader className="h-12">
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Pekerjaan</TableHead>
              <TableHead>SPK</TableHead>
              <TableHead>Pelaksana</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>File</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
        <Skeleton className="h-[530px] w-full rounded-t-none" />
      </div>
    </div>
  );
}
