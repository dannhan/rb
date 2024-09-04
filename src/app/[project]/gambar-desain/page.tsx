"use client";

import { FileUploader } from "@/components/file-uploader";
import { UploadedFilesCard } from "./uploaded-files-card";

export default function Page() {
  // const { onUpload, progresses, uploadedFiles, isUploading } = useUploadFile(
  //   "imageUploader",
  //   { defaultUploadedFiles: [] },
  // );

  return (
    <div className="space-y-6">
      <FileUploader
        maxFileCount={4}
        maxSize={4 * 1024 * 1024}
        // progresses={progresses}
        // onUpload={onUpload}
        // disabled={isUploading}
      />
      <UploadedFilesCard uploadedFiles={[]} />
    </div>
  );
}
