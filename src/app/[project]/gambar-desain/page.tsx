import { PlusCircleIcon } from "lucide-react";

import { auth } from "@/auth";

import type { WithId, DesignImageSubcategory, Attachment } from "@/types";
import {
  designImageSubcategorySchema,
  attachmentSchema,
} from "@/config/dataSchema";

import { db } from "@/lib/firebase/admin";
import { PROJECT_COLLECTION } from "@/lib/utils";

import CreateDesignImageSubcategoryForm from "@/components/Form/CreateDesignImageSubcategoryForm";
import DesignImagesCard from "@/components/Attachment/DesignImagesCard";
import EmptyData from "@/components/Common/EmptyData";

type Props = {
  params: { project: string };
};

export default async function Page({ params }: Props) {
  const designImageSubcategories: WithId<DesignImageSubcategory>[] = [];

  const ref = db
    .collection(PROJECT_COLLECTION)
    .doc(params.project)
    .collection("design-image-subcategories");
  const snapshot = await ref.orderBy("createAt").get();
  snapshot.docs.map((doc) => {
    const parsed = designImageSubcategorySchema.safeParse(doc.data());
    if (parsed.success)
      designImageSubcategories.push({ id: doc.id, title: parsed.data.title });
  });

  const session = await auth();
  const admin = session?.user?.isAdmin ?? false;

  return (
    <div className="space-y-6">
      <div className="mx-auto flex max-w-[750px] flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-semibold leading-none tracking-tight">
          Gambar Desain
        </h2>
        {admin && (
          <CreateDesignImageSubcategoryForm projectId={params.project} />
        )}
      </div>
      {/* fetch design images per category */}
      {designImageSubcategories.length === 0 && (
        <EmptyData
          className="mx-auto max-w-[750px] py-8"
          title="Belum Ada Kategori"
          description="Mulai dengan membuat kategori baru."
          form={<CreateDesignImageSubcategoryForm projectId={params.project} />}
        />
      )}
      {designImageSubcategories.map(async (category) => {
        const attachments: WithId<Attachment>[] = [];

        const ref = db
          .collection(PROJECT_COLLECTION)
          .doc(params.project)
          .collection("attachments");
        const snapshot = await ref.get();
        snapshot.docs.map((doc) => {
          const parsed = attachmentSchema.safeParse(doc.data());
          if (parsed.success) {
            const { createdAt, ...rest } = parsed.data; // Exclude 'createdAt'
            attachments.push({ id: doc.id, ...rest });
          }
        });

        return (
          <DesignImagesCard
            admin={admin}
            key={category.id}
            projectId={params.project}
            category={category}
            designImages={attachments}
          />
        );
      })}
    </div>
  );
}
