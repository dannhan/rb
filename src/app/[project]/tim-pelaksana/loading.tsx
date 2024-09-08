import { columns } from "@/components/team-table/columns";
import { DataTable } from "@/components/team-table/data-table";

export default function Loading() {
  return (
    <div className="flex h-full flex-1 flex-col space-y-8">
      <DataTable data={[]} columns={columns} slug={""} isLoading />
    </div>
  );
}
