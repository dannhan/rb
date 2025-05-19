import { notFound } from "next/navigation";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { projectSchema } from "@/config/dataSchema";
import { projectRef } from "@/lib/firebase/utils";

import DashboardLayout from "@/components/Layouts/DashboardLayout";

type Props = React.PropsWithChildren<{ params: Promise<{ project: string }> }>;
export default async function Layout(props: Props) {
  const params = await props.params;

  const doc = await projectRef(params).get();
  const { success, data } = projectSchema.safeParse(doc.data());
  if (!success) return notFound();

  return (
    <NuqsAdapter>
      <DashboardLayout projectTitle={data.title}>
        {props.children}
      </DashboardLayout>
    </NuqsAdapter>
  );
}
