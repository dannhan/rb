"use client";

import { useRouter } from "next/navigation";
import type { AttachmentCategory } from "@/types";

import { useUploadFile } from "@/hooks/use-upload-file";

// TODO: refactor below component
import { FileUploader } from "@/components/file-uploader";

// TODO: might change the api of this component
type Props = { projectId: string; category: AttachmentCategory };
const SingleImageUploader: React.FC<Props> = ({ projectId, category }) => {
  const router = useRouter();
  const { onUpload, progresses, isUploading } = useUploadFile("singleImage", {
    input: { projectId, category },
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <FileUploader
      withToast={false}
      accept={{ "image/*": [] }}
      multiple={false}
      maxSize={32 * 1024 * 1024}
      progresses={progresses}
      onUpload={onUpload}
      disabled={isUploading}
    />
  );
};

export default SingleImageUploader;
