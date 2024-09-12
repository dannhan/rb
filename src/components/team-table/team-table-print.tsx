"use client";

import React from "react";

import { Team } from "@/types";

import { Table as TanstackTable } from "@tanstack/react-table";
import { useReactToPrint } from "react-to-print";

import { cn } from "@/lib/utils";
import { PrinterIcon } from "lucide-react";
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
  table: TanstackTable<Team>;
};

/* todo: */
export function DataTablePrint({ table }: Props) {
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
        className="flex h-8 items-center border"
      >
        <PrinterIcon className="mr-2 h-4 w-4" />
        Print
      </Button>
      <div ref={componentRef} className="m-10 hidden print:block">
        <Table className="border-collapse border border-black">
          <TableHeader>
            <TableRow className="bg-[#7030A0]">
              <TableHead className="w-[50px] border border-black text-center text-lg font-bold text-white">
                NO.
              </TableHead>
              <TableHead className="text-center text-lg font-bold text-white">
                PEKERJAAN
              </TableHead>
              <TableHead className="text-center text-lg font-bold text-white">
                PELAKSANA
              </TableHead>
              <TableHead className="text-center text-lg font-bold text-white">
                STATUS
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map(({ no, pekerjaan, spk, pelaksana, status }) => (
              <React.Fragment key={no}>
                <TableRow className="border-none">
                  <TableCell className="border-t border-black text-center font-bold">
                    {no}.
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
}
