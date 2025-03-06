import { z } from "zod";

import { auth } from "@/auth";

import { projectSchema, fileSchema } from "@/config/dataSchema";
import { fetchCollection, fetchDoc } from "@/lib/firebase/firestore";

import { PlusCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WithDialog } from "@/components/with-dialog";
import { DesignImagesCard } from "@/components/design-images-card";
import { CreateDesignImageCategoryForm } from "@/components/create-design-image-category-form";

type Props = {
  params: { project: string };
};

export default async function Page({ params }: Props) {
  const slug = params.project;
  // TODO: what is the purpose of this
  const project = await fetchDoc({
    collectionName: "projects",
    docId: slug,
    zodSchema: projectSchema,
    errorMessage: "Error fetching the data.",
  });
  const designImageCategories = await fetchCollection({
    collectionName: "design-image-categories",
    zodSchema: z.object({
      id: z.string(),
      name: z.string(),
      createdAt: z.any(),
    }),
    // sort by createdAt in descending order
    queryBuilder: (collection) =>
      collection
        .where("slug", "==", params.project)
        .orderBy("createdAt", "desc"),
    errorMessage: "Error fetching the data.",
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
      {designImageCategories.map(async (category) => {
        const designImages = await fetchCollection({
          collectionName: "project-files",
          queryBuilder: (collection) =>
            collection
              .where("route", "==", "designImages")
              .where("category", "==", category.id),
          zodSchema: fileSchema,
          errorMessage: "Error fetching the data.",
        });

        return (
          <DesignImagesCard
            categoryId={category.id}
            title={category.name}
            slug={params.project}
            key={category.id}
            designImages={designImages}
            admin={admin}
          />
        );
      })}
    </div>
  );
}
