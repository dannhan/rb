import { getDesignImagesBySlugFirebase } from "@/firebase/firestore/design-image";
import { DesignImagesCard } from "@/components/design-images-card";

type Props = {
  params: { project: string };
};

export default async function Page({ params }: Props) {
  const designImages = await getDesignImagesBySlugFirebase(params.project);

  return <DesignImagesCard designImages={designImages} slug={params.project} />;
}
