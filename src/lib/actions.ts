"use server";

import { revalidatePath } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect";

import { CredentialsSignin } from "next-auth";
import { signIn, signOut } from "@/auth";

import { StoredImage } from "@/types";
import {
  identityFormSchema,
  projectFormSchema,
  teamFormSchema,
  teamSchema,
} from "@/config/schema";

import { UTApi } from "uploadthing/server";
import { postProjectFirebase } from "@/firebase/firestore/project";
import {
  postTeamFirebase,
  getTeamLengthBySlugFirebase,
  deleteTeamBySlugAndNoFirebase,
  updateTeamCheckedBySlugAndNoFirebase,
  updateTeamBySlugAndNoFirebase,
  updateTeamCheckedBySlugBatchFirebase,
} from "@/firebase/firestore/team";
import {
  deleteDesignImagesIdFirebase,
  deleteDesignImageByIdFirebase,
} from "@/firebase/firestore/design-image";
import { deleteProjectScheduleBySlugAndIdFirebase } from "@/firebase/firestore/project-schedule";
import { deleteCostRealizationBySlugAndIdFirebase } from "@/firebase/firestore/cost-realization";
import {
  getIdentitesLengthBySlugFirebase,
  postIdentityFirebase,
  deleteIdentityBySlugAndNoFirebase,
} from "@/firebase/firestore/identity";

// todo
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

// todo: add more error handling, invalid data, server error, etc.
export async function createProjectAction(data: FormData) {
  const formData = Object.fromEntries(data);
  const parsed = projectFormSchema.safeParse(formData);

  if (!parsed.success) {
    return { message: "Invalid data type.", errors: "Invalid type." };
  }

  const slug = encodeURI(parsed.data.title.split(" ").join("-").toLowerCase());

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

export async function createIdentityAction(slug: string, identity: FormData) {
  const formData = Object.fromEntries(identity);
  const parsed = identityFormSchema.safeParse(formData);

  if (!parsed.success) {
    return { message: "Invalid data type.", errors: "Invalid type." };
  }

  try {
    const length = await getIdentitesLengthBySlugFirebase(slug);

    await postIdentityFirebase(slug, { no: length + 1, ...parsed.data });
    return { message: "New data has been added." };
  } catch (error) {
    console.error("Error creating identity:", error);
    return { message: "An error occured", errors: error };
  }
}

export async function updateTeamCheckedAction(
  slug: string,
  no: number,
  checked: boolean,
) {
  try {
    await updateTeamCheckedBySlugAndNoFirebase(slug, no, checked);
  } catch (error) {
    console.error("Error updating team:", error);
    throw new Error("Error updating team.");
  }
}

export async function updateTeamCheckedBatchAction(
  slug: string,
  value: boolean,
) {
  try {
    await updateTeamCheckedBySlugBatchFirebase(slug, value);
  } catch (error) {
    console.error("Error updating team:", error);
    throw new Error("Error updating team.");
  }
}

export async function updateTeamAction(
  slug: string,
  no: number,
  checked: boolean,
  team: FormData,
) {
  const formData = Object.fromEntries(team);
  const parsed = teamSchema.safeParse({
    ...formData,
    no,
    checked,
  });

  if (!parsed.success) {
    console.log(parsed.error.message);
    return { message: "Invalid data type.", errors: "Invalid type." };
  }

  try {
    await updateTeamBySlugAndNoFirebase(slug, parsed.data);
    return { message: "Data has been updated." };
  } catch (error) {
    console.error("Error updating team:", error);
    return { message: "An error occured", errors: error };
  }
}

export async function deleteTeamAction(slug: string, no: number) {
  try {
    await deleteTeamBySlugAndNoFirebase(slug, no);
  } catch (error) {
    console.error("Error deleting team:", error);
    throw new Error("Error deleting data.");
  }
}

export async function deleteIdentityAction(slug: string, no: number) {
  try {
    await deleteIdentityBySlugAndNoFirebase(slug, no);
  } catch (error) {
    console.error("Error deleting identity:", error);
    throw new Error("Error deleting data.");
  }
}

// todo: error handling
export async function deleteDesignImageAction(
  slug: string,
  file: StoredImage,
): Promise<void> {
  const utapi = new UTApi();

  if (!file.customId) {
    throw new Error("customId is required.");
  }

  await Promise.all([
    utapi.deleteFiles([file.key]),
    deleteDesignImagesIdFirebase(slug, file.customId),
    deleteDesignImageByIdFirebase(slug, file.customId),
  ]);
}

// todo: error handling
export async function deleteProjectScheduleAction(
  slug: string,
  id: string | null,
) {
  if (!id) {
    throw new Error("id is required.");
  }

  await deleteProjectScheduleBySlugAndIdFirebase(slug, id);
}

export async function deleteCostRealizationAction(
  slug: string,
  id: string | null,
) {
  if (!id) {
    throw new Error("id is required.");
  }

  await deleteCostRealizationBySlugAndIdFirebase(slug, id);
}
