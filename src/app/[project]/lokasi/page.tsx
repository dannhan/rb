import { getStoreLocationBySlug } from "@/firebase/firestore/store-location";
import { StoreManagementUI } from "@/components/maps";
import { auth } from "@/auth";

type Props = {
  params: { project: string };
};

export default async function Page({ params }: Props) {
  const [store, session] = await Promise.all([
    getStoreLocationBySlug(params.project),
    auth(),
  ]);
  const isAdmin = session?.user.isAdmin;

  return (
    <StoreManagementUI
      slug={params.project}
      store={store}
      isAdmin={!!isAdmin}
    />
  );
}
