"use client";

import ProgressTableToolbar from "./ProgressTableToolbar";
import ProgressTableContent from "./ProgressTableContent";

const ProgressTable: React.FC = () => {
  return (
    <div className="space-y-4 pb-16">
      <ProgressTableToolbar />
      <ProgressTableContent />
    </div>
  );
};
export default ProgressTable;
