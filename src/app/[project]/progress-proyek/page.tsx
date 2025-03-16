import { auth } from "@/auth";

import { db } from "@/lib/firebase/admin";
import { PROJECT_COLLECTION } from "@/lib/utils";

import type { WithId, ProgressItem } from "@/types";
import { progressItemSchema } from "@/config/dataSchema";

import ProjectProgressPageClient from "./page-client";

type Props = {
  params: { project: string };
};

export default async function Page({ params }: Props) {
  const progress: WithId<ProgressItem>[] = [];

  const ref = db
    .collection(PROJECT_COLLECTION)
    .doc(params.project)
    .collection("progress")
    .orderBy("position");
  const snapshot = await ref.get();
  snapshot.docs.map((doc) => {
    const parsed = progressItemSchema.safeParse(doc.data());
    if (!parsed.success) return;

    progress.push({
      id: doc.id,
      ...parsed.data,
    });
  });

  const session = await auth();
  const admin = session?.user.isAdmin || false;

  return (
    <main className="mx-auto max-w-[750px] space-y-4">
      <ProjectProgressPageClient
        admin={admin}
        params={params}
        progress={progress}
      />
    </main>
  );
}
