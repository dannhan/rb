"use server";

import { revalidatePath } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect";
import { CredentialsSignin } from "next-auth";
import { signIn, signOut } from "@/auth";

import { projectSchema } from "@/config/schema";
import { postProjectFirebase } from "@/firebase/firestore/project";

export async function login(_: any, formData: FormData) {
  try {
    const password = formData.get("password");
    await signIn("credentials", { password, redirectTo: "/home" });

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

// todo: add more error handling, invalid data, server error, etc.
export async function createProjectAction(data: FormData) {
  data.append(
    "slug",
    encodeURI((data.get("title") as string).split(" ").join("-").toLowerCase()),
  );

  const formData = Object.fromEntries(data);
  const parsed = projectSchema.safeParse(formData);

  if (!parsed.success) {
    return { message: "An error occured", errors: parsed.error };
  }

  await postProjectFirebase(parsed.data);
  revalidatePath("/home");

  return { message: "Project has been created.", slug: parsed.data.slug };
}
