import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        password: {},
      },
      async authorize(credentials) {
        const { password } = credentials;

        if (password === "admin") {
          return {}
        }

        return null;
      },
    }),
  ],
});
