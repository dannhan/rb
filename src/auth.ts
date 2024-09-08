import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { auth, handlers, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        password: {},
      },

      /* todo:
       - implement proper auth using hash and salt and save the password to db
       - read the docs to clarify, should it throw an error if the password is incorrect
      */
      async authorize(credentials) {
        const { password } = credentials;

        if (password === "admin") {
          return {};
        }

        return null;
      },
    }),
  ],
});
