import { auth } from "@/auth";
import { Image } from "@/types";

import { projectRef } from "@/lib/firebase/utils";
import { imageSchema } from "@/config/fileSchema";

import { RoleProvider } from "@/components/Providers/UserRoleProvider";
import { ProjectImagesProvider } from "@/components/Providers/ProjectImagesProvider";
import ProjectImagesUploader from "@/components/FileUploaders/ImagesUploader";
import ImagesBlock from "./ImagesBlock";
import PageContent from "@/components/Layouts/PageContent";

type Props = {
  params: { project: string };
  title: string;
  route: "rab" | "jadwal-proyek" | "realisasi-biaya";
};
const ImagesDashboardPage: React.FC<Props> = async (props) => {
  const { params, title, route } = props;
  const images: Image[] = [];

  const snap = await projectRef(params)
    .collection("attachments")
    .where("usedBy", "==", route)
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
        <PageContent title={title}>
          <ImagesBlock />
          <ProjectImagesUploader usedBy={route} />
        </PageContent>
      </ProjectImagesProvider>
    </RoleProvider>
  );
};

export default ImagesDashboardPage;
