"use client";

import TeamTableToolbar from "./TeamTableToolbar";
import TeamTableContent from "./TeamTableContent";

const TeamTable: React.FC = () => {
  return (
    <div className="space-y-4 pb-16">
      <TeamTableToolbar />
      <TeamTableContent />
    </div>
  );
};
export default TeamTable;
