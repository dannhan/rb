"use server";

import { revalidatePath } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect";
import { CredentialsSignin } from "next-auth";
import { signIn, signOut } from "@/auth";

import { projectFormSchema } from "@/config/schema";
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
  const formData = Object.fromEntries(data);
  const parsed = projectFormSchema.safeParse(formData);

  if (!parsed.success) {
    return { message: "An error occured", errors: "Invalid type." };
  }

  const slug = encodeURI(parsed.data.title.split(" ").join("-").toLowerCase())

  await postProjectFirebase({
    slug,
    ...parsed.data,
  });
  revalidatePath("/home");

  return { message: "Project has been created.", slug };
}
