"use client";

import * as React from "react";

import type { ProgressItem, WithId } from "@/types";
import { addProgressItemAction } from "@/actions/create";
import { nanoid } from "@/lib/nanoid";

import ProgressTable from "@/components/ProgressTable/ProgressTable";

type Props = {
  admin: boolean;
  params: { project: string };
  progress: WithId<ProgressItem>[];
  weekKeys: string[];
  latestWeekNumber: number;
};

const ProjectProgressPageClient: React.FC<Props> = ({
  admin,
  params,
  progress,
  weekKeys,
  latestWeekNumber,
}) => {
  const [, startTransition] = React.useTransition();
  const [optimisticProgress, addOptimisticProgress] = React.useOptimistic(
    progress,
    (prev, newProgress: WithId<ProgressItem>) => [...prev, newProgress],
  );

  const handleAddNewProgressItem = () => {
    const progressId = nanoid();
    startTransition(async () => {
      const newPosition =
        optimisticProgress.length > 0
          ? optimisticProgress[optimisticProgress.length - 1].position + 1000
          : 1000;
      addOptimisticProgress({
        id: progressId,
        description: "",
        position: newPosition,
        progress: {},
      });
      await addProgressItemAction({
        progressId,
        projectId: params.project,
        newPosition,
      });
    });
    return progressId;
  };

  return (
    <ProgressTable
      admin={admin}
      progress={optimisticProgress}
      weekKeys={weekKeys}
      latestWeekNumber={latestWeekNumber}
      handleAddNewProgressItem={handleAddNewProgressItem}
    />
  );
};

export default ProjectProgressPageClient;
