import { auth } from "@/auth";

import { db } from "@/lib/firebase/admin";
import { PROJECT_COLLECTION } from "@/lib/utils";

import type { Attachment, AttachmentCategory } from "@/types";
import { attachmentSchema } from "@/config/dataSchema";

import ImageCard from "@/components/Attachment/ImageCard";
import SingleImageUploader from "@/components/Attachment/SingleImageUploader";

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

    const { name, size, type, key, url, appUrl, category } = parsed.data;
    attachments.push({ name, size, type, key, url, appUrl, category });
  });

  const session = await auth();
  const admin = session?.user?.isAdmin ?? false;

  return (
    <main className="mx-auto max-w-[750px] space-y-4">
      {attachments.map((attachment) => (
        <ImageCard key={attachment.key} attachment={attachment} />
      ))}
      {admin && (
        <SingleImageUploader
          projectId={params.project}
          category={"costRealization"}
        />
      )}
    </main>
  );
}
