import { auth } from "@/auth";

import { WithId, DesignDrawingCategory } from "@/types";
import { designDrawingCategorySchema } from "@/config/dataSchema";
import { projectRef } from "@/lib/firebase/utils";

import { RoleProvider } from "@/components/Providers/UserRoleProvider";
import { DesignDrawingsProvider } from "@/components/Providers/DesignDrawingsProvider";
import DesignDrawingClient from "./page-client";

type Props = { params: Promise<{ project: string }> };
export default async function Page(props: Props) {
  const params = await props.params;
  const categories: WithId<DesignDrawingCategory>[] = [];

  const ref = projectRef(params).collection("design-drawing-categories");
  (await ref.orderBy("createdAt").get()).docs.forEach((doc) => {
    const parsed = designDrawingCategorySchema.safeParse(doc.data());
    if (!parsed.success) return;
    categories.push({ ...parsed.data, id: doc.id });
  });

  return (
    <RoleProvider role={(await auth())?.user.role}>
      <div className="min-h-screen">
        <h1 className="pb-4 text-xl font-semibold md:text-2xl">
          Gambar Desain
        </h1>
        <DesignDrawingsProvider initialDesignDrawingCategories={categories}>
          <DesignDrawingClient />
        </DesignDrawingsProvider>
      </div>
    </RoleProvider>
  );
}
