import { auth } from "@/auth";
import { getIdentityBySlugFirebase } from "@/firebase/firestore/identity";
import { DataTable } from "@/components/identity-table";

type Props = {
  params: { project: string };
};

export default async function Page({ params }: Props) {
  const identities = await getIdentityBySlugFirebase(params.project);

  const session = await auth();
  const isAdmin = session?.user.isAdmin;

  return (
    <div className="flex h-full min-h-screen flex-1 flex-col items-center space-y-8">
      <DataTable data={identities} slug={params.project} isAdmin={isAdmin} />
    </div>
  );
}
