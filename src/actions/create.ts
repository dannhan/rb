"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { FieldValue } from "firebase-admin/firestore";

import type { Project, Identity, Team } from "@/types";
import { projectSchema, identitySchema, teamSchema } from "@/config/schema";

import { createDoc, updateDoc } from "@/lib/firebase/firestore";
import { nanoid } from "@/lib/nanoid";

export async function createProjectAction(
  values: Pick<Project, "title" | "type">,
) {
  const parsed = projectSchema.pick({ title: true, type: true }).parse(values);
  const slug = encodeURI(parsed.title.split(" ").join("-").toLowerCase());

  await createDoc({
    collectionName: "projects",
    errorMessage: "Error adding new project.",
    data: { ...parsed, slug },
    docId: slug,
  });

  revalidatePath("/home");
  redirect(`/${slug}/identitas-proyek`);
}

export async function createIdentityAction(
  values: Pick<Identity, "field" | "value" | "slug">,
) {
  const parsed = identitySchema
    .pick({ field: true, value: true, slug: true })
    .parse(values);

  const id = nanoid();

  await Promise.all([
    createDoc({
      docId: id,
      collectionName: "project-identities",
      errorMessage: "Error adding new data.",
      data: parsed,
    }),
    updateDoc({
      docId: values.slug,
      collectionName: "projects",
      errorMessage: "Error adding new data.",
      data: { identities: FieldValue.arrayUnion(id) },
    }),
  ]);

  revalidatePath(`${values.slug}/tim-pelaksana`);
}

export async function createTeamAction(
  values: Pick<Team, "pekerjaan" | "spk" | "pelaksana" | "slug">,
) {
  const parsed = teamSchema
    .pick({
      pekerjaan: true,
      spk: true,
      pelaksana: true,
      status: true,
      slug: true,
    })
    .parse({ ...values, status: "On Progress" });

  const id = nanoid();

  await Promise.all([
    createDoc({
      docId: id,
      collectionName: "project-teams",
      errorMessage: "Error adding new data.",
      data: parsed,
    }),
    updateDoc({
      docId: values.slug,
      collectionName: "projects",
      errorMessage: "Error adding new data.",
      data: { teams: FieldValue.arrayUnion(id) },
    }),
  ]);

  revalidatePath(`${values.slug}/tim-pelaksana`);
}
