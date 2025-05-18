import type { UploadedFileData } from "uploadthing/types";
import type { Attachment } from "@/types";

import { projectRef } from "@/lib/firebase/utils";
import { getFileUrl } from "@/lib/utils/get-file-url";
import { FieldValue } from "firebase-admin/firestore";

export const updateTeamAttachmentService = async (
  { name, size, type, key }: UploadedFileData,
  metadata: { params: { project: string }; collectionId: string },
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
    .collection("teams")
    .doc(metadata.collectionId)
    .update({ attachments: FieldValue.arrayUnion(data) });

  return data satisfies Attachment;
};
