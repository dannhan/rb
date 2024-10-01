"use client";

import { toast } from "sonner";

import type { OurFileRouter } from "@/app/api/uploadthing/core";
import type { File } from "@/types";

import { deleteImageAction } from "@/actions/delete";
import { useUploadFile } from "@/hooks/use-upload-file";

import { FileUploader } from "@/components/file-uploader";
import { ImageCard } from "@/components/image-card";

type Props = {
  storedFile: File | null;
  slug: string;
  route: keyof OurFileRouter;
  admin?: boolean;
};

export function BasicUploader({ storedFile, slug, route, admin }: Props) {
  const { onUpload, progresses, uploadedFiles, isUploading, setUploadedFiles } =
    useUploadFile(route, {
      defaultUploadedFiles: storedFile ? [storedFile] : [],
      input: { slug },
    });

  return uploadedFiles.length === 0 ? (
    <FileUploader
      multiple={false}
      maxSize={8 * 1024 * 1024}
      progresses={progresses}
      onUpload={onUpload}
      disabled={!admin || isUploading}
    />
  ) : (
    <ImageCard
      image={uploadedFiles[0]}
      admin={admin}
      onDelete={() => {
        toast.promise(
          deleteImageAction({
            slug,
            route,
            fileKey: uploadedFiles[0].key,
          }),
          {
            loading: "Deleting image.",
            success: () => {
              setUploadedFiles(
                uploadedFiles.filter((f) => f.key !== uploadedFiles[0].key),
              );
              return "Image deleted successfully.";
            },
            error: "Failed to to delete image.",
            duration: 1000,
          },
        );
      }}
    />
  );
}
