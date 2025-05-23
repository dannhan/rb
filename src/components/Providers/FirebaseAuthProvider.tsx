"use client";

import { type ReactNode, useEffect } from "react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

const FirebaseAuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();

  useEffect(() => {
    const syncFirebaseAuth = async (session: Session | null) => {
      const { getAuth, signInWithCustomToken } = await import("firebase/auth");
      const { getApp, getApps, initializeApp } = await import("firebase/app");

      const firebaseConfig = {
        apiKey: "AIzaSyBN3ItcUbNwvwNTUrhDNyVfdOnwbu1hU9o",
        authDomain: "ria-busana.firebaseapp.com",
        projectId: "ria-busana",
        storageBucket: "ria-busana.appspot.com",
        messagingSenderId: "1053993262752",
        appId: "1:1053993262752:web:e0f64d268e25eff00133c5",
      };

      const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
      const auth = getAuth(app);

      if (session?.firebaseToken) {
        try {
          await signInWithCustomToken(auth, session.firebaseToken);
        } catch (error) {
          console.error(`Error signing in with custom token ${error}`);
        }
      } else {
        auth.signOut();
      }
    };

    syncFirebaseAuth(session);
  }, [session]);

  return <>{children}</>;
};

export default FirebaseAuthProvider;
