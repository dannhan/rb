import { PlusCircleIcon } from "lucide-react";

import type { ProgressWeek, WithId } from "@/types";

import { Button } from "@/components/ui/button";

import { useProgressItemsContext } from "@/components/Providers/ProgressItemsProvider";
import AddWeekDialog from "@/components/ProgressTable/AddWeekDialog";
import ProgressTablePrint from "@/components/ProgressTable/ProgressTablePrint";

type Props = { admin: boolean; weeks: WithId<ProgressWeek>[] };

const ProgressTableToolbar: React.FC<Props> = ({ admin }) => {
  const { addProgressItem } = useProgressItemsContext();

  return (
    <div className="flex items-center gap-2">
      <h2 className="hidden flex-1 text-xl font-semibold leading-none tracking-tight sm:block">
        Progress Proyek
      </h2>
      {admin && <AddWeekDialog />}
      {admin && (
        <Button onClick={() => addProgressItem()}>
          <PlusCircleIcon className="mr-2 h-3.5 w-3.5" />
          Add data
        </Button>
      )}
      <ProgressTablePrint className="ml-auto flex justify-end sm:ml-0" />
    </div>
  );
};

export default ProgressTableToolbar;
