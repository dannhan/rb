"use client";

import * as React from "react";
import { useParams } from "next/navigation";

import { UploadThingError } from "uploadthing/server";
import { toast } from "sonner";
import { UploadIcon } from "lucide-react";

import type { Attachment } from "@/types";
import { uploadFiles } from "@/lib/utils/uploadthing";

import { useTeamContext } from "@/components/Providers/TeamProvider";
import { Button } from "@/components/ui/button";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadItemProgress,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";

type Props = { id: string | null; setShowModal: (value: boolean) => void };
const TeamAttachmentUploader: React.FC<Props> = ({ id, setShowModal }) => {
  const [isUploading, setIsUploading] = React.useState(false);
  const [files, setFiles] = React.useState<File[]>([]);

  const params = useParams() as { project: string };
  const { team, dispatch } = useTeamContext();

  const teamMember = team.find((t) => t.id === id);
  if (!teamMember || !id) {
    toast.error("Error showing dialog.");
    return;
  }

  const onUpload = async (
    files: File[],
    { onProgress }: { onProgress: (file: File, progress: number) => void },
  ) => {
    setIsUploading(true);
    try {
      const responses = await uploadFiles("teamAttachments", {
        files,
        input: { params, collectionId: id },
        onUploadProgress: ({ file, progress }) => {
          onProgress(file, progress);
        },
      });

      // WARN: too many things can go wrong here
      const newAttachments: Attachment[] = [];
      responses.forEach(({ serverData: { result } }) => {
        if (!result) return;

        const file = files.find((f) => f.name === result?.name);
        newAttachments.push({
          ...result,
          url: file ? URL.createObjectURL(file) : result.url,
        });
      });

      if (newAttachments.length > 0) {
        setShowModal(false);
        toast.success("File have been uploaded.");
        dispatch({
          type: "update",
          payload: { ...teamMember, attachments: newAttachments },
        });
      }
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
      setIsUploading(false);
      setFiles([]);
    }
  };

  return (
    <FileUpload
      accept="image/*"
      maxFiles={Infinity}
      maxSize={64 * 1024 * 1024}
      className="w-full"
      onAccept={(files) => setFiles(files)}
      onUpload={onUpload}
      onFileReject={(file: File, message: string) => {
        toast(message, {
          description: `"${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}" has been rejected`,
        });
      }}
      disabled={isUploading}
      multiple
    >
      <FileUploadDropzone>
        <div className="flex flex-col items-center gap-1 text-center">
          <div className="flex items-center justify-center rounded-full border p-2.5">
            <UploadIcon className="size-6 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium">Drag &amp; drop images here</p>
          <p className="text-xs text-muted-foreground">Or click to browse</p>
        </div>
        <FileUploadTrigger asChild>
          <Button variant="outline" size="sm" className="mt-2 w-fit">
            Browse files
          </Button>
        </FileUploadTrigger>
      </FileUploadDropzone>
      <FileUploadList>
        {files.map((file, index) => (
          <FileUploadItem key={index} value={file} className="flex flex-col">
            <div className="flex w-full items-center gap-2">
              <FileUploadItemPreview />
              <FileUploadItemMetadata />
            </div>
            <FileUploadItemProgress forceMount />
          </FileUploadItem>
        ))}
      </FileUploadList>
    </FileUpload>
  );
};

export default TeamAttachmentUploader;
