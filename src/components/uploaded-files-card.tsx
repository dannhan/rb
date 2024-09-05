import React from "react";
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

interface UploadedFilesCardProps {
  uploadedFiles: UploadedFile[];
  children?: React.ReactNode;
}

export function UploadedFilesCard({
  children,
  uploadedFiles,
}: UploadedFilesCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle className="text-xl">Images</CardTitle>
          <CardDescription className="text-xs sm:block">
            These are all of the images that have been uploaded.
          </CardDescription>
        </div>
        {children}
      </CardHeader>
      <CardContent>
        {uploadedFiles.length > 0 ? (
          <div>
            <ScrollArea>
              {/* <div className="grid w-max min-w-full grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4"> */}
              <div className="flex w-max gap-2">
                {uploadedFiles.map((file) => (
                  <div
                    key={file.key}
                    className="min-w-1/2 relative aspect-[2/3] h-[425px] bg-transparent"
                    // className="relative aspect-[2/3] max-h-[425px]"
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
          </div>
        ) : (
          <EmptyCard
            title="No files uploaded"
            description="Upload some files to see them here"
            className="w-full"
          />
        )}
      </CardContent>
    </Card>
  );
}
