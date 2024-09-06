"use client";

import dynamic from "next/dynamic";
import { UploadedFile } from "@/types";
import { useUploadFile } from "@/hooks/use-upload-file";

import { UploadCloudIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

const Dialog = dynamic(() =>
  import("@/components/ui/dialog").then((mod) => mod.Dialog),
);
const DialogContent = dynamic(() =>
  import("@/components/ui/dialog").then((mod) => mod.DialogContent),
);
const DialogDescription = dynamic(() =>
  import("@/components/ui/dialog").then((mod) => mod.DialogDescription),
);
const DialogHeader = dynamic(() =>
  import("@/components/ui/dialog").then((mod) => mod.DialogHeader),
);
const DialogTitle = dynamic(() =>
  import("@/components/ui/dialog").then((mod) => mod.DialogTitle),
);
const DialogTrigger = dynamic(() =>
  import("@/components/ui/dialog").then((mod) => mod.DialogTrigger),
);

import { FileUploader } from "@/components/file-uploader";
import { UploadedFilesCard } from "@/components/uploaded-files-card";

type Props = {
  designImages: UploadedFile[];
  params: { project: string };
  isLoading?: boolean;
};

export function UploadFilesDialog({ designImages, params, isLoading }: Props) {
  const { onUpload, progresses, uploadedFiles, isUploading } = useUploadFile(
    "imageUploader",
    { defaultUploadedFiles: designImages },
    params.project,
  );

  return (
    <div className="space-y-6">
      <UploadedFilesCard uploadedFiles={uploadedFiles}>
        {isLoading ? (
          <Button disabled>
            <UploadCloudIcon className="h-5 w-5 sm:mr-2" />
            <span className="hidden sm:inline">Upload</span>
          </Button>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <UploadCloudIcon className="h-5 w-5 sm:mr-2" />
                <span className="hidden sm:inline">Upload</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
              <DialogHeader>
                <DialogTitle>Upload files</DialogTitle>
                <DialogDescription>
                  Drag and drop your files here or click to browse.
                </DialogDescription>
              </DialogHeader>
              <FileUploader
                maxFileCount={4}
                maxSize={8 * 1024 * 1024}
                progresses={progresses}
                onUpload={onUpload}
                disabled={isUploading}
              />
            </DialogContent>
          </Dialog>
        )}
      </UploadedFilesCard>
    </div>
  );
}
