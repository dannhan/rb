import { db } from "@/firebase/init";

import { Identity } from "@/types";
import { z, ZodError } from "zod";
import { identitySchema } from "@/config/schema";

export async function getIdentityBySlugFirebase(
  slug: string,
): Promise<Identity[]> {
  try {
    const identitiesRef = db
      .collection("projects")
      .doc(slug)
      .collection("identities");
    const snapshot = await identitiesRef.orderBy("no").get();
    const data: FirebaseFirestore.DocumentData[] = [];
    snapshot.forEach((doc) => {
      data.push(doc.data());
    });

    return z.array(identitySchema).parse(data);
  } catch (error) {
    console.error("Error fetching identity:", error);

    if (error instanceof ZodError) {
      throw new Error("Invalid data type error.");
    }
    throw new Error("Failed to fetch identity.");
  }
}

export async function getIdentitesLengthBySlugFirebase(
  slug: string,
): Promise<number> {
  try {
    const identitiesRef = db
      .collection("projects")
      .doc(slug)
      .collection("identities");
    const snapshot = await identitiesRef.get();
    return snapshot.size;
  } catch (error) {
    console.error("Error fetching identities:", error);

    if (error instanceof ZodError) {
      throw new Error("Invalid data type error.");
    }
    throw new Error("Failed to fetch data.");
  }
}

export async function postIdentityFirebase(
  slug: string,
  identity: Identity,
): Promise<void> {
  const identitiesRef = db
    .collection("projects")
    .doc(slug)
    .collection("identities");
  await identitiesRef.add(identity);
}

export async function deleteIdentityBySlugAndNoFirebase(
  slug: string,
  no: number,
): Promise<void> {
  const identitiesRef = db
    .collection("projects")
    .doc(slug)
    .collection("identities");

  // Start a new batch
  const batch = db.batch();

  // Find and delete the data
  const snapshot = await identitiesRef.where("no", "==", no).get();
  if (snapshot.empty) {
    console.error("No matching team found, no:", no);
    throw new Error("No matching data found.");
  }

  snapshot.forEach((doc) => {
    doc.ref.delete();
  });

  // Get all teams with a higher number and decrement their numbers
  const higherTeamsSnapshot = await identitiesRef
    .where("no", ">", no)
    .orderBy("no")
    .get();

  higherTeamsSnapshot.forEach((doc) => {
    batch.update(doc.ref, { no: doc.data().no - 1 });
  });

  // Commit the batch
  await batch.commit();
}
