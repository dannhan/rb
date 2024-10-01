import { identitySchema, projectSchema } from "@/config/schema";
import { auth } from "@/auth";
import { fetchDoc, fetchMultipleDocs } from "@/lib/firebase/firestore";

import { DataTable } from "@/components/identity-table/identity-table";

//todo:
//1. add loading.tsx

type Props = {
  params: { project: string };
};

export default async function Page({ params }: Props) {
  const session = await auth();
  const admin = session?.user.isAdmin;

  const slug = params.project;

  // Fetch project
  const project = await fetchDoc({
    collectionName: "projects",
    docId: slug,
    zodSchema: projectSchema,
    errorMessage: "Error fetching data.",
  });

  // Fetch identity
  const identities = await fetchMultipleDocs({
    collectionName: "project-identities",
    ids: project?.identities || [],
    zodSchema: identitySchema,
    errorMessage: "Error fetching data.",
  });

  return (
    <div className="flex h-full min-h-screen flex-1 flex-col items-center space-y-8">
      <DataTable data={identities} slug={params.project} admin={admin} />
    </div>
  );
}
