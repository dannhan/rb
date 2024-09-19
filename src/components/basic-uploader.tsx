"use client";

import { StoredImage } from "@/types";
import { OurFileRouter } from "@/app/api/uploadthing/core";

// todo: somehow combine theese two
import { deleteProjectScheduleAction } from "@/lib/actions";
import { deleteCostRealizationAction } from "@/lib/actions";

import { useUploadFile } from "@/hooks/use-upload-file";
import { FileUploader } from "@/components/file-uploader";
import { ImageCard } from "@/components/image-card";

type Props = {
  storedFile: StoredImage | null;
  slug: string;
  endpoint: keyof OurFileRouter;
  isAdmin?: boolean;
};

export function BasicUploader({ storedFile, slug, endpoint, isAdmin }: Props) {
  const { onUpload, progresses, uploadedFiles, isUploading, setUploadedFiles } =
    useUploadFile(endpoint, {
      defaultUploadedFiles: storedFile ? [storedFile] : [],
      input: { slug },
    });

  return uploadedFiles.length === 0 ? (
    <FileUploader
      multiple={false}
      maxSize={8 * 1024 * 1024}
      progresses={progresses}
      onUpload={onUpload}
      disabled={!isAdmin || isUploading}
    />
  ) : (
    <div className="relative flex h-full justify-center">
      <ImageCard
        image={uploadedFiles[0]}
        className="mt-0 h-full"
        isAdmin={isAdmin}
        action={async () => {
          const uploadedFile = uploadedFiles[0] as StoredImage;
          if (endpoint === "projectSchedule") {
            await deleteProjectScheduleAction(slug, uploadedFile);
          } else if (endpoint === "costRealization") {
            await deleteCostRealizationAction(slug, uploadedFile);
          }
          setUploadedFiles([]);
        }}
      />
    </div>
  );
}
