import { auth } from "@/auth";

import { db } from "@/lib/firebase/admin";
import { PROJECT_COLLECTION } from "@/lib/utils";

import type { WithId, ProgressItem, ProgressWeek } from "@/types";
import { progressItemSchema, progressWeekSchema } from "@/config/dataSchema";

import ProgressTable from "@/components/ProgressTable/ProgressTable";
import { ProgressItemsProvider } from "@/components/Providers/ProgressItemsContext";
import { ProgressWeeksProvider } from "@/components/Providers/ProgressWeeksContext";

type Props = {
  params: { project: string };
};

export default async function Page({ params }: Props) {
  const session = await auth();
  const admin = session?.user.isAdmin || false;

  const projectRef = db.collection(PROJECT_COLLECTION).doc(params.project);

  const items: WithId<ProgressItem>[] = [];
  const itemsRef = projectRef.collection("progress-items").orderBy("position");
  const itemsSnap = await itemsRef.get();
  itemsSnap.docs.map((doc) => {
    const parsed = progressItemSchema.safeParse(doc.data());
    if (!parsed.success) return;

    items.push({ id: doc.id, ...parsed.data });
  });
  const weeks: WithId<ProgressWeek>[] = [];
  const weeksRef = projectRef.collection("progress-weeks").orderBy("weekCount");
  const weeksSnap = await weeksRef.get();
  weeksSnap.docs.map((doc) => {
    const parsed = progressWeekSchema.safeParse(doc.data());
    if (!parsed.success) return;

    weeks.push({ id: doc.id, ...parsed.data });
  });

  return (
    <ProgressWeeksProvider initialWeeks={weeks}>
      <ProgressItemsProvider initialItems={items}>
        {/* using weird value for width so that the week column looks nice */}
        <main className="mx-auto max-w-[881.65px] space-y-4">
          <ProgressTable admin={admin} />
        </main>
      </ProgressItemsProvider>
    </ProgressWeeksProvider>
  );
}
