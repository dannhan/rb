import { PlusCircleIcon } from "lucide-react";

import type { ProgressItem, WithId } from "@/types";

import { Button } from "@/components/ui/button";
import AddWeekDialog from "@/components/ProgressTable/AddWeekDialog";
import ProgressTablePrint from "@/components/ProgressTable/ProgressTablePrint";

type Props = {
  admin: boolean;
  progress: WithId<ProgressItem>[];
  weekKeys: string[];
  latestWeekNumber: number;
  handleAddNewProgressItem: () => void;
};

const ProgressTableToolbar: React.FC<Props> = ({
  admin,
  progress,
  weekKeys,
  latestWeekNumber,
  handleAddNewProgressItem,
}) => {
  return (
    <div className="flex items-center gap-2">
      <h2 className="hidden flex-1 text-xl font-semibold leading-none tracking-tight sm:block">
        Progress Proyek
      </h2>
      {admin && (
        <>
          <AddWeekDialog latestWeekNumber={latestWeekNumber} />
          <Button onClick={() => handleAddNewProgressItem()}>
            <PlusCircleIcon className="mr-2 h-3.5 w-3.5" />
            Add data
          </Button>
        </>
      )}
      <div className="flex flex-1 justify-end sm:flex-initial">
        <ProgressTablePrint data={progress} weekKeys={weekKeys} />
      </div>
    </div>
  );
};

export default ProgressTableToolbar;
