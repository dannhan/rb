import {
  type ServiceAccount,
  initializeApp,
  cert,
  getApps,
} from "firebase-admin/app";

import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

const firebaseCredential: ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
};

if (getApps().length === 0) {
  initializeApp({
    credential: cert(firebaseCredential),
  });
}

export const db = getFirestore();
export const auth = getAuth();
