import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { User } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "@/lib/firebase/client";

// TODO: this is..., idk what to say
export const { auth, handlers, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        const { email, password } = credentials as Record<
          "email" | "password",
          string
        >;
        const role = email === "admin@gmail.com" ? "admin" : "manager";

        return await signInWithEmailAndPassword(firebaseAuth, email, password)
          .then((userCredential) => {
            if (userCredential.user) {
              return { ...userCredential.user, role };
            }

            return null;
          })
          .catch((error) => {
            console.log(error);
            return null;
          });
      },
    }),
  ],
  // this might not be triggered if this auth not on the middleware
  callbacks: {
    // Called whenever session is checked
    async session({ session, token }) {
      session.user.role = token.role as "admin" | "manager";

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
        token.role = user.role;
      }

      return token;
    },
  },
});
