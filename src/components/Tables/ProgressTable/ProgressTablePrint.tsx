"use client";

import * as React from "react";

import { useReactToPrint } from "react-to-print";
import { format } from "date-fns";
import { PrinterIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useProgressWeeksContext } from "@/components/Providers/ProgressWeeksProvider";
import { useProgressItemsContext } from "@/components/Providers/ProgressItemsProvider";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import DocumentHeader from "@/components/Common/DocumentHeader";

type Props = { className?: string };
const ProgressTablePrint: React.FC<Props> = ({ className }) => {
  const { weeks } = useProgressWeeksContext();
  const { items } = useProgressItemsContext();

  const contentRef = React.useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const displayedWeeks = weeks.slice(-4);

  return (
    <>
      <Button
        onClick={reactToPrintFn}
        variant="secondary"
        className={cn("flex items-center border", className)}
      >
        <PrinterIcon className="mr-2 h-4 w-4" />
        Print
      </Button>
      <div ref={contentRef} className="m-10 hidden print:block">
        <DocumentHeader title="PROGRESS REPORT" />
        <Table className="border-collapse border border-black">
          <thead>
            <tr className="border border-black bg-yellow-300 text-black">
              <th className="border border-black px-2 py-1">NO.</th>
              <th className="border border-black px-2 py-1">DESKRIPSI</th>
              {displayedWeeks.map(({ id, weekCount, date }) => {
                return (
                  <th key={id} className="border border-black px-2 py-1">
                    W{weekCount}
                    {/* TWO "&nbsp" is used to consistently render blank space without affacting layout */}
                    <div>&nbsp;{format(new Date(date), "dd-MM-yy")}&nbsp;</div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <TableBody>
            {items.map(({ id, description, progress }, index) => (
              <TableRow className="border border-black" key={id}>
                <TableCell className="border border-black text-center font-bold">
                  {index + 1}.
                </TableCell>
                <TableCell className="border border-black font-bold">
                  {description}
                </TableCell>
                {displayedWeeks.map(({ id }) => (
                  <TableCell
                    key={id}
                    className="border border-black text-center"
                  >
                    {progress[id] ? `${progress[id]}%` : "0%"}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ProgressTablePrint;
