"use client";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import QuerySearch from "@/components/Common/QuerySearch";
import AddDesignCategoryButton from "./AddDesignCategoryButton";
import DesignCategoryList from "./DesignCategoryList";

const DesignCategory: React.FC<React.PropsWithChildren> = () => {
  const [animationParent] = useAutoAnimate();

  return (
    <div>
      <div className="flex justify-between gap-2 pb-4">
        <QuerySearch className="max-w-96" placeholder="Search by category..." />
        <AddDesignCategoryButton />
      </div>
      <div className="flex flex-col gap-4" ref={animationParent}>
        <DesignCategoryList />
      </div>
    </div>
  );
};

export default DesignCategory;
