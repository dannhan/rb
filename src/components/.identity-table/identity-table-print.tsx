"use client";

import React from "react";

import { Identity } from "@/types";

import { Table as TanstackTable } from "@tanstack/react-table";
import { useReactToPrint } from "react-to-print";

import { PrinterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

type Props = {
  table: TanstackTable<Identity>;
};

export function IdentityTablePrint({ table }: Props) {
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
          <TableBody>
            {data.map(({ field, value }, index) => (
              <React.Fragment key={index + 1}>
                <TableRow className="border-none">
                  <TableCell className="w-10 border-t border-black text-center font-bold">
                    {index + 1}.
                  </TableCell>
                  <TableCell className="border border-black font-bold">
                    {field}
                  </TableCell>
                  <TableCell className="border border-black">{value}</TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
