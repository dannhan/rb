"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { ImageIcon, UploadCloudIcon } from "lucide-react";

import type { WithId, Attachment, DesignImageSubcategory } from "@/types";

import { useUploadFile } from "@/hooks/use-upload-file";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import FileUploader from "./FileUploader";
import ImageCard from "./ImageCard";

type Props = {
  projectId: string;
  category: WithId<DesignImageSubcategory>;
  designImages: WithId<Attachment>[];
};

const DesignImagesCard: React.FC<Props> = ({
  projectId,
  category,
  designImages,
}) => {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const { onUpload, progresses, isUploading } = useUploadFile("designImage", {
    input: { projectId, subCategory: category.id },
    onSuccess: () => router.refresh(),
  });

  return (
    <Card>
      <CardHeader className="mb-0 flex flex-row justify-between pb-0">
        <CardTitle className="text-xl">{category.title}</CardTitle>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="secondary" className="border">
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
              withToast={false}
              accept={{ "image/*": [] }}
              maxFileCount={64}
              maxSize={32 * 1024 * 1024}
              progresses={progresses}
              onUpload={onUpload}
              disabled={isUploading}
            />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {designImages.length > 0 ? (
          <ScrollArea>
            <div className="my-4 flex w-max flex-row gap-6">
              {designImages.map((image) => (
                <ImageCard attachment={image} />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        ) : (
          <Card className="mt-6 flex h-[425px] w-full flex-col items-center justify-center space-y-6 bg-transparent p-4">
            <CardHeader className="flex flex-col items-center p-0 text-center md:gap-1.5">
              <div className="mr-4 shrink-0 rounded-full border border-dashed p-4">
                <ImageIcon
                  className="size-8 text-muted-foreground"
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
};

export default DesignImagesCard;
