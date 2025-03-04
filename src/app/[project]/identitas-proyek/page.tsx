import { auth } from "@/auth";

import { db } from "@/lib/firebase/admin";
import { PROJECT_COLLECTION } from "@/lib/utils";

import type { WithId, Identity } from "@/types";
import { identitySchema } from "@/config/schema";

import IdentityTable from "@/components/IdentityTable/IdentityTable";

// TODO: add loading.tsx
type Props = { params: { project: string } };
export default async function Page({ params }: Props) {
  const identities: WithId<Identity>[] = [];

  const ref = db
    .collection(PROJECT_COLLECTION)
    .doc(params.project)
    .collection("identities")
    .orderBy("no");
  const snapshot = await ref.get();
  snapshot.docs.map((doc) => {
    const parsed = identitySchema.safeParse(doc.data());
    if (!parsed.success) return;

    identities.push({ id: doc.id, ...parsed.data });
  });

  const session = await auth();
  const admin = session?.user.isAdmin || false;

  return (
    <main className="flex h-full min-h-screen flex-1 flex-col items-center space-y-8">
      <IdentityTable data={identities} admin={admin} />
    </main>
  );
}
