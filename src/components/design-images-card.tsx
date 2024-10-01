"use client";

import * as React from "react";

import { toast } from "sonner";
import { ImageIcon, UploadCloudIcon } from "lucide-react";

import { UploadedFile, File } from "@/types";
import { deleteDesignImageAction } from "@/actions/delete";
import { useUploadFile } from "@/hooks/use-upload-file";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ImageCard } from "@/components/image-card";
import { FileUploader } from "@/components/file-uploader";

// todo:
// 1. change scroll area to use carousel
// 2. use Image instead of img

interface Props {
  designImages: (UploadedFile | File)[];
  slug: string;
  admin?: boolean;
}

export function DesignImagesCard({ designImages, slug, admin }: Props) {
  const { progresses, onUpload, isUploading } = useUploadFile("designImages", {
    input: { slug },
  });

  return (
    <Card>
      <CardHeader className="mb-0 flex flex-row justify-between pb-0">
        <div>
          <CardTitle className="text-xl">Gambar Desain</CardTitle>
          <CardDescription className="text-xs sm:block">
            These are all of the images that have been uploaded.
          </CardDescription>
        </div>

        {admin && (
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <UploadCloudIcon className="h-5 w-5 sm:mr-2" />
                <span className="hidden sm:inline">Upload</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
              <DialogHeader>
                <DialogTitle>Upload Files</DialogTitle>
                <DialogDescription>
                  Drag and drop your files here or click to browse.
                </DialogDescription>
              </DialogHeader>
              <FileUploader
                accept={{ "image/*": [] }}
                maxFileCount={4}
                maxSize={8 * 1024 * 1024}
                progresses={progresses}
                onUpload={onUpload}
                disabled={isUploading}
              />
            </DialogContent>
          </Dialog>
        )}
      </CardHeader>
      <CardContent>
        {designImages.length > 0 ? (
          <ScrollArea>
            <div className="my-4 flex w-max flex-row gap-6">
              {designImages.map((file) => (
                <ImageCard
                  key={file.key}
                  image={file}
                  admin={admin}
                  onDelete={() => {
                    toast.promise(
                      deleteDesignImageAction({
                        slug,
                        fileKey: file.key,
                      }),
                      {
                        loading: "Deleting image.",
                        success: "Image deleted successfully.",
                        error: "Failed to to delete image.",
                        duration: 1000,
                      },
                    );
                  }}
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        ) : (
          <Card className="mt-6 flex h-[425px] w-full flex-col items-center justify-center space-y-6 bg-transparent p-4">
            <CardHeader className="flex flex-col items-center p-0 text-center md:gap-1.5">
              <div className="mr-4 shrink-0 rounded-full border border-dashed p-4">
                <ImageIcon
                  className="size-8 text-muted-foreground "
                  aria-hidden="true"
                />
              </div>
              <CardTitle className="text-lg md:text-2xl md:leading-none">
                No files uploaded
              </CardTitle>
              <CardDescription className="text-xs md:text-sm">
                Upload some files to see them here
              </CardDescription>
            </CardHeader>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
