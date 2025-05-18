import { auth } from "@/auth";

import type { WithId, Identity } from "@/types";
import { identitySchema } from "@/config/dataSchema";
import { projectRef } from "@/lib/firebase/utils";

import { RoleProvider } from "@/components/Providers/UserRoleProvider";
import { IdentitiesProvider } from "@/components/Providers/IdentityProvider";
import IdentityTable from "@/components/Tables/IdentityTable/IdentityTable";

type Props = { params: Promise<{ project: string }> };
export default async function Page(props: Props) {
  const params = await props.params;
  const identities: WithId<Identity>[] = [];

  const ref = projectRef(params).collection("identities").orderBy("position");
  const snapshot = await ref.get();
  snapshot.docs.forEach((doc) => {
    const parsed = identitySchema.safeParse(doc.data());
    if (!parsed.success) return;
    identities.push({ id: doc.id, ...parsed.data });
  });

  return (
    <RoleProvider role={(await auth())?.user.role}>
      <IdentitiesProvider initialIdentities={identities}>
        <IdentityTable />
      </IdentitiesProvider>
    </RoleProvider>
  );
}
