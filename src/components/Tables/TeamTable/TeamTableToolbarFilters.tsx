import * as React from "react";

import { parseAsArrayOf, parseAsString, useQueryStates } from "nuqs";
import { XIcon } from "lucide-react";

import { teamTableConfig } from "@/config/table";

import { Button } from "@/components/ui/button";
import QuerySearch from "@/components/Common/QuerySearch";
import TableFacetedFilter from "@/components/Tables/TableFacetedFilter";

const TeamTableToolbarFilters: React.FC = () => {
  const [filters, setFilters] = useQueryStates({
    search: parseAsString,
    status: parseAsArrayOf(parseAsString),
  });
  const isFiltered = React.useMemo(
    () => !!filters.search || (filters.status?.length ?? 0) > 0,
    [filters],
  );

  return (
    <div className="flex w-full flex-1 items-center space-x-2 sm:max-w-[500px] lg:max-w-none">
      <QuerySearch
        placeholder="Search..."
        className="flex-1 sm:max-w-[160px] sm:flex-initial lg:max-w-[320px]"
      />
      <TableFacetedFilter
        colName="status"
        title="Status"
        options={teamTableConfig.statuses}
      />
      {isFiltered && (
        <Button
          variant="ghost"
          onClick={() => setFilters({ search: null, status: null })}
          className="hidden h-8 px-2 lg:flex lg:px-3"
        >
          Reset
          <XIcon className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default TeamTableToolbarFilters;
