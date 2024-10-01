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
  const projectSchedule = project?.projectSchedule
    ? await fetchDoc({
        collectionName: "project-files",
        docId: project?.projectSchedule,
        zodSchema: fileSchema,
        errorMessage: "Error fetching the data.",
      })
    : null;

  const session = await auth();
  const admin = session?.user.isAdmin;

  return (
    <BasicUploader
      storedFile={projectSchedule}
      slug={params.project}
      route="projectSchedule"
      admin={admin}
    />
  );
}
