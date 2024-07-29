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
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          {children}
        </div>
      </div>
    </Dashboard>
  );
}
