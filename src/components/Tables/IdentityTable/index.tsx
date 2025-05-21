"use client";

import IdentityTableToolbar from "./IdentityTableToolbar";
import IdentityTableContent from "./IdentityTableContent";

const IdentityTable: React.FC = () => {
  return (
    <div className="space-y-4 pb-16">
      <IdentityTableToolbar />
      <IdentityTableContent />
    </div>
  );
};
export default IdentityTable;
