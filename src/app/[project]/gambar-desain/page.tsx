import { PlusCircleIcon } from "lucide-react";

import { auth } from "@/auth";

import type { WithId, DesignImageSubcategory, Attachment } from "@/types";
import {
  designImageSubcategorySchema,
  attachmentSchema,
} from "@/config/dataSchema";

import { db } from "@/lib/firebase/admin";
import { PROJECT_COLLECTION } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { WithDialog } from "@/components/with-dialog";

import { CreateDesignImageCategoryForm } from "@/components/create-design-image-category-form";
import { DesignImagesCard } from "@/components/design-images-card";

type Props = {
  params: { project: string };
};

export default async function Page({ params }: Props) {
  const designImageSubcategories: WithId<DesignImageSubcategory>[] = [];

  const ref = db
    .collection(PROJECT_COLLECTION)
    .doc(params.project)
    .collection("design-image-subcategories");
  const snapshot = await ref.get();
  snapshot.docs.map((doc) => {
    const parsed = designImageSubcategorySchema.safeParse(doc.data());
    if (parsed.success) designImageSubcategories;
  });

  const session = await auth();
  const admin = session?.user.isAdmin;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold leading-none tracking-tight">
          Gambar Desain
        </h2>
        {admin && (
          <WithDialog
            trigger={
              <Button>
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                Add New Category
              </Button>
            }
            title="Add New Category"
          >
            <CreateDesignImageCategoryForm slug={params.project} />
          </WithDialog>
        )}
      </div>
      {/* fetch design images per category */}
      {designImageSubcategories.map(async (category) => {
        const attachments: WithId<Attachment>[] = [];

        const ref = db
          .collection(PROJECT_COLLECTION)
          .doc(params.project)
          .collection("attachments");
        const snapshot = await ref.get();
        snapshot.docs.map((doc) => {
          const parsed = attachmentSchema.safeParse(doc.data());
          if (parsed.success) attachments.push({ id: doc.id, ...parsed.data });
        });

        return (
          <DesignImagesCard
            categoryId={category.id}
            title={category.title}
            slug={params.project}
            key={category.id}
            designImages={attachments}
            admin={admin}
          />
        );
      })}
    </div>
  );
}
