"use client";

import * as React from "react";
import { ImagesIcon } from "lucide-react";

import { useQueryState } from "nuqs";
import { useDesignDrawingsContext } from "@/components/Providers/DesignDrawingsProvider";
import AnimatedEmptyState from "@/components/Common/AnimatedEmptyState";
import AddDesignCategoryButton from "./AddDesignCategoryButton";
import DesignCategorySection from "./DesignCategorySection";

const DesignCategoryList: React.FC = () => {
  const { categories } = useDesignDrawingsContext();
  const [search] = useQueryState("search", { defaultValue: "" });

  const isFiltered = React.useMemo(() => !!search.length, [search]);
  const filtered = React.useMemo(() => {
    const lowerSearch = search.trim().toLowerCase();
    return categories.filter((category) =>
      category.title.toLowerCase().includes(lowerSearch),
    );
  }, [categories, search]);

  return filtered.length !== 0 ? (
    filtered.map((category) => (
      <DesignCategorySection key={category.id} category={category} />
    ))
  ) : (
    <AnimatedEmptyState
      title={`No ${isFiltered ? "matching categories" : "category found"}`}
      description={`No category ${isFiltered ? `match “${search}”.` : "have been created for this project yet."}`}
      icon={<ImagesIcon className="size-4 text-muted-foreground" />}
      {...(!isFiltered && {
        addButton: <AddDesignCategoryButton />,
      })}
    />
  );
};

export default DesignCategoryList;
