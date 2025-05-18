import { useState } from "react";

import type {
  ClientUploadedFileData,
  inferEndpointInput,
} from "uploadthing/types";
import { UploadThingError } from "uploadthing/server";
import { toast } from "sonner";

import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { uploadFiles } from "@/lib/uploadthing";

type UploadEndpoint = keyof OurFileRouter;
type UploadedFile<T = unknown> = ClientUploadedFileData<T>;
type Input<T extends UploadEndpoint> = inferEndpointInput<OurFileRouter[T]>;

export function useUploadFile<T extends UploadEndpoint>(
  endpoint: keyof OurFileRouter,
  input: Input<T>,
) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [progresses, setProgresses] = useState<Record<string, number>>({});
  const [isUploading, setIsUploading] = useState(false);

  async function onUpload(files: File[]) {
    setIsUploading(true);
    try {
      const res = await uploadFiles(endpoint, {
        input,
        files,
        onUploadProgress: ({ file, progress }) => {
          setProgresses((prev) => {
            return {
              ...prev,
              [file.name]: progress,
            };
          });
        },
      });

      setUploadedFiles((prev) => (prev ? [...prev, ...res] : res));
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
      setProgresses({});
      setIsUploading(false);
    }
  }

  return { onUpload, uploadedFiles, progresses, isUploading };
}
