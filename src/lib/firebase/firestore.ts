import { z } from "zod";
import { db } from "@/lib/firebase/admin";
import { getErrorMessage } from "@/lib/handle-error";
import { FieldPath } from "firebase-admin/firestore";

type FirestoreDoc = FirebaseFirestore.DocumentData;
type FirestoreQuery = FirebaseFirestore.Query;
type QueryBuilder = (collection: FirestoreQuery) => FirestoreQuery;

export interface FirestoreOptions<T> {
  collectionName:
    | "projects"
    | "project-teams"
    | "project-identities"
    | "project-locations"
    | "project-files"
    | "tests";
  zodSchema: z.ZodType<T>;
  errorMessage: string;
}

export interface FetchCollectionOptions<T> extends FirestoreOptions<T> {
  queryBuilder?: QueryBuilder;
}

export interface FetchDocOptions<T> extends FirestoreOptions<T> {
  docId: string;
}

/*********************************** CREATE METHOD ***************************************/
export async function createDoc<T extends FirestoreDoc>({
  collectionName,
  errorMessage,
  data,
  docId,
}: Omit<FirestoreOptions<T>, "zodSchema"> & {
  data: T;
  docId?: string;
}): Promise<string> {
  try {
    if (docId) {
      await db.collection(collectionName).doc(docId).set(data);
      return docId;
    } else {
      const docRef = await db.collection(collectionName).add(data);
      return docRef.id;
    }
  } catch (error) {
    console.error(getErrorMessage(error));
    throw new Error(errorMessage);
  }
}

/************************************ READ METHOD *****************************************/
export async function fetchCollection<T>({
  collectionName,
  zodSchema,
  errorMessage,
  queryBuilder,
}: FetchCollectionOptions<T>): Promise<T[]> {
  try {
    // get the ref and build the query
    let query: FirebaseFirestore.Query = db.collection(collectionName);
    if (queryBuilder) query = queryBuilder(query);
    const querySnapshot = await query.get();

    // parse the data
    return querySnapshot.docs.reduce<T[]>((results, doc) => {
      const parsed = zodSchema.safeParse({ ...doc.data(), id: doc.id });
      if (parsed.error) {
        console.error(
          `Error in ${collectionName}:`,
          doc.id,
          parsed.error.message,
        );
        return results;
      }
      results.push(parsed.data);
      return results;
    }, []);
  } catch (error) {
    console.error(getErrorMessage(error));
    throw new Error(errorMessage);
  }
}

export async function fetchDoc<T>({
  collectionName,
  docId,
  zodSchema,
  errorMessage,
}: FetchDocOptions<T>): Promise<T | null> {
  try {
    const docRef = db.collection(collectionName).doc(docId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return null;
    }

    const parsed = zodSchema.safeParse(doc.data());
    if (parsed.error) {
      console.error(
        `Error in ${collectionName}:`,
        doc.id,
        parsed.error.message,
      );
      return null;
    }
    return parsed.data;
  } catch (error) {
    console.error(getErrorMessage(error));
    throw new Error(errorMessage);
  }
}

// Fetch multiple documents by IDs
export async function fetchMultipleDocs<T>({
  collectionName,
  ids,
  zodSchema,
  errorMessage,
}: FirestoreOptions<T> & { ids: string[] }): Promise<T[]> {
  try {
    const batches = [];
    for (let i = 0; i < ids.length; i += 10) {
      const batch = ids.slice(i, i + 10);
      batches.push(
        db
          .collection(collectionName)
          .where(FieldPath.documentId(), "in", batch)
          .get(),
      );
    }
    const snapshots = await Promise.all(batches);
    const docsMap = new Map<string, T>();

    snapshots.forEach((snapshot) => {
      snapshot.docs.forEach((doc) => {
        const parsed = zodSchema.safeParse({ ...doc.data(), id: doc.id });
        if (parsed.success) {
          docsMap.set(doc.id, { ...parsed.data, id: doc.id });
        } else {
          console.error(
            `Invalid document in ${collectionName}:`,
            doc.id,
            parsed.error.message,
          );
        }
      });
    });

    return ids.reduce<T[]>((results, id, index) => {
      const doc = docsMap.get(id);
      if (doc) {
        results.push({ ...doc, order: index + 1 });
      }
      return results;
    }, []);
  } catch (error) {
    console.error(getErrorMessage(error));
    throw new Error(errorMessage);
  }
}

/************************************** UPDATE METHOD **********************************/
export async function updateDoc<T extends FirestoreDoc>({
  collectionName,
  docId,
  data,
  errorMessage,
}: Omit<FetchDocOptions<T>, "zodSchema"> & {
  data: Partial<T>;
}): Promise<void> {
  try {
    await db.collection(collectionName).doc(docId).update(data);
  } catch (error) {
    console.error(getErrorMessage(error));
    throw new Error(errorMessage);
  }
}

/********** DELETE METHOD **********/
export async function deleteDoc({
  collectionName,
  docId,
  errorMessage,
}: Omit<FetchDocOptions<any>, "zodSchema">): Promise<void> {
  try {
    await db.collection(collectionName).doc(docId).delete();
  } catch (error) {
    console.error(getErrorMessage(error));
    throw new Error(errorMessage);
  }
}

export async function deleteCollection({
  collectionName,
  errorMessage,
  batchSize = 500,
}: Omit<FirestoreOptions<any>, "zodSchema"> & {
  batchSize?: number;
}): Promise<void> {
  const collectionRef = db.collection(collectionName);
  const query = collectionRef.orderBy("__name__").limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(query, batchSize, resolve, reject);
  });

  async function deleteQueryBatch(
    query: FirestoreQuery,
    batchSize: number,
    resolve: () => void,
    reject: (error: Error) => void,
  ) {
    try {
      const snapshot = await query.get();

      if (snapshot.size === 0) {
        resolve();
        return;
      }

      const batch = db.batch();
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();

      if (snapshot.size < batchSize) {
        resolve();
        return;
      }

      process.nextTick(() => {
        deleteQueryBatch(query, batchSize, resolve, reject);
      });
    } catch (error) {
      console.error(getErrorMessage(error));
      reject(new Error(errorMessage));
    }
  }
}
