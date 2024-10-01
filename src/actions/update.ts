"use server";

import { revalidatePath } from "next/cache";

import type { Identity, Team } from "@/types";
import { identitySchema, teamSchema } from "@/config/schema";
import { updateDoc } from "@/lib/firebase/firestore";

export async function updateIdentityAction(values: Identity) {
  const parsed = identitySchema
    .pick({ id: true, field: true, value: true, slug: true })
    .parse(values);

  await updateDoc({
    docId: values.id,
    collectionName: "project-identities",
    errorMessage: "Error editing the data.",
    data: parsed,
  });

  revalidatePath(`${values.slug}/tim-pelaksana`);
}

export async function updateTeamAction(
  values: Pick<Team, "id" | "pekerjaan" | "spk" | "pelaksana" | "slug">,
) {
  const parsed = teamSchema
    .pick({
      pekerjaan: true,
      spk: true,
      pelaksana: true,
    })
    .parse(values);

  await updateDoc({
    docId: values.id,
    collectionName: "project-teams",
    errorMessage: "Error editing the data.",
    data: parsed,
  });

  revalidatePath(`${values.slug}/tim-pelaksana`);
}

export async function updateTeamStatusAction(
  data: Pick<Team, "id" | "slug" | "status">,
) {
  await updateDoc({
    docId: data.id,
    collectionName: "project-teams",
    errorMessage: "Error editing the data.",
    data: {
      status: data.status,
    },
  });

  revalidatePath(`${data.slug}/tim-pelaksana`);
}
