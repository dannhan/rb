"use client";

import * as React from "react";
import Link from "next/link";

import { toast } from "sonner";
import { MoreHorizontalIcon, DownloadIcon, Trash2Icon } from "lucide-react";

import type { Attachment } from "@/types";

import { cn } from "@/lib/utils";
import { useDownload } from "@/hooks/use-download";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { deleteAttachmentAction } from "@/actions/action-delete";
import { useParams } from "next/navigation";

type Props = { admin: boolean; attachment: Attachment };

// TODO: if possible store the width and height of the image, find any method
// to remove the gray area around image
const ImageCard: React.FC<Props> = ({ admin, attachment }) => {
  const params = useParams();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const { error, downloadFile } = useDownload();

  const { key, url, name } = attachment;

  const handleDownload = async () => {
    await downloadFile(name, url);
    if (error) toast.error("Error downloading the image.");
  };

  const handleDelete = async () => {
    const toastId = toast.loading("Deleting data.");
    try {
      if (typeof params?.project !== "string")
        throw new Error("Invalid form data. Please check your inputs.");

      const result = await deleteAttachmentAction(key, params.project);

      if (result?.error) {
        toast.error("Failed to delete data.", { id: toastId });
      } else {
        toast.success("Data deleted successfully", { id: toastId });
      }
    } catch (error) {
      // NOTE: track error
      toast.error("Failed to delete data.", { id: toastId });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-lg shadow-lg"
    >
      <img
        src={url}
        alt={name}
        className="h-full max-h-[calc(100svh-220px)] min-h-[400px] w-full bg-muted object-contain text-transparent"
      />
      {/* Overlay Begin */}
      <div
        className={cn(
          "absolute inset-0 flex flex-col justify-between bg-black p-4 transition-all duration-300 ease-in-out",
          isHovered || dropdownOpen
            ? "bg-opacity-25 opacity-100"
            : "pointer-events-none bg-opacity-0 opacity-0",
        )}
      >
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-white">Open</span>
        </div>
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute right-3 top-5 z-10 h-fit w-fit rounded-full p-2 text-muted-foreground opacity-0 transition-all duration-200 focus-visible:border-none focus-visible:ring-0 group-hover:bg-muted group-hover:opacity-100",
                dropdownOpen && "bg-muted opacity-100",
              )}
            >
              <MoreHorizontalIcon className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="z-50 rounded-xl px-1.5 py-1 shadow-xl">
            <DropdownMenuItem
              className="rounded-md font-medium"
              onClick={handleDownload}
            >
              <DownloadIcon className="mr-2 h-4 w-4" />
              Download
            </DropdownMenuItem>
            <AlertDialog
              open={deleteDialogOpen}
              onOpenChange={setDeleteDialogOpen}
            >
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  className={cn("rounded-md font-medium", !admin && "hidden")}
                  onSelect={(event) => {
                    event.preventDefault();
                    setDeleteDialogOpen(true);
                  }}
                >
                  <Trash2Icon className="mr-2 h-4 w-4" />
                  Hapus
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      handleDelete();
                      setDeleteDialogOpen(false);
                      setDropdownOpen(false);
                    }}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
        <Link href={url} target="_blank" className="absolute inset-0" />
      </div>
      {/* Overlay End */}
    </div>
  );
};

export default ImageCard;
