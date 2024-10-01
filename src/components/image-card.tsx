"use client";

import * as React from "react";
import Link from "next/link";

import { MoreHorizontalIcon } from "lucide-react";
import { toast } from "sonner";

import type { File, UploadedFile } from "@/types";
import { useDownload } from "@/hooks/use-download";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  image: UploadedFile | File;
  className?: string;
  admin?: boolean;
  onDelete: (() => Promise<void>) | (() => void);
};
export function ImageCard({ image, className, admin, onDelete }: Props) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  const { error, downloadFile } = useDownload();

  const handleDownload = () => {
    const fileName = image.name;
    const fileUrl = image.url;
    downloadFile(fileName, fileUrl);

    if (error) {
      toast.error("Error downloading the image.");
      return;
    }
    toast.success("Image downloaded.");
  };

  const handleDelete = async () => await onDelete();

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative overflow-hidden rounded-lg shadow-lg",
        className,
      )}
    >
      {/* eslint-disable @next/next/no-img-element */}
      <img
        src={image.url}
        alt={image.name}
        className="h-full max-h-[calc(100svh-220px)] min-h-[400px] w-full bg-muted object-cover text-transparent"
      />
      <div
        className={cn(
          "absolute inset-0 flex flex-col justify-between bg-black p-4 transition-all duration-300 ease-in-out",
          isHovered || isDropdownOpen
            ? "bg-opacity-25 opacity-100"
            : "pointer-events-none bg-opacity-0 opacity-0",
        )}
      >
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-white">Open</span>
        </div>
        <div className="absolute right-4 top-4 z-50">
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="rounded-full" size="icon">
                <MoreHorizontalIcon className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="z-50 w-40 rounded-xl border-none px-1.5 py-1 shadow-xl">
              <DropdownMenuItem
                className="rounded-md font-medium"
                onClick={() => handleDownload()}
              >
                Download Image
              </DropdownMenuItem>
              {admin && (
                <DropdownMenuItem
                  className="rounded-md font-medium"
                  onClick={() => handleDelete()}
                >
                  Delete Image
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Link href={image.url} target="_blank" className="absolute inset-0" />
    </div>
  );
}
