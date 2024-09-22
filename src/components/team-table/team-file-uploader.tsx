import * as React from "react";

import { PlusCircle } from "lucide-react";
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

export function TeamFileUploader({ progresses, onUpload, isUploading }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <PlusCircle className="mr-2 h-3.5 w-3.5" /> Attach a file
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
          accept={{ "*/*": [] }}
          maxFileCount={1}
          maxSize={16 * 1024 * 1024}
          progresses={progresses}
          onUpload={onUpload}
          disabled={isUploading}
        />
      </DialogContent>
    </Dialog>
  );
}
