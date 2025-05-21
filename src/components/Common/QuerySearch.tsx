"use client";

import * as React from "react";
import { useQueryState } from "nuqs";
import { useDebouncedCallback } from "use-debounce";
import { type InputProps, Input } from "@/components/ui/input";

const QuerySearch: React.FC<InputProps> = (props) => {
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [inputValue, setInputValue] = React.useState(search);
  const isTypingRef = React.useRef(false);

  const handleSearch = useDebouncedCallback((term: string) => {
    setSearch(term || null);
    isTypingRef.current = false;
  }, 400);

  if (!isTypingRef.current && inputValue !== search) {
    setInputValue(search);
  }

  return (
    <Input
      {...props}
      value={inputValue}
      onChange={(e) => {
        const value = e.target.value;
        setInputValue(value);
        isTypingRef.current = true;
        handleSearch(value);
      }}
    />
  );
};

export default QuerySearch;
