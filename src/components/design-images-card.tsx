"use client";

import * as React from "react";
import dynamic from "next/dynamic";

import { deleteDesignImageAction } from "@/lib/actions";

import { StoredImage, UploadedFile } from "@/types";
import { useUploadFile } from "@/hooks/use-upload-file";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageCard } from "@/components/image-card";
import { EmptyCard } from "@/components/empty-card";

const DialogUploader = dynamic(() =>
  import("@/components/dialog-uploader").then((mod) => mod.DialogUploader),
);

interface Props {
  designImages: (UploadedFile | StoredImage)[];
  slug: string;
  isLoading?: boolean;
}

export function DesignImagesCard({ designImages, slug, isLoading }: Props) {
  const { progresses, onUpload, uploadedFiles, isUploading, setUploadedFiles } =
    useUploadFile("designImages", {
      defaultUploadedFiles: designImages,
      input: { slug },
    });

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between pb-0 mb-0">
        <div>
          <CardTitle className="text-xl">Gambar Desain</CardTitle>
          <CardDescription className="text-xs sm:block">
            These are all of the images that have been uploaded.
          </CardDescription>
        </div>
        <DialogUploader
          progresses={progresses}
          onUpload={onUpload}
          isUploading={isUploading}
        />
      </CardHeader>
      <CardContent>
        {uploadedFiles.length > 0 ? (
          <ScrollArea>
            <div className="flex w-max gap-8">
              {uploadedFiles.map((file) => (
                <ImageCard
                  key={file.key}
                  image={file}
                  action={async () => {
                    await deleteDesignImageAction(slug, file as StoredImage);
                    setUploadedFiles(
                      uploadedFiles.filter((f) => f.key !== file.key),
                    );
                  }}
                  className="mt-6"
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        ) : !isLoading ? (
          <EmptyCard
            title="No files uploaded"
            description="Upload some files to see them here"
            className="h-[425px] w-full"
          />
        ) : (
          <Skeleton className="h-[425px] w-full" />
        )}
      </CardContent>
    </Card>
  );
}
