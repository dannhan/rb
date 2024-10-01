import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "@/lib/firebase/client";

export const { auth, handlers, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        // todo: use firebase implementation
        const { email, password } = credentials as Record<
          "email" | "password",
          string
        >;
        const isAdmin = email === "admin@gmail.com";

        console.log(email, password, isAdmin);
        return await signInWithEmailAndPassword(firebaseAuth, email, password)
          .then((userCredential) => {
            if (userCredential.user) {
              return { ...userCredential.user, isAdmin };
            }

            console.log("THIS SHOULD NOT BE LOGGED");
            return null;
          })
          .catch((error) => console.log(error));
      },
    }),
  ],
  // this might not be triggered if this auth not on the middleware
  callbacks: {
    // Called whenever session is checked
    async session({ session, token }) {
      session.user.isAdmin = !!(token.isAdmin as boolean);

      if (session?.user && token.sub) {
        session.user.id = token.sub;
      }

      return session;
    },
    // Called whenever jwt is created
    async jwt({ user, token }) {
      if (user) {
        // If user login using password set the user properties manually
        if (!user.id) {
          user.id = user.uid || "";
        }

        token.sub = user.id;
        token.isAdmin = user.isAdmin;
      }

      return token;
    },
  },
});
