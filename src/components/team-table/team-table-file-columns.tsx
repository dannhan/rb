"use client";

import Link from "next/link";
import * as React from "react";

import { useUploadFile } from "@/hooks/use-upload-file";

import type { Row } from "@tanstack/react-table";
import type { Team, File } from "@/types";

import {
  FileTextIcon,
  ImageIcon,
  VideoIcon,
  MusicIcon,
  PlusIcon,
  FileIcon,
  FileArchiveIcon,
  PlusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileUploader } from "@/components/file-uploader";
import { WithDialog } from "@/components/with-dialog";

interface Props {
  row: Row<Team & { file?: File }>;
  slug: string;
}

export function DataTableFileColumns({ row, slug }: Props) {
  const teamId = row.original.id;

  const { progresses, onUpload, uploadedFiles, isUploading } = useUploadFile(
    "projectTeam",
    {
      defaultUploadedFiles: row.original.file
        ? [row.original.file && row.original.file]
        : [],
      input: { slug, teamId },
    },
  );

  const hasUploadedFiles = uploadedFiles.length > 0;

  return hasUploadedFiles ? (
    <Link
      href={uploadedFiles[0].url}
      target="_blank"
      className="flex w-full max-w-[200px] items-center overflow-hidden"
    >
      <span className="w-4">
        {getFileIcon((uploadedFiles[0] as File).type)}
      </span>
      <span className="line-clamp-1 overflow-hidden overflow-ellipsis pl-3">
        {uploadedFiles[0].name}
      </span>
    </Link>
  ) : (
    <WithDialog
      trigger={
        <Button variant="outline" size="sm" className="h-full">
          <PlusCircle className="mr-2 h-3.5 w-3.5" /> Attach a file
        </Button>
      }
      title="Upload Files"
      description="Drag and drop your files here or click to browse."
    >
      <FileUploader
        accept={{ "*/*": [] }}
        multiple={false}
        maxSize={16 * 1024 * 1024}
        progresses={progresses}
        onUpload={onUpload}
        disabled={isUploading}
      />
    </WithDialog>
  );
}

const getFileIcon = (mimeType: string) => {
  const [type, subType] = mimeType.split("/");

  switch (type) {
    case "image":
      return <ImageIcon className="h-4 w-4 text-green-500" />;
    case "video":
      return <VideoIcon className="h-4 w-4 text-red-500" />;
    case "audio":
      return <MusicIcon className="h-4 w-4 text-yellow-500" />;
    case "application":
      switch (subType) {
        case "pdf":
          return <FileTextIcon className="h-4 w-4 text-red-700" />;
        case "msword":
        case "vnd.openxmlformats-officedocument.wordprocessingml.document":
          return <FileTextIcon className="h-4 w-4 text-blue-700" />;
        case "vnd.ms-excel":
        case "vnd.openxmlformats-officedocument.spreadsheetml.sheet":
          return <FileTextIcon className="h-4 w-4 text-green-700" />;
        case "vnd.ms-powerpoint":
        case "vnd.openxmlformats-officedocument.presentationml.presentation":
          return <FileTextIcon className="h-4 w-4 text-orange-700" />;
        case "zip":
        case "x-rar-compressed":
        case "x-7z-compressed":
          return <FileArchiveIcon className="h-4 w-4 text-purple-500" />;
        default:
          return <FileIcon className="h-4 w-4 text-gray-500" />;
      }
    case "text":
      return <FileTextIcon className="h-4 w-4 text-blue-500" />;
    case "none":
      return <PlusIcon className="h-4 w-4 text-gray-400" />;
    default:
      return <FileIcon className="h-4 w-4 text-gray-500" />;
  }
};
