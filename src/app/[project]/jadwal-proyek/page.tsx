import { getProjectScheduleBySlugFirebase } from "@/firebase/firestore/project-schedule";
import { Uploader } from "@/components/uploader";

type Props = {
  params: { project: string };
};

export default async function Page({ params }: Props) {
  const projectSchedule = await getProjectScheduleBySlugFirebase(
    params.project,
  );

  return <Uploader projectSchedule={projectSchedule} slug={params.project} />;
}
