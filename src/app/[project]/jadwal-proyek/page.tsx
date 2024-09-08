import { getProjectScheduleBySlugFirebase } from "@/firebase/firestore/project-schedule";
import { BasicUploader } from "@/components/basic-uploader";

type Props = {
  params: { project: string };
};

export default async function Page({ params }: Props) {
  const projectSchedule = await getProjectScheduleBySlugFirebase(
    params.project,
  );

  return <BasicUploader projectSchedule={projectSchedule} slug={params.project} />;
}
