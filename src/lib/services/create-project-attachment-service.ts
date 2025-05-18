import type { UploadedFileData } from "uploadthing/types";

import { projectRef } from "@/lib/firebase/utils";
import { getFileUrl } from "@/lib/get-file-url";

export const createProjectAttachmentService = async (
  { name, size, type, key }: UploadedFileData,
  // TODO: better type
  metadata:
    | {
        params: { project: string };
        usedBy: string;
        category?: string | undefined;
      }
    | {
        params: { project: string };
        usedBy: "gambar-desain";
        category: string;
      },
) => {
  const data = {
    name,
    size,
    type,
    key,
    url: getFileUrl(key),
    usedBy: metadata.usedBy,
    category: metadata.category,
    createdAt: new Date().toISOString(),
  };
  if (!metadata.category) delete data.category;

  await projectRef(metadata.params)
    .collection("attachments")
    .doc(key)
    .set(data);

  return data;
};

export const storeProjectAttachmentKeyService = async (
  key: string,
  params: { project: string },
) => {
  await projectRef(params).collection("attachments").doc(key).set({});

  return key;
};
