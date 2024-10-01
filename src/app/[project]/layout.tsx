import { notFound } from "next/navigation";

import { projectSchema } from "@/config/schema";
import { projectConfig } from "@/config/project";
import { fetchDoc } from "@/lib/firebase/firestore";

import { Dashboard } from "@/layouts/dashboard";

type Props = {
  children: React.ReactNode;
  params: { project: string };
};

export default async function Layout({ children, params }: Props) {
  const slug = params.project;
  const project = await fetchDoc({
    collectionName: "projects",
    docId: slug,
    zodSchema: projectSchema,
    errorMessage: "Error fetching data.",
  });

  if (!project) return notFound();

  return (
    <Dashboard items={projectConfig.sidebarItems} projectTitle={project.title}>
      {children}
    </Dashboard>
  );
}
