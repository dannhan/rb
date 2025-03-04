import { db } from "./admin";

/**
 * Recursively deletes a collection and all its subcollections.
 */
export async function deleteCollectionWithSubcollections(
  collectionPath: string,
) {
  const collectionRef = db.collection(collectionPath);
  const snapshot = await collectionRef.get();

  if (snapshot.empty) {
    console.log(`No documents in collection: ${collectionPath}`);
    return;
  }

  for (const doc of snapshot.docs) {
    await deleteDocumentWithSubcollections(collectionPath, doc.id);
  }

  console.log(`Deleted collection: ${collectionPath}`);
}

/**
 * Deletes a document and recursively deletes its subcollections.
 */
export async function deleteDocumentWithSubcollections(
  parentPath: string,
  docId: string,
) {
  const docRef = db.collection(parentPath).doc(docId);
  const subcollections = await docRef.listCollections();

  // Recursively delete subcollections
  for (const subcollection of subcollections) {
    await deleteCollectionWithSubcollections(
      `${parentPath}/${docId}/${subcollection.id}`,
    );
  }

  // Delete the document itself
  await docRef.delete();
  console.log(`Deleted document: ${parentPath}/${docId}`);
}

/**
 * Deletes all documents inside a Firestore collection.
 * @param {string} collectionPath - The Firestore collection path
 */
export async function deleteAllDocumentsInCollection(collectionPath: string) {
  const collectionRef = db.collection(collectionPath);
  const snapshot = await collectionRef.get();

  if (snapshot.empty) {
    console.log(`No documents to delete in: ${collectionPath}`);
    return;
  }

  const batch = db.batch();
  snapshot.docs.forEach((doc) => batch.delete(doc.ref));

  await batch.commit(); // Perform batch delete
  console.log(`Deleted all documents in collection: ${collectionPath}`);
}
