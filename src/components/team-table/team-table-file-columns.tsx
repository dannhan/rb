"use client";

import Link from "next/link";
import * as React from "react";

import { useUploadFile } from "@/hooks/use-upload-file";

import type { Row } from "@tanstack/react-table";
import type { Team, StoredFile } from "@/types";

import { TeamFileUploader } from "./team-file-uploader";
import {
  FileTextIcon,
  ImageIcon,
  VideoIcon,
  MusicIcon,
  PlusIcon,
  FileIcon,
  FileArchiveIcon,
} from "lucide-react";

interface Props {
  row: Row<Team & { file?: StoredFile }>;
  slug: string;
}

export function DataTableFileColumns({ row, slug }: Props) {
  const teamId = row.original.id;
  const fileId = row.getValue("fileId") as string | undefined;

  const { progresses, onUpload, uploadedFiles, isUploading, setUploadedFiles } =
    useUploadFile("team", {
      defaultUploadedFiles: row.original.file
        ? [row.original.file && row.original.file]
        : [],
      input: { slug, teamId },
    });

  const hasUploadedFiles = uploadedFiles.length > 0;

  return hasUploadedFiles ? (
    <Link
      href={uploadedFiles[0].url}
      target="_blank"
      className="flex min-w-[120px] items-center gap-2"
      onClick={() => console.log(fileId)}
    >
      {getFileIcon((uploadedFiles[0] as StoredFile).type)}
      {uploadedFiles[0].name}
    </Link>
  ) : (
    <TeamFileUploader
      progresses={progresses}
      onUpload={onUpload}
      isUploading={isUploading}
    />
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
