import { db } from "@/firebase/init";

export default async function Page() {
  const slug = "rGUpjSg9R1qNjAjI1zce";
  const identityRef = db
    .collection("projects")
    .doc(slug)
    .collection("identities");

  for (const datum of data) {
    // await identityRef.add(datum);
  }

  return <h1>Ok</h1>;
}

const data: { no: number; field: string; value: string }[] = [
  {
    no: 1,
    field: "Nama Proyek",
    value: "RB Yogyakarta",
  },
  {
    no: 2,
    field: "Lokasi",
    value: "Kab. Yogyakarta",
  },
  {
    no: 3,
    field: "No. SPK",
    value: "K001/SPK/PRO/IV/2023",
  },
  {
    no: 4,
    field: "Pelaksana",
    value: "M Jamaludin",
  },
  {
    no: 5,
    field: "Luas Tanah",
    value: "-m2",
  },
  {
    no: 6,
    field: "Luas Bangunan",
    value: "-m2",
  },
  {
    no: 7,
    field: "Jumlah Lantai",
    value: "4",
  },
  {
    no: 8,
    field: "Struktur Bangunan",
    value: "Bangunan",
  },
  {
    no: 9,
    field: "Tanggal Mulai",
    value: "2023",
  },
  {
    no: 10,
    field: "Tanggal Selesai",
    value: "",
  },
  {
    no: 11,
    field: "Grand Opening",
    value: "28 Februari 2024",
  },
  {
    no: 12,
    field: "Serah Terima",
    value: "15 Februari 2024",
  },
];
