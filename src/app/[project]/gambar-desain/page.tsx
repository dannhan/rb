import { auth } from "@/auth";
import {
  getDesignImageIdsBySlugFirebase,
  getDesignImagesBySlugAndIdsFirebase,
} from "@/firebase/firestore/design-image";
import { DesignImagesCard } from "@/components/design-images-card";

type Props = {
  params: { project: string };
};

export default async function Page({ params }: Props) {
  const designImageKeys = await getDesignImageIdsBySlugFirebase(params.project);
  const designImages = await getDesignImagesBySlugAndIdsFirebase(
    params.project,
    designImageKeys,
  );

  const session = await auth();
  const isAdmin = session?.user.isAdmin;

  return <DesignImagesCard designImages={designImages} slug={params.project} isAdmin={isAdmin} />;
}
