import { DataTable } from "@/components/identity-table/data-table";
import { columns } from "@/components/identity-table/columns";

type Props = {
  params: { project: string };
};

export default async function Page({ params }: Props) {
  return (
    <div>
      <div className="flex h-full flex-1 flex-col space-y-8">
        <DataTable data={data} columns={columns} slug={params.project} />
      </div>
    </div>
  );
}

const data: { field: string; value: string }[] = [
  {
    field: "Nama Proyek",
    value: "RB Yogyakarta",
  },
  {
    field: "Lokasi",
    value: "Kab. Yogyakarta",
  },
  {
    field: "No. SPK",
    value: "K001/SPK/PRO/IV/2023",
  },
  {
    field: "Pelaksana",
    value: "M Jamaludin",
  },
  {
    field: "Luas Tanah",
    value: "-m2",
  },
  {
    field: "Luas Bangunan",
    value: "-m2",
  },
  {
    field: "Jumlah Lantai",
    value: "4",
  },
  {
    field: "Struktur Bangunan",
    value: "Bangunan",
  },
  {
    field: "Tanggal Mulai",
    value: "2023",
  },
  {
    field: "Tanggal Selesai",
    value: "",
  },
  {
    field: "Grand Opening",
    value: "28 Februari 2024",
  },
  {
    field: "Serah Terima",
    value: "15 Februari 2024",
  },
];
