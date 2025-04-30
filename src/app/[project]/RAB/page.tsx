import { auth } from "@/auth";

import { db } from "@/lib/firebase/admin";
import { PROJECT_COLLECTION } from "@/lib/utils";

import type { Attachment, AttachmentCategory } from "@/types";
import { attachmentSchema } from "@/config/dataSchema";

import ImageCard from "@/components/Attachment/ImageCard";
import SingleImageUploader from "@/components/Attachment/SingleImageUploader";
import EmptyData from "@/components/Common/EmptyData";

type Props = {
  params: { project: string };
};

export default async function Page({ params }: Props) {
  const attachments: Attachment[] = [];

  const ref = db
    .collection(PROJECT_COLLECTION)
    .doc(params.project)
    .collection("attachments");
  const snapshot = await ref
    .where("category", "==", "rabFile" satisfies AttachmentCategory)
    .orderBy("createdAt", "desc")
    .get();

  snapshot.docs.forEach((doc) => {
    const parsed = attachmentSchema.safeParse(doc.data());
    if (!parsed.success) return;

    attachments.push(parsed.data);
  });

  const session = await auth();
  const admin = session?.user?.isAdmin ?? false;

  return (
    <main className="mx-auto max-w-[750px] space-y-4">
      {attachments.map((attachment) => (
        <ImageCard key={attachment.key} admin={admin} attachment={attachment} />
      ))}
      {admin ? (
        <SingleImageUploader projectId={params.project} category={"rabFile"} />
      ) : (
        attachments.length === 0 && (
          <EmptyData
            admin={admin}
            className="mx-auto max-w-[750px] py-8"
            title="Belum Ada RAB"
            description="Silakan periksa kembali nanti untuk pembaruan."
          />
        )
      )}
    </main>
  );
}
