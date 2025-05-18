import type { UploadedFileData } from "uploadthing/types";
import type { Attachment } from "@/types";

import { projectRef } from "@/lib/firebase/utils";
import { getFileUrl } from "@/lib/utils/get-file-url";

export const updateProgressItemAttachmentService = async (
  { name, size, type, key }: UploadedFileData,
  metadata: { params: { project: string }; collectionId: string; type: string },
) => {
  const data = {
    name,
    size,
    type,
    key,
    url: getFileUrl(key),
    createdAt: new Date().toISOString(),
  };
  await projectRef(metadata.params)
    .collection("progress-items")
    .doc(metadata.collectionId)
    .set({ attachment: { [metadata.type]: data } }, { merge: true });

  return data satisfies Attachment;
};
