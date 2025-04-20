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
  const session = await auth();
  const admin = session?.user.isAdmin || false;

  const ref = db
    .collection(PROJECT_COLLECTION)
    .doc(params.project)
    .collection("progress")
    .orderBy("position");
  const snapshot = await ref.get();

  const progress: WithId<ProgressItem>[] = [];
  snapshot.docs.map((doc) => {
    const parsed = progressItemSchema.safeParse(doc.data());
    if (!parsed.success) return;

    delete parsed.data.attachment?.before?.createdAt;
    delete parsed.data.attachment?.after?.createdAt;

    progress.push({
      id: doc.id,
      ...parsed.data,
    });
  });

  // NOTE: it only depend on the first item of progress, check for bugs
  const firstProgressWeekKeys = Object.keys(progress[0]?.progress || {});
  const firstProgressWeekKeysLastItemWeekNumber = parseInt(
    firstProgressWeekKeys[firstProgressWeekKeys.length - 1]?.split("_")[0],
  );

  // TODO: check again
  return (
    <main className="mx-auto max-w-[881.65px] space-y-4">
      <ProjectProgressPageClient
        admin={admin}
        params={params}
        progress={progress}
        weekKeys={firstProgressWeekKeys}
        latestWeekNumber={firstProgressWeekKeysLastItemWeekNumber}
      />
    </main>
  );
}
