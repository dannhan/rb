import { getTeamBySlugFirebase } from "@/firebase/firestore/team";
import { columns } from "@/components/team-table/columns";
import { DataTable } from "@/components/team-table/data-table";

type Props = {
  params: { project: string };
};

export default async function Page({ params }: Props) {
  const team = await getTeamBySlugFirebase(params.project);

  return (
    <div className="flex h-full flex-1 flex-col space-y-8">
      <DataTable data={team} columns={columns} slug={params.project} />
    </div>
  );
}
