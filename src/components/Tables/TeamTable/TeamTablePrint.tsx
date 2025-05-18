import * as React from "react";

import { useReactToPrint } from "react-to-print";
import { PrinterIcon } from "lucide-react";

import { useTeamContext } from "@/components/Providers/TeamProvider";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import DocumentHeader from "@/components/Common/DocumentHeader";

const TeamTablePrint: React.FC = React.memo(() => {
  const { team } = useTeamContext();

  const contentRef = React.useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <>
      <Button onClick={reactToPrintFn} variant="secondary" className="border">
        <PrinterIcon className="mr-2 size-4" />
        Print
      </Button>
      <div ref={contentRef} className="m-10 hidden print:block">
        <DocumentHeader title="TIM PELAKSANA" />
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
            {team.map(({ pekerjaan, spk, pelaksana, status }, index) => (
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
                    data-status={status}
                    className="border-t border-black text-center font-bold text-black data-[status=Finish]:bg-[#FFFF00]"
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
                    data-status={status}
                    className="data-[status=Finish]:bg-[#FFFF00]"
                  ></TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
});
TeamTablePrint.displayName = "TeamTablePrint";

export default TeamTablePrint;
