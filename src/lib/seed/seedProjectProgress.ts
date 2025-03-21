import { db } from "@/lib/firebase/admin";

import { ProgressItem } from "@/types";

export async function seedProjectProgress() {
  const ref = db
    .collection("test-projects")
    .doc("ria-busana-test")
    .collection("progress");

  // prettier-ignore
  const progressItems: Omit<ProgressItem, "position">[] = [
    { description: "Pondasi tapak", progress: { "11_18-08-23": 100, "12_25-08-23": 100 } },
    { description: "Struktur lantai 1", progress: { "11_18-08-23": 20, "12_25-08-23": 35 } },
    { description: "Struktur lantai 2", progress: {} },
    { description: "Struktur lantai 3 baja", progress: {} },
    { description: "Atap spandex", progress: {} },
    { description: "Dinding hebel", progress: {} },
    { description: "Keramik", progress: {} },
    { description: "Plafon", progress: {} },
    { description: "Kusen aluminium", progress: {} },
    { description: "Show window", progress: {} },
    { description: "Pintu utama", progress: {} },
    { description: "Seven", progress: {} },
    { description: "Railling stainless", progress: {} },
    { description: "Lift barang", progress: {} },
    { description: "Rak gudang", progress: {} },
    { description: "Rumah genset", progress: {} },
    { description: "Office dan gudang", progress: {} },
    { description: "Toilet", progress: {} },
  ];

  // Batch write for Firestore
  const batch = db.batch();
  progressItems.forEach((item, index) => {
    const docRef = ref.doc(); // Auto-generate Firestore document ID
    batch.set(docRef, {
      position: (index + 1) * 1000, // Sparse ordering for future flexibility
      ...item,
    } satisfies ProgressItem);
  });

  await batch.commit();

  console.log("Seed project progress successfully.");
}
