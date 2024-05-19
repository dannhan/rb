"use server";

import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function login(formData: FormData) {
  try {
    const password = formData.get("password");
    await signIn("credentials", { password, redirectTo: "/home" });
  } catch (error: any) {
    if (isRedirectError(error)) {
      throw error;
    }

    console.log(error.message);
  }
}

export async function logout(_: FormData) {
  await signOut({ redirectTo: "/" });
}
