import { getProjectScheduleBySlugFirebase } from "@/firebase/firestore/project-schedule";
import { BasicUploader } from "@/components/basic-uploader";

type Props = {
  params: { project: string };
};

export default async function Page({ params }: Props) {
  const projectSchedule = await getProjectScheduleBySlugFirebase(
    params.project,
  );

  return (
    <BasicUploader
      storedFile={projectSchedule}
      slug={params.project}
      endpoint="projectSchedule"
    />
  );
}
