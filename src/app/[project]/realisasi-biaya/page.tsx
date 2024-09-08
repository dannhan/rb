import { getCostRealizationBySlugFirebase } from "@/firebase/firestore/cost-realization";
import { BasicUploader } from "@/components/basic-uploader";

type Props = {
  params: { project: string };
};

export default async function Page({ params }: Props) {
  const costRealization = await getCostRealizationBySlugFirebase(
    params.project,
  );

  return (
    <BasicUploader
      storedFile={costRealization}
      slug={params.project}
      endpoint="costRealization"
    />
  );
}
