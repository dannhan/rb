import { projectConfig } from "@/config/project";
import { Dashboard } from "@/components/dashboard";

type Props = {
  children: React.ReactNode;
  params: { project: string };
};

export default async function Layout({ children }: Props) {
  return (
    <Dashboard items={projectConfig.sidebarItems} projectTitle={"anjay"}>
      {children}
    </Dashboard>
  );
}
