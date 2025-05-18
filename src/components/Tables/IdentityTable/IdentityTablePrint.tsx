"use client";

import * as React from "react";

import { useReactToPrint } from "react-to-print";
import { PrinterIcon } from "lucide-react";

import { useIdentitiesContext } from "@/components/Providers/IdentityProvider";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import DocumentHeader from "@/components/Common/DocumentHeader";

const IdentityTablePrint: React.FC = () => {
  const { identities } = useIdentitiesContext();

  const contentRef = React.useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <>
      <Button onClick={reactToPrintFn} variant="secondary" className="border">
        <PrinterIcon className="mr-2 h-4 w-4" />
        Print
      </Button>
      <div ref={contentRef} className="m-10 hidden print:block">
        <DocumentHeader title="IDENTITAS PROYEK" />
        <Table className="border-collapse border border-black">
          <TableBody>
            {identities.map(({ id, field, value }, index) => (
              <TableRow className="border-none" key={id}>
                <TableCell className="w-10 border-t border-black text-center font-bold">
                  {index + 1}.
                </TableCell>
                <TableCell className="border border-black font-bold">
                  {field}
                </TableCell>
                <TableCell className="border border-black">{value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default IdentityTablePrint;
