"use client";

import { useEffect, useTransition } from "react";
import { useUploadFile } from "@/hooks/use-upload-file";

import { postDesignImagesAction } from "@/lib/actions";

import { FileUploader } from "@/components/file-uploader";
import { UploadedFilesCard } from "@/components/uploaded-files-card";
import { toast } from "sonner";

type Props = {
  params: { project: string };
};

// todo: don't make this as a client component
export default function Page({ params }: Props) {
  const [isPending, startTransition] = useTransition();

  const { onUpload, progresses, uploadedFiles, isUploading } = useUploadFile(
    "imageUploader",
    { defaultUploadedFiles: [] },
  );

  // upload files url to firebase
  const postDesignImagesActionWithSlug = postDesignImagesAction.bind(
    null,
    params.project,
  );
  useEffect(() => {
    if (uploadedFiles.length > 0) {
      startTransition(async () => {
        const formData = new FormData();
        uploadedFiles.forEach((file, index) => {
          formData.append(`urls[${index}]`, file.url);
        });

        const { message, errors } =
          await postDesignImagesActionWithSlug(formData);

        if (errors) {
          toast.error(message, { duration: 5000 });
        }
      });
    }
  }, [uploadedFiles]);

  return (
    <div className="space-y-6">
      <FileUploader
        maxFileCount={4}
        maxSize={4 * 1024 * 1024}
        progresses={progresses}
        onUpload={onUpload}
        disabled={isUploading}
      />
      <UploadedFilesCard uploadedFiles={uploadedFiles} />
    </div>
  );
}
