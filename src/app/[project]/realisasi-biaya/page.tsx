import { auth } from "@/auth";
import { getCostRealizationBySlugFirebase } from "@/firebase/firestore/cost-realization";
import { BasicUploader } from "@/components/basic-uploader";

type Props = {
  params: { project: string };
};

export default async function Page({ params }: Props) {
  const costRealization = await getCostRealizationBySlugFirebase(
    params.project,
  );

  const session = await auth();
  const isAdmin = session?.user.isAdmin;

  return (
    <BasicUploader
      storedFile={costRealization}
      slug={params.project}
      endpoint="costRealization"
      isAdmin={isAdmin}
    />
  );
}
