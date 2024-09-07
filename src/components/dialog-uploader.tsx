import * as React from "react";

import { UploadCloudIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileUploader } from "@/components/file-uploader";

type Props = {
  progresses: Record<string, number>;
  onUpload: (files: File[]) => Promise<void>;
  isUploading: boolean;
};

export function DialogUploader({ progresses, onUpload, isUploading }: Props) {
  return (
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
  );
}
