"use client";

import * as React from "react";
import Link from "next/link";

import { toast } from "sonner";

import type { File, UploadedFile } from "@/types";
import { useDownload } from "@/hooks/use-download";

import { cn } from "@/lib/utils";
import { ImageCardAction } from "./image-card-action";

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

  const handleDownload = async () => {
    const fileName = image.name;
    const fileUrl = image.url;
    await downloadFile(fileName, fileUrl);

    if (error) {
      toast.error("Error downloading the image.");
      return;
    }
    toast.success("Image downloaded.");
  };

  return (
    <div
      ref={cardRef}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      className={cn(
        "group relative overflow-hidden rounded-lg shadow-lg",
        className,
      )}
    >
      {/* eslint-disable @next/next/no-img-element */}
      <img
        src={image.url}
        alt={image.name}
        className="h-full max-h-[calc(100svh-220px)] min-h-[400px] w-full bg-muted object-contain text-transparent"
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

        <div className="absolute right-2 top-2 z-50">
          <ImageCardAction
            admin={admin}
            handleDownload={handleDownload}
            onCancel={() => setIsHovered(false)}
            onDelete={onDelete}
            open={isDropdownOpen}
            onOpenChange={setIsDropdownOpen}
          />
        </div>
      </div>
      <Link href={image.url} target="_blank" className="absolute inset-0" />
    </div>
  );
}
