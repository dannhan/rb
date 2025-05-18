"use client";

import * as React from "react";
import { useParams } from "next/navigation";

import { UploadThingError } from "uploadthing/server";
import { toast } from "sonner";
import { UploadIcon } from "lucide-react";

import { uploadFiles } from "@/lib/uploadthing";

import { useProjectImagesContext } from "@/components/Providers/ProjectImagesProvider";
import { Button } from "@/components/ui/button";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadItemProgress,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { Image } from "@/types";

type Props = {
  // NOTE: is there a better type safety for this
  usedBy: "rab" | "jadwal-proyek" | "realisasi-biaya";
  setShowModal?: (value: boolean) => void;
};
const ProjectImagesUploader: React.FC<Props> = ({ usedBy, setShowModal }) => {
  const [isUploading, setIsUploading] = React.useState(false);
  const [files, setFiles] = React.useState<File[]>([]);

  const params = useParams() as { project: string };
  const { dispatch } = useProjectImagesContext();

  const onUpload = async (
    files: File[],
    { onProgress }: { onProgress: (file: File, progress: number) => void },
  ) => {
    setIsUploading(true);
    try {
      const responses = await uploadFiles("images", {
        files,
        input: { params, usedBy },
        onUploadProgress: ({ file, progress }) => {
          onProgress(file, progress);
        },
      });

      // WARN: too many things can go wrong here
      // - what if not error, but success false
      // - what if stuck
      // - what if some image success some image fail
      // - what if all error
      const newImages: Image[] = [];
      responses.forEach(({ serverData: { result } }) => {
        if (!result) return;

        newImages.push({ ...result, usedBy });
      });

      if (newImages.length > 0) {
        setShowModal?.(false);
        toast.success("File have been uploaded.");
        dispatch({ type: "create", payload: newImages });
      }
    } catch (error) {
      if (error instanceof UploadThingError) {
        const errorMessage =
          error.data && "error" in error.data
            ? error.data.error
            : "Upload failed";
        toast.error(errorMessage);
        return;
      }

      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred",
      );
    } finally {
      setIsUploading(false);
      setFiles([]);
    }
  };

  return (
    <FileUpload
      accept="image/*"
      maxFiles={Infinity}
      maxSize={64 * 1024 * 1024}
      className="w-full"
      onAccept={(files) => setFiles(files)}
      onUpload={onUpload}
      onFileReject={(file: File, message: string) => {
        toast(message, {
          description: `"${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}" has been rejected`,
        });
      }}
      disabled={isUploading}
      multiple
    >
      <FileUploadDropzone>
        <div className="flex flex-col items-center gap-1 text-center">
          <div className="flex items-center justify-center rounded-full border p-2.5">
            <UploadIcon className="size-6 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium">Drag &amp; drop images here</p>
          <p className="text-xs text-muted-foreground">Or click to browse</p>
        </div>
        <FileUploadTrigger asChild>
          <Button variant="outline" size="sm" className="mt-2 w-fit">
            Browse files
          </Button>
        </FileUploadTrigger>
      </FileUploadDropzone>
      <FileUploadList>
        {files.map((file, index) => (
          <FileUploadItem key={index} value={file} className="flex flex-col">
            <div className="flex w-full items-center gap-2">
              <FileUploadItemPreview />
              <FileUploadItemMetadata />
            </div>
            <FileUploadItemProgress forceMount />
          </FileUploadItem>
        ))}
      </FileUploadList>
    </FileUpload>
  );
};

export default ProjectImagesUploader;
