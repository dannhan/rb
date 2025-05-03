import { auth } from "@/auth";

import { db } from "@/lib/firebase/admin";
import { PROJECT_COLLECTION } from "@/lib/utils";

import type { WithId, TeamMember } from "@/types";
import { teamMemberSchema } from "@/config/dataSchema";

import TeamTable from "@/components/TeamTable/TeamTable";
type Props = {
  params: { project: string };
};

export default async function Page({ params }: Props) {
  const team: WithId<TeamMember>[] = [];

  const ref = db
    .collection(PROJECT_COLLECTION)
    .doc(params.project)
    .collection("teams")
    .orderBy("position");
  const snapshot = await ref.get();
  snapshot.docs.map((doc) => {
    const parsed = teamMemberSchema.safeParse(doc.data());
    if (!parsed.success) return;

    team.push({ id: doc.id, ...parsed.data });
  });

  const session = await auth();
  const admin = session?.user.isAdmin || false;

  return (
    <div className="flex h-full flex-1 flex-col space-y-8">
      <TeamTable data={team} admin={admin} />
    </div>
  );
}
