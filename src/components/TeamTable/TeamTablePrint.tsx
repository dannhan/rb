import * as React from "react";

import { PrinterIcon } from "lucide-react";

import type { Table as TanstackTable } from "@tanstack/react-table";
import type { TeamMember, WithId } from "@/types";

import { useReactToPrint } from "react-to-print";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  table: TanstackTable<WithId<TeamMember>>;
};

const TeamTablePrint: React.FC<Props> = ({ table }) => {
  const componentRef = React.useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const data = table.getRowModel().rows.map((row) => row.original);

  return (
    <>
      <Button
        onClick={handlePrint}
        size="sm"
        variant="secondary"
        className="h-8 border"
      >
        <PrinterIcon className="mr-2 size-4" />
        Print
      </Button>
      <div ref={componentRef} className="m-10 hidden print:block">
        <Table className="border-collapse border border-black">
          <TableHeader>
            <TableRow className="bg-[#7030A0]">
              <TableHead className="w-[50px] border border-black text-center text-lg font-bold text-white">
                NO.
              </TableHead>
              <TableHead className="border border-black text-center text-lg font-bold text-white">
                PEKERJAAN
              </TableHead>
              <TableHead className="border-black text-center text-lg font-bold text-white">
                PELAKSANA
              </TableHead>
              <TableHead className="border border-black text-center text-lg font-bold text-white">
                STATUS
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map(({ pekerjaan, spk, pelaksana, status }, index) => (
              <React.Fragment key={index}>
                <TableRow className="border-none">
                  <TableCell className="border-t border-black text-center font-bold">
                    {index + 1}.
                  </TableCell>
                  <TableCell className="border border-black font-bold">
                    {pekerjaan}
                  </TableCell>
                  <TableCell className="border border-black font-bold">
                    {pelaksana}
                  </TableCell>
                  <TableCell
                    className={cn(
                      "border-t border-black text-center font-bold text-black",
                      status === "Finish" && "bg-[#FFFF00]",
                    )}
                  >
                    {status}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell className="border border-black font-bold">
                    SPK
                  </TableCell>
                  <TableCell className="border border-black font-bold">
                    {spk}
                  </TableCell>
                  <TableCell
                    className={cn(status === "Finish" && "bg-[#FFFF00]")}
                  ></TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default TeamTablePrint;
