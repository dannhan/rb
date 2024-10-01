import * as React from "react";
import { useRouter } from "next/navigation";

import type { UploadedFile, File as StoredFile } from "@/types";
import type { UploadFilesOptions } from "uploadthing/types";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

import { toast } from "sonner";

import { getErrorMessage } from "@/lib/handle-error";
import { uploadFiles } from "@/lib/uploadthing";

// todo:
// 1. add type for input
// 2. change router.refresh to something else

interface UseUploadFileProps
  extends Pick<
    UploadFilesOptions<OurFileRouter, keyof OurFileRouter>,
    "headers" | "onUploadBegin" | "onUploadProgress" | "skipPolling"
  > {
  defaultUploadedFiles?: (UploadedFile | StoredFile)[];
  input?: any;
}

export function useUploadFile(
  endpoint: keyof OurFileRouter,
  { defaultUploadedFiles = [], input = {}, ...props }: UseUploadFileProps = {},
) {
  const [uploadedFiles, setUploadedFiles] =
    React.useState<(UploadedFile | StoredFile)[]>(defaultUploadedFiles);
  const [progresses, setProgresses] = React.useState<Record<string, number>>(
    {},
  );
  const [isUploading, setIsUploading] = React.useState(false);
  const router = useRouter();

  async function onUpload(files: File[]) {
    setIsUploading(true);
    try {
      const res = await uploadFiles(endpoint, {
        ...props,
        files,
        input,
        onUploadProgress: ({ file, progress }) => {
          setProgresses((prev) => {
            return {
              ...prev,
              [file.name]: progress,
            };
          });
        },
      });

      // update local state
      setUploadedFiles((prev) => (prev ? [...prev, ...res] : res));
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setProgresses({});
      setIsUploading(false);

      router.refresh();
    }
  }

  return {
    onUpload,
    uploadedFiles,
    progresses,
    isUploading,
    setUploadedFiles,
  };
}
