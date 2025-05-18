import * as React from "react";

import { Edit3Icon, EllipsisIcon, Trash2Icon } from "lucide-react";

import { useDeleteDesignDrawingCategoryModal } from "@/components/Dialogs/DeleteDesignDrawingCategoryDialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

type Props = { id: string; onEdit: () => void };
const DesignDrawingCategoryAction: React.FC<Props> = ({ id, onEdit }) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const {
    setShowDeleteDesignDrawingCategoryModal,
    DeleteDesignDrawingCategoryModal,
  } = useDeleteDesignDrawingCategoryModal({ id });

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DeleteDesignDrawingCategoryModal />
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="rounded-full p-0 data-[state=open]:bg-muted"
          size="icon"
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
        <DropdownMenuItem onSelect={onEdit} className="cursor-pointer">
          <Edit3Icon className="mr-2.5 size-3.5" />
          Edit Kategori
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => setShowDeleteDesignDrawingCategoryModal(true)}
          className="cursor-pointer"
        >
          <Trash2Icon className="mr-2.5 size-3.5" />
          Hapus Kategori
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DesignDrawingCategoryAction;
