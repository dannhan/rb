import { StoreManagementUI } from "@/components/maps";
import { auth } from "@/auth";

type Props = {
  params: { project: string };
};

export default async function Page({ params }: Props) {
  const [session] = await Promise.all([auth()]);
  const isAdmin = session?.user.isAdmin;

  return (
    <StoreManagementUI
      slug={params.project}
      store={{
        link: "",
        title: "",
        address: "",
        lat: 0,
        lng: 0,
      }}
      isAdmin={!!isAdmin}
    />
  );
}
