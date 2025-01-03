import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

type ProjectCardProps = {
  project: {
    title: string;
    slug: string;
    type: string;
  };
  className?: string;
};

export function ProjectCard({ className, project }: ProjectCardProps) {
  return (
    <Link href={`${project.slug}/identitas-proyek`} className="rounded-lg">
      <Card
        className={cn(
          "h-20 border-none shadow-[0px_1px_2px_.75px_#00000024] transition-colors hover:bg-accent lg:h-full",
          className,
        )}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 lg:p-6">
          <CardTitle className="text-base font-medium lg:text-lg">
            {project.title}
          </CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
}
