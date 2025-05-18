import { db } from "@/lib/firebase/admin";
import { PROJECT_COLLECTION } from "@/lib/utils";

import type { WithId, Project } from "@/types";
import { projectSchema } from "@/config/dataSchema";

import { Header } from "@/layouts/header";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/logo";
import { HomeLogoutForm } from "@/components/logout-form";
import ThemeToggle from "@/components/Common/ThemeToggle";
import ProjectSearchDialog from "@/components/Home/ProjectSearchDialog";
import ProjectCardsList from "@/components/Home/ProjectCardsList";

export default async function Page() {
  const projects: {
    konstruksi: WithId<Project>[];
    renovasi: WithId<Project>[];
  } = { konstruksi: [], renovasi: [] };

  const ref = db
    .collection(PROJECT_COLLECTION)
    .orderBy("createdAt", "desc")
    .select("title", "type", "createdAt");
  const snapshot = await ref.get();
  snapshot.docs.forEach((doc) => {
    const parsed = projectSchema.safeParse(doc.data());
    if (!parsed.success) return;

    projects[parsed.data.type].push({ id: doc.id, ...parsed.data });
  });

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header className="border-none bg-background text-muted-foreground shadow-md">
        <Logo />
        <div className="flex items-center gap-2">
          <ProjectSearchDialog projects={projects} />
          <ThemeToggle />
          <HomeLogoutForm />
        </div>
      </Header>
      <main className="mx-auto flex w-full max-w-screen-xl flex-col items-center gap-4 p-4 md:flex-1 lg:p-6 lg:pb-10">
        <ProjectCardsList type="konstruksi" projects={projects.konstruksi} />
        <Separator className="my-2 w-full" />
        <ProjectCardsList type="renovasi" projects={projects.renovasi} />
      </main>
    </div>
  );
}
