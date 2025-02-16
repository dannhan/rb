import { Timestamp } from "firebase-admin/firestore";

import { Project } from "@/types";
import { db } from "@/lib/firebase/admin";
import { deleteDocumentWithSubcollections } from "@/lib/firebase/utils";

export async function seedProjects() {
  const ref = db.collection("test-projects");

  // delete all document first
  await deleteDocumentWithSubcollections("test-projects", "ria-busana-test");

  await ref.doc("ria-busana-test").set({
    title: "Ria Busana Test",
    type: "konstruksi",
    createdAt: Timestamp.now(),
  } satisfies Project);
  await ref.doc("ria-busana-semarang").set({
    title: "Ria Busana Semarang",
    type: "renovasi",
    createdAt: Timestamp.now(),
  } satisfies Project);
}
