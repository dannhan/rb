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
    {
      pekerjaan: "Gambar Interior",
      spk: "K001/SPK-IND/IV/2022",
      pelaksana: "Nurul Septiani",
      status: "On Progress",
    },
    {
      pekerjaan: "Gambar Struktur",
      spk: "K001/SPK-STR/IV/2022",
      pelaksana: "Adnan Ardiansyah",
      status: "On Progress",
    },
    {
      pekerjaan: "Analisa Struktur",
      spk: "K001/SPK-ENG/IV/2022",
      pelaksana: "Dona Lisa",
      status: "On Progress",
    },
    {
      pekerjaan: "Rencana Anggaran",
      spk: "K001/SPK-EST/IV/2022",
      pelaksana: "Isnaini T Q",
      status: "On Progress",
    },
    {
      pekerjaan: "Jadwal Project",
      spk: "K001/SPK-PLA/IV/2022",
      pelaksana: "Isnaini T Q",
      status: "On Progress",
    },
    {
      pekerjaan: "Procurement",
      spk: "K001/SPK-PRC/IV/2022",
      pelaksana: "Hertia Lestari",
      status: "On Progress",
    },
    {
      pekerjaan: "Konstruksi",
      spk: "K001/SPK-PRO/IV/2022",
      pelaksana: "M Jamaludin",
      status: "Finish",
    },
    {
      pekerjaan: "Interior",
      spk: "K001/SPK-INT/IV/2022",
      pelaksana: "Akbar Fauzi",
      status: "Finish",
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
