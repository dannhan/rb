import { z } from "zod";

import { Team } from "@/types";
import { teamSchema, projectSchema, fileSchema } from "@/config/schema";

import { auth } from "@/auth";
import { fetchDoc, fetchMultipleDocs } from "@/lib/firebase/firestore";

import { DataTable } from "@/components/team-table/team-table";

type Props = {
  params: { project: string };
};

export default async function Page({ params }: Props) {
  const session = await auth();
  const admin = session?.user.isAdmin;

  const slug = params.project;
  const team = await fetchProjectData(slug);

  return (
    <div className="flex h-full flex-1 flex-col space-y-8">
      <DataTable data={team} slug={params.project} admin={admin} />
    </div>
  );
}

async function fetchProjectData(slug: string): Promise<Team[]> {
  // Fetch project
  const project = await fetchDoc({
    collectionName: "projects",
    docId: slug,
    zodSchema: projectSchema,
    errorMessage: "Error fetching project data.",
  });

  // Fetch teams
  const teams = await fetchMultipleDocs({
    collectionName: "project-teams",
    ids: project?.teams || [],
    zodSchema: teamSchema.merge(z.object({ file: z.string().optional() })),
    errorMessage: "Error fetching team data.",
  });

  // Extract file IDs and fetch files
  const fileIds = teams.map((team) => team.file).filter((f) => f !== undefined);
  const files = await fetchMultipleDocs({
    collectionName: "project-files",
    ids: fileIds,
    zodSchema: fileSchema,
    errorMessage: "Error fetching file data.",
  });

  // Create a map of file IDs to file data
  const fileMap = new Map(files.map((file) => [file.key, file]));

  // Combine teams with their corresponding files
  const teamsWithFiles = teams.map((team) => {
    return {
      ...team,
      file: team.file ? fileMap.get(team.file) : undefined,
    };
  });

  return teamsWithFiles;
}
