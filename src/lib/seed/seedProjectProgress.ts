import { db } from "@/lib/firebase/admin";

import type { WithId, ProgressItem, ProgressWeek } from "@/types";

import { nanoid } from "@/lib/utils/nanoid";

export async function seedProjectProgress() {
  const progressItemsRef = db
    .collection("test-projects")
    .doc("ria-busana-test")
    .collection("progress-items");
  const progressWeeksRef = db
    .collection("test-projects")
    .doc("ria-busana-test")
    .collection("progress-weeks");

  const progressWeeks: WithId<ProgressWeek>[] = [
    {
      id: nanoid(),
      weekCount: 11,
      date: new Date(2023, 8, 18).toISOString(),
    },
    {
      id: nanoid(),
      weekCount: 12,
      date: new Date(2023, 8, 25).toISOString(),
    },
  ];

  // prettier-ignore
  const progressItems: Omit<ProgressItem, "position">[] = [
    { description: "Pondasi tapak", progress: { [progressWeeks[0].id]: 100, [progressWeeks[1].id]: 100 } },
    { description: "Struktur lantai 1", progress: { [progressWeeks[0].id]: 20, [progressWeeks[1].id]: 35 } },
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

  progressWeeks.forEach(({ id, ...rest }) => {
    const docRef = progressWeeksRef.doc(id);
    batch.set(docRef, rest satisfies ProgressWeek);
  });
  progressItems.forEach((item, index) => {
    const docRef = progressItemsRef.doc(); // Auto-generate Firestore document ID
    batch.set(docRef, {
      position: (index + 1) * 1000, // Sparse ordering for future flexibility
      ...item,
    } satisfies ProgressItem);
  });

  await batch.commit();

  console.log("Seed project progress successfully.");
}
