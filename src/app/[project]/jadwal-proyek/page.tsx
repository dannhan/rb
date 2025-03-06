import { auth } from "@/auth";

import { db } from "@/lib/firebase/admin";
import { PROJECT_COLLECTION } from "@/lib/utils";

import type { AttachmentCategory } from "@/types";
import { attachmentSchema } from "@/config/dataSchema";

import ImageCard from "@/components/Attachment/ImageCard";
import SingleImageUploader from "@/components/Attachment/SingleImageUploader";

type Props = {
  params: { project: string };
};

export default async function Page({ params }: Props) {
  const ref = db
    .collection(PROJECT_COLLECTION)
    .doc(params.project)
    .collection("attachments");
  const snapshot = await ref
    .where("category", "==", "projectSchedule" satisfies AttachmentCategory)
    .get();

  const attachment = snapshot.empty
    ? null
    : (attachmentSchema.safeParse(snapshot.docs[0].data()).data ?? null);

  const session = await auth();
  const admin = session?.user?.isAdmin ?? false;

  return (
    <main className="mx-auto max-w-[750px] space-y-4">
      {attachment ? (
        <ImageCard attachment={attachment} />
      ) : (
        <SingleImageUploader
          projectId={params.project}
          category={"projectSchedule"}
        />
      )}
    </main>
  );
}
