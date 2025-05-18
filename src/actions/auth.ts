"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";

import { CredentialsSignin } from "next-auth";
import { signIn, signOut } from "@/auth";

// TODO: improve for handle any error like credential and timeout error
export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    await signIn("credentials", { email, password, redirectTo: "/home" });

    return { message: "" };
  } catch (error: unknown) {
    console.error(error);
    if (isRedirectError(error)) {
      throw error;
    }

    if (error instanceof CredentialsSignin) {
      return { message: "Incorrect password. Please try again." };
    }

    return { message: "Login failed" };
  }
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}
