import { notFound } from "next/navigation";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { projectSchema } from "@/config/dataSchema";
import { projectRef } from "@/lib/firebase/utils";

import NewDashboardLayout from "@/components/Layouts/NewDashboardLayout";

type Props = React.PropsWithChildren<{ params: Promise<{ project: string }> }>;
export default async function Layout(props: Props) {
  const params = await props.params;

  const doc = await projectRef(params).get();
  const { success, data } = projectSchema.safeParse(doc.data());
  if (!success) return notFound();

  return (
    <NuqsAdapter>
      <NewDashboardLayout projectTitle={data.title}>
        {props.children}
      </NewDashboardLayout>
    </NuqsAdapter>
  );
}
