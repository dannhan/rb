import { auth } from "@/auth";
import { Image } from "@/types";

import { projectRef } from "@/lib/firebase/utils";
import { imageSchema } from "@/config/fileSchema";

import { RoleProvider } from "@/components/Providers/UserRoleProvider";
import { ProjectImagesProvider } from "@/components/Providers/ProjectImagesProvider";
import ProjectImagesUploader from "@/components/FileUploaders/ImagesUploader";
import ImagesBlock from "../ImagesBlock";

type Props = { params: Promise<{ project: string }> };
const Page: React.FC<Props> = async (props: Props) => {
  const params = await props.params;
  const images: Image[] = [];

  const snap = await projectRef(params)
    .collection("attachments")
    .where("usedBy", "==", "jadwal-proyek")
    .orderBy("createdAt")
    .get();
  snap.docs.forEach((doc) => {
    const parsed = imageSchema.safeParse(doc.data());
    if (!parsed.success) return;
    images.push(parsed.data);
  });

  return (
    <RoleProvider role={(await auth())?.user.role}>
      <ProjectImagesProvider initialProjectImages={images}>
        <div className="min-h-screen">
          <h1 className="pb-4 text-xl font-semibold md:text-2xl">
            Jadwal Proyek
          </h1>
          <ImagesBlock />
          <ProjectImagesUploader usedBy="jadwal-proyek" />
        </div>
      </ProjectImagesProvider>
    </RoleProvider>
  );
};

export default Page;
