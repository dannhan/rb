import { getDesignImagesBySlugFirebase } from "@/firebase/firestore/design-image";

// todo: move this file
import Comp from "./comp";

type Props = {
  params: { project: string };
};

export default async function Page({ params }: Props) {
  const designImages = await getDesignImagesBySlugFirebase(params.project);

  return <Comp params={params} designImages={designImages} />;
}
