import * as React from "react";

import type { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import { MoreHorizontalIcon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ImageCardAction({
  admin,
  handleDownload,
  onCancel,
  onDelete,
  ...props
}: DropdownMenuProps & {
  admin?: boolean;
  handleDownload: () => Promise<void>;
  onCancel: () => void;
  onDelete: (() => Promise<void>) | (() => void);
}) {
  const [isConfirmationDialogOption, setIsConfirmationDialogOpen] =
    React.useState<boolean>(false);

  return (
    <>
      <DropdownMenu {...props}>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className="rounded-full" size="icon">
            <MoreHorizontalIcon className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="z-50 w-40 rounded-xl border-none px-1.5 py-1 shadow-xl">
          <DropdownMenuItem
            className="rounded-md font-medium"
            onClick={handleDownload}
          >
            Download Image
          </DropdownMenuItem>
          {admin && (
            <DropdownMenuItem
              className="rounded-md font-medium"
              onClick={() => setIsConfirmationDialogOpen(true)}
            >
              Delete Image
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog
        open={isConfirmationDialogOption}
        onOpenChange={setIsConfirmationDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
