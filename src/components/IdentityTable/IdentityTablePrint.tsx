"use client";

import * as React from "react";

import { useReactToPrint } from "react-to-print";
import { PrinterIcon } from "lucide-react";

import type { Table as TTable } from "@tanstack/react-table";
import type { WithId, Identity } from "@/types";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import DocumentHeader from "@/components/Common/DocumentHeader";

type Props = { table: TTable<WithId<Identity>> };

const IdentityTablePrint: React.FC<Props> = ({ table }) => {
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
        <DocumentHeader title="IDENTITAS PROYEK" />
        <Table className="border-collapse border border-black">
          <TableBody>
            {data.map(({ id, no, field, value }) => (
              <React.Fragment key={id}>
                <TableRow className="border-none">
                  <TableCell className="w-10 border-t border-black text-center font-bold">
                    {no}.
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
};

export default IdentityTablePrint;
