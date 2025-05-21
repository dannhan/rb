"use client";

import { useQueryState, parseAsArrayOf, parseAsString } from "nuqs";

import { SlidersHorizontalIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  columnNames: string[];
}

const TableViewOptions: React.FC<Props> = ({ columnNames }) => {
  const [hiddenColumns, setHiddenColumns] = useQueryState("hide", {
    ...parseAsArrayOf(parseAsString),
    defaultValue: [],
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <SlidersHorizontalIcon className="mr-2 size-4 sm:mr-0" />
          <span className="sm:hidden">Toggle</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel className="hidden sm:block">
          Toggle columns
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="hidden sm:block" />
        {columnNames.map((columnName) => {
          const lowerCasedColumnName = columnName.toLowerCase();
          return (
            <DropdownMenuCheckboxItem
              key={lowerCasedColumnName}
              checked={!hiddenColumns.includes(lowerCasedColumnName)}
              onCheckedChange={(checked) =>
                setHiddenColumns((prev) =>
                  checked
                    ? prev.filter((col) => col !== lowerCasedColumnName)
                    : [...prev, lowerCasedColumnName],
                )
              }
            >
              {columnName}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableViewOptions;
