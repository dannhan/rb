import { DataTable } from "@/components/team-table";

export default function Loading() {
  return (
    <div className="flex h-full flex-1 flex-col space-y-8">
      <DataTable data={[]} slug={""} isLoading />
    </div>
  );
}
