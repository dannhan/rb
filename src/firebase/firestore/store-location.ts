import type { StoreLocation } from "@/types";
import { db } from "@/firebase/init";

export async function getStoreLocationBySlug(
  slug: string,
): Promise<StoreLocation> {
  try {
    const storeRef = db.collection("projects").doc(slug);
    const doc = await storeRef.get();

    if (!doc.data()?.location) {
      return { link: "", address: "", lat: -3, lng: 115 };
    }

    // todo: do zod validation here
    return doc.data()?.location as StoreLocation;
  } catch (error) {
    console.error("Error fetching store location:", error);
    throw new Error("Failed to fetch store location.");
  }
}

export async function getStoreLocations(): Promise<
  (StoreLocation & { title: string })[]
> {
  try {
    const storeRefs = await db
      .collection("projects")
      .select("title", "location")
      .get();
    const stores: any = [];

    storeRefs.forEach((doc) => {
      stores.push({ title: doc.data().title, ...doc.data().location });
    });

    return stores;
  } catch (error) {
    console.error("Error fetching store locations:", error);
    throw new Error("Failed to fetch store locations.");
  }
}

export async function updateStoreLocationBySlug(
  slug: string,
  store: StoreLocation,
): Promise<void> {
  const storeRef = db.collection("projects").doc(slug);
  await storeRef.update({ location: store });
}
