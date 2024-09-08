import { notFound } from "next/navigation";

import { getProjectBySlugFirebase } from "@/firebase/firestore/project";

import { projectConfig } from "@/config/project";
import { Dashboard } from "@/layouts/dashboard";

type Props = {
  children: React.ReactNode;
  params: { project: string };
};

export default async function Layout({ children, params }: Props) {
  const project = await getProjectBySlugFirebase(params.project);

  if (!project) return notFound();

  return (
    <Dashboard items={projectConfig.sidebarItems} projectTitle={project.title}>
      {children}
    </Dashboard>
  );
}
