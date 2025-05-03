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
    .where("category", "==", "costRealization" satisfies AttachmentCategory)
    .orderBy("createdAt", "desc")
    .get();

  snapshot.docs.map((doc) => {
    const parsed = attachmentSchema.safeParse(doc.data());
    if (!parsed.success) return;

    attachments.push(parsed.data);
  });

  const session = await auth();
  const admin = session?.user?.isAdmin ?? false;

  return (
    <div className="space-y-4">
      {attachments.map((attachment) => (
        <ImageCard key={attachment.key} admin={admin} attachment={attachment} />
      ))}
      {admin ? (
        <SingleImageUploader
          projectId={params.project}
          category={"costRealization"}
        />
      ) : (
        attachments.length === 0 && (
          <EmptyData
            admin={admin}
            className="py-8"
            title="Belum Ada Realisasi Biaya"
            description="Silakan periksa kembali nanti untuk pembaruan."
          />
        )
      )}
    </div>
  );
}
