"use client";

import { StoredImage } from "@/types";

import { deleteProjectScheduleAction } from "@/lib/actions";

import { useUploadFile } from "@/hooks/use-upload-file";
import { FileUploader } from "@/components/file-uploader";
import { ImageCard } from "@/components/image-card";

type Props = {
  projectSchedule: StoredImage | null;
  slug: string;
};

export function BasicUploader({ projectSchedule, slug }: Props) {
  const { onUpload, progresses, uploadedFiles, isUploading, setUploadedFiles } =
    useUploadFile("projectSchedule", {
      defaultUploadedFiles: projectSchedule ? [projectSchedule] : [],
      input: { slug },
    });

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
      <ImageCard
        image={uploadedFiles[0]}
        className="mt-0 h-full"
        action={async () => {
          await deleteProjectScheduleAction(slug, uploadedFiles[0].customId);
          setUploadedFiles([]);
        }}
      />
    </div>
  );
}
