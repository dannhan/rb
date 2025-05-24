"use client";

import * as React from "react";
import { XIcon } from "lucide-react";

import { useQueryState } from "nuqs";
import { Button } from "@/components/ui/button";
import QuerySearch from "@/components/Common/QuerySearch";

const ProgressTableFilter: React.FC = () => {
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const isFiltered = React.useMemo(() => !!search, [search]);

  return (
    <div className="flex w-full flex-1 items-center space-x-2 sm:max-w-[500px] lg:max-w-none">
      <QuerySearch
        placeholder="Search..."
        className="flex-1 sm:max-w-[160px] sm:flex-initial lg:max-w-[320px]"
      />
      {isFiltered && (
        <Button
          variant="ghost"
          onClick={() => setSearch("")}
          className="hidden h-8 px-2 lg:flex lg:px-3"
        >
          Reset
          <XIcon className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
export default ProgressTableFilter;
