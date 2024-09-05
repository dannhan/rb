"use client";

import { UploadedFile } from "@/types";
import { useUploadFile } from "@/hooks/use-upload-file";

import { FileUploader } from "@/components/file-uploader";
import { UploadedFilesCard } from "@/components/uploaded-files-card";

type Props = {
  designImages: UploadedFile[];
  params: { project: string };
};

// todo: change file and function name
export default function Comp({ designImages, params }: Props) {
  const { onUpload, progresses, uploadedFiles, isUploading } = useUploadFile(
    "imageUploader",
    { defaultUploadedFiles: designImages },
    params.project,
  );

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
