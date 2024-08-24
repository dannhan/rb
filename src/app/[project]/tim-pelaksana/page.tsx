import { getTeam } from "@/lib/mocks";
import { columns } from "@/components/team-table/columns";
import { DataTable } from "@/components/team-table/data-table";

export default async function Page() {
  const team = await getTeam();

  return (
    <div>
      <div className="flex h-full flex-1 flex-col space-y-8">
        <DataTable data={team} columns={columns} />
      </div>
    </div>
  );
}
