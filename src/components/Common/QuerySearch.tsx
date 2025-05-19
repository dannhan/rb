"use client";

import * as React from "react";

import { useQueryState } from "nuqs";
import { useDebouncedCallback } from "use-debounce";

import { type InputProps, Input } from "@/components/ui/input";

const QuerySearch: React.FC<InputProps> = (props) => {
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [inputValue, setInputValue] = React.useState(search);

  const handleSearch = useDebouncedCallback((term) => {
    setSearch(term || null);
  }, 500);

  return (
    <Input
      {...props}
      value={inputValue}
      onChange={(e) => {
        setInputValue(e.target.value);
        handleSearch(e.target.value);
      }}
    />
  );
};

export default QuerySearch;
