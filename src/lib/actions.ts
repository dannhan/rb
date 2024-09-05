"use server";

import { revalidatePath } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect";
import { CredentialsSignin } from "next-auth";
import { signIn, signOut } from "@/auth";

import type { UploadedFile } from "@/types"
import { projectFormSchema, teamFormSchema } from "@/config/schema";

import { postProjectFirebase } from "@/firebase/firestore/project";
import { getTeamLengthBySlugFirebase, postTeamFirebase } from "@/firebase/firestore/team";
import { postDesignImageUrlFirebase } from "@/firebase/firestore/design-image";

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
    return { message: "Invalid data type.", errors: "Invalid type." };
  }

  const slug = encodeURI(parsed.data.title.split(" ").join("-").toLowerCase())

  await postProjectFirebase({
    slug,
    ...parsed.data,
  });
  revalidatePath("/home");

  return { message: "Project has been created.", slug };
}

// todo: implement this function
// todo: add more error handling, invalid data, server error, etc.
export async function createTeamAction(slug: string, team: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const formData = Object.fromEntries(team);
  const parsed = teamFormSchema.safeParse(formData);

  if (!parsed.success) {
    return { message: "Invalid data type.", errors: "Invalid type." };
  }

  try {
    const length = await getTeamLengthBySlugFirebase(slug);

    await postTeamFirebase(slug, { no: length + 1, ...parsed.data });
    return { message: "New data has been added." };
  } catch (error) {
    console.error("Error creating team:", error);
    return { message: "An error occured", errors: error };
  }
}

// todo: maybe add zod schema and type checking
export async function storeImagesUrlsAction(slug: string, designImages: UploadedFile[]) {
  try {
    await postDesignImageUrlFirebase(slug, designImages);

    return { message: "New images has been added." };
  } catch (error) {
    console.error("Error creating images:", error);
    throw new Error("Error creating images.");
  }
}