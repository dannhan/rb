import { projectRef } from "@/lib/firebase/utils";
import { getFileUrl } from "@/lib/get-file-url";
import { FieldValue } from "firebase-admin/firestore";

export const updateDesignDrawingImageService = async (
  key: string,
  metadata: { params: { project: string }; categoryId: string },
) => {
  await projectRef(metadata.params)
    .collection("design-drawing-categories")
    .doc(metadata.categoryId)
    .update({ images: FieldValue.arrayUnion(getFileUrl(key)) });

  return { url: getFileUrl(key) };
};
