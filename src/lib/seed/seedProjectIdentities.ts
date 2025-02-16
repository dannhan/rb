import { db } from "@/lib/firebase/admin";
import { Identity } from "@/types";

export async function seedProjectIdentities() {
  const ref = db
    .collection("test-projects")
    .doc("ria-busana-test")
    .collection("identities");

  const identities: Identity[] = [
    { no: 1, field: "Nama Proyek", value: "RB Yogyakarta" },
    { no: 2, field: "Lokasi", value: "Kab. Yogyakarta" },
    { no: 3, field: "No. SPK", value: "K001/SPK/PRO/IV/2023" },
    { no: 4, field: "Pelaksana", value: "M Jamaludin" },
    { no: 5, field: "Luas Tanah", value: "-m2" },
    { no: 6, field: "Luas Bangunan", value: "-m2" },
    { no: 7, field: "Jumlah Lantai", value: "4" },
    { no: 8, field: "Struktur Bangunan", value: "Beton" },
    { no: 9, field: "Tanggal Mulai", value: "2023" },
    { no: 10, field: "Tanggal Selesai", value: "" },
    { no: 11, field: "Grand Opening", value: "28 Februari 2024" },
    { no: 12, field: "Serah Terima", value: "15 Februari 2024" },
  ];

  // Batch write for Firestore
  const batch = db.batch();
  identities.forEach((identity) => {
    const docRef = ref.doc(); // Auto-generate ID
    batch.set(docRef, identity);
  });

  await batch.commit();
  console.log("Seeded project identities successfully.");
}
