"use client";

import { useCreateUpdateProgressWeekModal } from "@/components/Dialogs/CreateUpdateProgressWeek";
import ProgressTableFilter from "./ProgressTableFilter";
import ProgressTablePrint from "./ProgressTablePrint";

const ProgressTableToolbar: React.FC = () => {
  const { CreateUpdateProgressWeekModal, CreateProgressWeekButton } =
    useCreateUpdateProgressWeekModal({
      id: null,
    });

  return (
    <div className="flex items-center gap-2">
      <CreateUpdateProgressWeekModal />
      <ProgressTableFilter />
      <CreateProgressWeekButton />
      <ProgressTablePrint className="ml-auto flex justify-end sm:ml-0" />
    </div>
  );
};

export default ProgressTableToolbar;
