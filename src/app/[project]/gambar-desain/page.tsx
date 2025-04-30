import { auth } from "@/auth";

import type { WithId, DesignImageSubcategory, Attachment } from "@/types";
import {
  designImageSubcategorySchema,
  attachmentSchema,
} from "@/config/dataSchema";

import { db } from "@/lib/firebase/admin";
import { PROJECT_COLLECTION } from "@/lib/utils";

import Search from "@/components/Search";
import CreateDesignImageSubcategoryForm from "@/components/Form/CreateDesignImageSubcategoryForm";
import DesignImagesCard from "@/components/Attachment/DesignImagesCard";
import EmptyData from "@/components/Common/EmptyData";

type Props = {
  params: { project: string };
  searchParams: { query?: string };
};

export default async function Page({ params, searchParams }: Props) {
  // NOTE: toLowerCase???
  // TODO: toLowerCase???
  // WARN: toLowerCase???
  const query = searchParams?.query || "";
  const session = await auth();
  const admin = session?.user?.isAdmin ?? false;

  const ref = db
    .collection(PROJECT_COLLECTION)
    .doc(params.project)
    .collection("design-image-subcategories");
  const snapshot = await ref.orderBy("createAt", "desc").get();

  const filteredSubcategories: WithId<DesignImageSubcategory>[] = [];
  snapshot.docs.forEach((doc) => {
    const parsed = designImageSubcategorySchema.safeParse(doc.data());
    if (!parsed.success) return;

    if (!query || parsed.data.title.toLowerCase().includes(query)) {
      filteredSubcategories.push({ id: doc.id, ...parsed.data });
    }
  });

  // Fetch attachments for each filtered category
  const categoriesWithImages = await Promise.all(
    filteredSubcategories.map(async (category) => {
      const attachmentRef = db
        .collection(PROJECT_COLLECTION)
        .doc(params.project)
        .collection("attachments")
        .where("subCategory", "==", category.id)
        .orderBy("createdAt", "desc");

      const snapshot = await attachmentRef.get();
      const attachments: WithId<Attachment>[] = [];

      snapshot.forEach((doc) => {
        const parsed = attachmentSchema.safeParse(doc.data());
        if (!parsed.success) return;

        attachments.push({ id: doc.id, ...parsed.data });
      });

      return { category, attachments };
    }),
  );

  return (
    <div className="space-y-6">
      <div className="mx-auto flex max-w-[750px] flex-wrap items-center justify-between gap-4">
        <Search placeholder="Cari kategori..." />
        {admin && (
          <CreateDesignImageSubcategoryForm projectId={params.project} />
        )}
      </div>
      {filteredSubcategories.length === 0 && (
        <EmptyData
          admin={admin}
          className="mx-auto max-w-[750px] py-8"
          title={query ? "Tidak Ditemukan" : "Belum Ada Kategori"}
          description={
            query
              ? admin
                ? "Tidak ada kategori yang cocok dengan pencarian."
                : "Coba kata kunci lain atau periksa kembali nanti."
              : admin
                ? "Mulai dengan membuat kategori baru."
                : "Silakan periksa kembali nanti untuk pembaruan."
          }
          form={
            !query && admin ? (
              <CreateDesignImageSubcategoryForm projectId={params.project} />
            ) : undefined
          }
        />
      )}
      {categoriesWithImages.map(({ category, attachments }) => (
        <DesignImagesCard
          key={category.id}
          admin={admin}
          projectId={params.project}
          category={category}
          designImages={attachments}
        />
      ))}
    </div>
  );
}
