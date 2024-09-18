"use client";

import * as React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

import { toast } from "sonner";

import { StoredImage, UploadedFile } from "@/types";
import { cn } from "@/lib/utils";

const ConfirmationDialog = dynamic(() => import("@/components/confirmation-dialog").then(mod => mod.ConfirmationDialog))
const XIcon = dynamic(() => import("lucide-react").then(mod => mod.XIcon));

type Props = {
  action?: () => Promise<void>;
  image: UploadedFile | StoredImage;
  isAdmin?: boolean;
  className?: string;
};

export function ImageCard({ action, image, isAdmin, className }: Props) {
  const [isPending, startTransition] = React.useTransition();

  return (
    <div className={cn("group relative transition-transform", className)}>
      {isAdmin && (
        <ConfirmationDialog
          title="Delete Image"
          description="Are you sure you want to delete this image?"
          confirmText="Delete"
          cancelText="Cancel"
          size="icon"
          variant="outline"
          className={cn(
            "absolute -right-0.5 -top-2.5 z-10 h-fit w-fit translate-x-1/2 rounded-full p-1.5",
            "bg-gray-900/50 text-white hover:bg-gray-900/60 hover:text-white dark:bg-gray-900/80  dark:hover:bg-gray-900/95",
            "transition-all group-hover:opacity-100 md:opacity-0",
          )}
          onConfirm={() => {
            if (action === undefined) {
              toast.error("Function not implemented yet");
              return;
            }

            startTransition(async () => {
              toast.promise(action(), {
                loading: "Deleting image.",
                success: "Image deleted successfully.",
                error: "Failed to to delete image.",
              });
            });
          }}
        >
          <XIcon className="h-5 w-5" />
        </ConfirmationDialog>
      )}
      <Link
        href={isPending ? "" : image.url}
        target={isPending ? "_self" : "_blank"}
        className={cn(isPending && "cursor-default")}
      >
        <img
          src={image.url}
          alt={image.name}
          className={cn(
            "h-full max-h-[calc(100svh-220px)] min-h-[400px] rounded-md  bg-muted object-contain transition-all",
            isPending && "opacity-50",
          )}
        />
      </Link>
    </div>
  );
}
