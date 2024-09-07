"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

import { UploadedFile } from "@/types";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { EmptyCard } from "@/components/empty-card";
import { Skeleton } from "./ui/skeleton";

const DialogUploader = dynamic(() =>
  import("@/components/dialog-uploader").then((mod) => mod.DialogUploader),
);

interface Props {
  designImages: UploadedFile[];
  slug?: string;
  isLoading?: boolean;
}

export function DesignImagesCard({ designImages, slug, isLoading }: Props) {
  const [uploadedImages, setUploadedImages] =
    useState<UploadedFile[]>(designImages);

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle className="text-xl">Gambar Desain</CardTitle>
          <CardDescription className="text-xs sm:block">
            These are all of the images that have been uploaded.
          </CardDescription>
        </div>
        <DialogUploader
          files={uploadedImages}
          setFiles={setUploadedImages}
          slug={slug}
        />
      </CardHeader>
      <CardContent>
        {uploadedImages.length > 0 ? (
          <ScrollArea>
            <div className="flex w-max gap-2">
              {/* todo, important: create image card component and add hover effect to delete and full screen image */}
              {uploadedImages.map((file) => (
                <div
                  key={file.key}
                  className="min-w-1/2 relative aspect-[2/3] h-[425px] bg-transparent"
                >
                  <Image
                    src={file.url}
                    alt={file.name}
                    fill
                    className="rounded-md object-contain"
                  />
                </div>
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
