import * as React from "react";

import { type Row, flexRender } from "@tanstack/react-table";
import type { WithId, TeamMember } from "@/types";

import { isClickOnInteractiveChild } from "@/lib/utils/is-click-on-interactive-child";
import { cn } from "@/lib/utils/cn";
import { TableRow, TableCell } from "@/components/ui/table";

const TeamTableRow: React.FC<{
  row: Row<WithId<TeamMember>>;
  visibleRowLength?: number;
  onSelect: (id: string) => void;
}> = React.memo(
  ({ row, onSelect }) => {
    return (
      <TableRow
        onClick={(e) => {
          if (isClickOnInteractiveChild(e)) return;
          onSelect(row.original.id);
        }}
        className="group/row cursor-pointer select-none"
      >
        {row.getVisibleCells().map((cell) => (
          <TableCell
            key={cell.id}
            className={cn(
              "group h-[50px] py-0",
              cell.column.columnDef.meta?.cellClassName,
            )}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    );
  },
  (prevProps, nextProps) => {
    // Only re-render if the row id or data changes
    // return prevProps.row.original === nextProps.row.original;
    return (
      prevProps.row.original === nextProps.row.original &&
      prevProps.visibleRowLength === nextProps.visibleRowLength
    );
  },
);
TeamTableRow.displayName = "TeamTableRow";

export default TeamTableRow;
