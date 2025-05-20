import { auth } from "@/auth";

import { projectRef } from "@/lib/firebase/utils";

import type { WithId, TeamMember } from "@/types";
import { teamMemberSchema } from "@/config/dataSchema";

import { RoleProvider } from "@/components/Providers/UserRoleProvider";
import { TeamProvider } from "@/components/Providers/TeamProvider";
import PageContent from "@/components/Layouts/PageContent";
import TeamTable from "@/components/Tables/TeamTable/TeamTable";

type Props = { params: Promise<{ project: string }> };
export default async function Page(props: Props) {
  const params = await props.params;
  const team: WithId<TeamMember>[] = [];

  const ref = projectRef(params).collection("teams").orderBy("position");
  const snapshot = await ref.get();
  snapshot.docs.forEach((doc) => {
    const parsed = teamMemberSchema.safeParse(doc.data());
    if (!parsed.success) return;
    team.push({ id: doc.id, ...parsed.data });
  });

  return (
    <RoleProvider role={(await auth())?.user.role}>
      <TeamProvider initialTeam={team}>
        <PageContent title="Tim Pelaksana">
          <TeamTable />
        </PageContent>
      </TeamProvider>
    </RoleProvider>
  );
}
