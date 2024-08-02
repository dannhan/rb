import { notFound } from "next/navigation";
import { projectConfig } from "@/config/project";
import { Dashboard } from "@/components/dashboard";

const projects = ["banjar", "kediri", "semarang"];

type Props = {
  children: React.ReactNode;
  params: { project: string };
};

export default function Layout({ children, params }: Props) {
  if (!projects.includes(params.project)) return notFound();

  return (
    <Dashboard items={projectConfig.sidebarItems}>
      {children}
    </Dashboard>
  );
}
