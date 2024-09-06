import { UploadFilesDialog } from "@/components/upload-files-dialog";

export default function Loading() {
  return (
    <UploadFilesDialog params={{ project: "" }} designImages={[]} isLoading />
  );
}
