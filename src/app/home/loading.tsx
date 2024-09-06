import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/blocks/header";
import { ModeToggle } from "@/components/blocks/mode-toggle";
import { ProjectListCommandDialog } from "@/components/project-list-command-dialog";
import { ProjectCardsListSkeleton } from "@/components/project-cards-list-skeleton";

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header className="border-none bg-background text-muted-foreground shadow-md">
        <h1 className="text-lg font-semibold md:text-xl">Ria Busana</h1>
        <div className="flex items-center gap-2">
          <ProjectListCommandDialog
            konstruksiProjects={[]}
            renovasiProjects={[]}
          />
          <ModeToggle />
        </div>
      </Header>

      <main className="flex flex-col items-center gap-4 p-4 md:flex-1 lg:p-6 lg:pb-10">
        <ProjectCardsListSkeleton type="konstruksi" />
        <Separator className="my-2 w-full max-w-screen-lg 2xl:max-w-screen-xl" />
        <ProjectCardsListSkeleton type="renovasi" />
      </main>
    </div>
  );
}
