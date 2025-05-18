import { notFound } from "next/navigation";

import { projectSchema } from "@/config/dataSchema";
import { projectConfig } from "@/config/project";

import { db } from "@/lib/firebase/admin";
import { PROJECT_COLLECTION } from "@/lib/utils/constants";

import { Dashboard } from "@/layouts/dashboard";

type Props = {
  children: React.ReactNode;
  params: Promise<{ project: string }>;
};

export default async function Layout(props: Props) {
  const params = await props.params;

  const { children } = props;

  const ref = db.collection(PROJECT_COLLECTION).doc(params.project);
  const doc = await ref.get();

  const parsed = projectSchema.safeParse(doc.data());
  if (!parsed.success) return notFound();

  return (
    <Dashboard
      items={projectConfig.sidebarItems}
      projectTitle={parsed.data.title}
    >
      {children}
    </Dashboard>
  );
}
