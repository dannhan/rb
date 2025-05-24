import * as React from "react";

import { EllipsisIcon, type LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

type Props = {
  items: {
    title: string;
    Icon: LucideIcon;
    onSelect: () => void;
  }[];
};
const TableActionColumn: React.FC<Props> = ({ items }) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-10 w-14 p-0 hover:bg-muted data-[state=open]:bg-muted"
        >
          <EllipsisIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[160px]"
        collisionPadding={{ bottom: 80 }}
      >
        {items.map(({ title, Icon, onSelect }, index) => (
          <DropdownMenuItem key={index} onSelect={onSelect}>
            <Icon className="mr-2.5 size-4" />
            {title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableActionColumn;
