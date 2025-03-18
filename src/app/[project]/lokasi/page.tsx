import Link from "next/link";
import { EditIcon, MapPinIcon, XIcon } from "lucide-react";

import { projectLocationSchema } from "@/config/dataSchema";

import { auth } from "@/auth";
import { db } from "@/lib/firebase/admin";
import { PROJECT_COLLECTION } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import CreateLocationForm from "@/components/Form/CreateLocationFrom";
import LocationDetails from "@/components/LocationDetails";
import UpdateLocationForm from "@/components/Form/UpdateLocationFrom";

type Props = {
  params: { project: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

// WARN: There is bug here for created_at
export default async function Page({ params, searchParams }: Props) {
  const ref = db.collection(PROJECT_COLLECTION).doc(params.project);
  const doc = await ref.get();
  const { data } = projectLocationSchema.safeParse(doc.data()?.location);

  const [session] = await Promise.all([auth()]);
  const admin = session?.user.isAdmin;

  delete data?.image?.createdAt;

  return (
    <main className="mx-auto max-w-[750px] rounded-lg border bg-card shadow-sm">
      <div className="flex h-16 items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <MapPinIcon className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Detail Lokasi</h2>
        </div>
        {admin &&
          data &&
          (searchParams?.edit ? (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              asChild
            >
              <Link href="lokasi">
                <XIcon className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Link>
            </Button>
          ) : (
            // TODO: use bprogress for loading indicator instead
            <Button variant="outline" size="sm" asChild>
              <Link href="lokasi?edit=true">
                <EditIcon className="mr-2 h-4 w-4" />
                <span>Ubah</span>
              </Link>
            </Button>
          ))}
      </div>
      <div className="p-6">
        {data ? (
          searchParams?.edit ? (
            <UpdateLocationForm projectId={params.project} location={data} />
          ) : (
            <LocationDetails location={data} />
          )
        ) : admin ? (
          <CreateLocationForm projectId={params.project} />
        ) : (
          <LocationDetails location={data} />
        )}
      </div>
    </main>
  );
}
