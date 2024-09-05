import { getDesignImagesBySlugFirebase } from "@/firebase/firestore/design-image";
import { UploadFilesDialog } from "@/components/upload-files-dialog";

type Props = {
  params: { project: string };
};

export default async function Page({ params }: Props) {
  const designImages = await getDesignImagesBySlugFirebase(params.project);

  return <UploadFilesDialog params={params} designImages={designImages} />;
}
