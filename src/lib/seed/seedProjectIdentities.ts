import { db } from "@/lib/firebase/admin";
import { Identity } from "@/types";

export async function seedProjectIdentities() {
  const ref = db
    .collection("test-projects")
    .doc("ria-busana-test")
    .collection("identities");

  const identities: Identity[] = [
    { position: 1, field: "Nama Proyek", value: "RB Yogyakarta" },
    { position: 2, field: "Lokasi", value: "Kab. Yogyakarta" },
    { position: 3, field: "No. SPK", value: "K001/SPK/PRO/IV/2023" },
    { position: 4, field: "Pelaksana", value: "M Jamaludin" },
    { position: 5, field: "Luas Tanah", value: "-m2" },
    { position: 6, field: "Luas Bangunan", value: "-m2" },
    { position: 7, field: "Jumlah Lantai", value: "4" },
    { position: 8, field: "Struktur Bangunan", value: "Beton" },
    { position: 9, field: "Tanggal Mulai", value: "2023" },
    { position: 10, field: "Tanggal Selesai", value: "" },
    { position: 11, field: "Grand Opening", value: "28 Februari 2024" },
    { position: 12, field: "Serah Terima", value: "15 Februari 2024" },
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
