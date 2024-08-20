import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ProjectCardProps = {
  project: {
    title: string;
    slug: string;
    type: string;
  };
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`${project.slug}/tim-pelaksana`} className="rounded-lg">
      <Card className="h-48 hover:bg-muted/25">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
          <CardTitle className="text-xl font-medium">
            {project.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm font-medium text-muted-foreground">
            {/* pemilihan-omega */}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

