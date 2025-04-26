"use client";

import * as React from "react";
import { useReactToPrint } from "react-to-print";
import { PrinterIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import DocumentHeader from "@/components/Common/DocumentHeader";

type ProgressData = {
  id: string;
  position: number;
  description: string;
  progress: Record<string, number>;
};

type Props = { data: ProgressData[]; weekKeys: string[] };

const ProgressTablePrint: React.FC<Props> = ({ data, weekKeys }) => {
  const componentRef = React.useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <Button
        onClick={handlePrint}
        variant="secondary"
        className="flex items-center border"
      >
        <PrinterIcon className="mr-2 h-4 w-4" />
        Print
      </Button>
      <div ref={componentRef} className="m-10 hidden print:block">
        <DocumentHeader title="PROGRESS REPORT" />
        <Table className="border-collapse border border-black">
          <thead>
            <tr className="border border-black bg-yellow-300 text-black">
              <th className="border border-black px-2 py-1">NO.</th>
              <th className="border border-black px-2 py-1">DESKRIPSI</th>
              {weekKeys.map((header) => {
                const [weekNumber, date] = header.split("_");
                return (
                  <th key={header} className="border border-black px-2 py-1">
                    W{weekNumber}
                    {/* TWO "&nbsp" is used to consistently render blank space without affacting layout */}
                    <div>&nbsp;{date}&nbsp;</div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <TableBody>
            {data.map(({ id, description, progress }, index) => (
              <TableRow className="border border-black" key={id}>
                <TableCell className="border border-black text-center font-bold">
                  {index + 1}.
                </TableCell>
                <TableCell className="border border-black font-bold">
                  {description}
                </TableCell>
                {weekKeys.map((header) => (
                  <TableCell
                    key={header}
                    className="border border-black text-center"
                  >
                    {progress[header] ? `${progress[header]}%` : "0%"}
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
