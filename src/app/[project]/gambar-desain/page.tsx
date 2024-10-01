import { auth } from "@/auth";

import { projectSchema, fileSchema } from "@/config/schema";
import { fetchDoc, fetchMultipleDocs } from "@/lib/firebase/firestore";

import { DesignImagesCard } from "@/components/design-images-card";

type Props = {
  params: { project: string };
};

export default async function Page({ params }: Props) {
  const slug = params.project;
  const project = await fetchDoc({
    collectionName: "projects",
    docId: slug,
    zodSchema: projectSchema,
    errorMessage: "Error fetching the data.",
  });
  const designImages = await fetchMultipleDocs({
    collectionName: "project-files",
    ids: project?.designImages || [],
    zodSchema: fileSchema,
    errorMessage: "Error fetching the data.",
  });

  const session = await auth();
  const admin = session?.user.isAdmin;

  return (
    <DesignImagesCard
      designImages={designImages}
      slug={params.project}
      admin={admin}
    />
  );
}
