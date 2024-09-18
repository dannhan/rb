import { auth } from "@/auth";
import { getTeamBySlugFirebase } from "@/firebase/firestore/team";
import { DataTable } from "@/components/team-table";

type Props = {
  params: { project: string };
};

export default async function Page({ params }: Props) {
  const team = await getTeamBySlugFirebase(params.project);

  const session = await auth();
  const isAdmin = session?.user.isAdmin;

  return (
    <div className="flex h-full flex-1 flex-col space-y-8">
      <DataTable data={team} slug={params.project} isAdmin={isAdmin} />
    </div>
  );
}
