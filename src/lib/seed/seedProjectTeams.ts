import { db } from "@/lib/firebase/admin";

import { TeamMember } from "@/types";

export async function seedProjectTeams() {
  const ref = db
    .collection("test-projects")
    .doc("ria-busana-test")
    .collection("teams");

  const team: Omit<TeamMember, "position">[] = [
    {
      pekerjaan: "Gambar Arsitek",
      spk: "K001/SPK-ARS/IV/2022",
      pelaksana: "Deni Wiyono",
      status: "On Progress",
    },
  ];

  // Batch write for Firestore
  const batch = db.batch();
  team.forEach((teamMember, index) => {
    const docRef = ref.doc(); // Auto-generate Firestore document ID
    batch.set(docRef, {
      position: (index + 1) * 1000, // Sparse ordering for future flexibility
      ...teamMember,
    } satisfies TeamMember);
  });

  await batch.commit();

  console.log("Seed project team successfully.");
}
