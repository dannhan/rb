"use client";

import Image from "next/image";
import { UploadedFile } from "@/types";
import { useUploadFile } from "@/hooks/use-upload-file";
import { FileUploader } from "@/components/file-uploader";

type Props = {
  projectSchedule: UploadedFile | null;
  slug: string;
};

export function Uploader({ projectSchedule, slug }: Props) {
  const { onUpload, progresses, uploadedFiles, isUploading } = useUploadFile(
    "projectSchedule",
    {
      defaultUploadedFiles: projectSchedule ? [projectSchedule] : [],
      input: { slug },
    },
  );

  return uploadedFiles.length === 0 ? (
    <FileUploader
      multiple={false}
      maxSize={8 * 1024 * 1024}
      progresses={progresses}
      onUpload={onUpload}
      disabled={isUploading}
    />
  ) : (
    <div className="relative flex h-full justify-center">
      <Image
        src={uploadedFiles[0].url}
        alt={uploadedFiles[0].name}
        fill
        className="h-full rounded-lg object-contain"
      />
    </div>
  );
}
