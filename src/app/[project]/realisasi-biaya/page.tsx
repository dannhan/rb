import { projectSchema, fileSchema } from "@/config/schema";
import { auth } from "@/auth";
import { fetchDoc } from "@/lib/firebase/firestore";

import { BasicUploader } from "@/components/basic-uploader";

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
  const costRealization = project?.costRealization
    ? await fetchDoc({
        collectionName: "project-files",
        docId: project?.costRealization,
        zodSchema: fileSchema,
        errorMessage: "Error fetching the data.",
      })
    : null;

  const session = await auth();
  const admin = session?.user.isAdmin;

  return (
    <BasicUploader
      storedFile={costRealization}
      slug={params.project}
      route="costRealization"
      admin={admin}
    />
  );
}
