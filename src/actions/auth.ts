"use server";

import { isRedirectError } from "next/dist/client/components/redirect";

import { CredentialsSignin } from "next-auth";
import { signIn, signOut } from "@/auth";

// todos:
// 1. improve for handle any error like credential and timeout error

export async function login(_: { message: string }, formData: FormData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    console.log(email, password);

    await signIn("credentials", { email, password, redirectTo: "/home" });

    return { message: "" };
  } catch (error: any) {
    if (isRedirectError(error)) {
      throw error;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (error instanceof CredentialsSignin) {
      return { message: "Incorrect password. Please try again." };
    }
    return { message: "Login failed" };
  }
}

export async function logout(_: FormData) {
  await signOut({ redirectTo: "/" });
}
