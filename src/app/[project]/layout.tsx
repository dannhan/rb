import { notFound } from "next/navigation";

import { getProjects } from "@/lib/mocks";

import { projectConfig } from "@/config/project";
import { Dashboard } from "@/components/dashboard";

type Props = {
  children: React.ReactNode;
  params: { project: string };
};

export default async function Layout({ children, params }: Props) {
  const projects = await getProjects();
  const project = projects.find((project) => project.slug === params.project);

  if (!project) return notFound();

  return (
    <Dashboard items={projectConfig.sidebarItems} projectTitle={project.title}>
      {children}
    </Dashboard>
  );
}
