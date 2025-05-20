import { auth } from "@/auth";

import { progressItemSchema, progressWeekSchema } from "@/config/dataSchema";
import { projectRef } from "@/lib/firebase/utils";
import { parseCollection } from "@/lib/utils/parse-collection";

import { RoleProvider } from "@/components/Providers/UserRoleProvider";
import { ProgressItemsProvider } from "@/components/Providers/ProgressItemsProvider";
import { ProgressWeeksProvider } from "@/components/Providers/ProgressWeeksProvider";
import PageContent from "@/components/Layouts/PageContent";
import ProgressTable from "@/components/Tables/ProgressTable/ProgressTable";

type Props = { params: Promise<{ project: string }> };
export default async function Page(props: Props) {
  const params = await props.params;

  const [weeksSnap, itemsSnap] = await Promise.all([
    projectRef(params).collection("progress-weeks").orderBy("weekCount").get(),
    projectRef(params).collection("progress-items").orderBy("position").get(),
  ]);

  const weeks = parseCollection(weeksSnap, progressWeekSchema);
  const items = parseCollection(itemsSnap, progressItemSchema);

  return (
    <RoleProvider role={(await auth())?.user.role}>
      <ProgressWeeksProvider initialWeeks={weeks}>
        <ProgressItemsProvider initialItems={items}>
          <ProgressTable />
        </ProgressItemsProvider>
      </ProgressWeeksProvider>
    </RoleProvider>
  );
}
