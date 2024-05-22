"use server";

import { isRedirectError } from "next/dist/client/components/redirect";
import { CredentialsSignin } from "next-auth";
import { signIn, signOut } from "@/auth";

export async function login(_: any, formData: FormData) {
  try {
    const password = formData.get("password");
    await signIn("credentials", { password, redirectTo: "/blocks" });

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
