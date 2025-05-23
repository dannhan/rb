import * as React from "react";

import { Skeleton } from "@/components/ui/skeleton";
import PageContent from "./Layouts/PageContent";

type Props = { title: string };
const LoadingState: React.FC<Props> = ({ title }) => {
  return (
    <PageContent title={title}>
      <Skeleton className="h-[480px] w-full" />
    </PageContent>
  );
};

export default LoadingState;
