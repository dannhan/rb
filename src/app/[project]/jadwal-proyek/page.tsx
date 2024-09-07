import { getProjectScheduleBySlugFirebase } from "@/firebase/firestore/project-schedule";
import { Uploader } from "@/components/uploader";

type Props = {
  params: { project: string };
};

export default async function Page({ params }: Props) {
  const pic = await getProjectScheduleBySlugFirebase(params.project);

  return <Uploader projectSchedule={pic} slug={params.project} />;
}
