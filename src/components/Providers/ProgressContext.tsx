"use client";

import * as React from "react";
import { useParams } from "next/navigation";

import { nanoid } from "@/lib/nanoid";
import { addProgressItemAction } from "@/actions/create";

import type { WithId, ProgressWeek, ProgressItem } from "@/types";

type ProgressContext = {
  weeks: WithId<ProgressWeek>[];
  items: WithId<ProgressItem>[];
  addProgressItem: () => void;
  shouldFocus: boolean;
  setShouldFocus: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProgressContext = React.createContext<ProgressContext | null>(null);

type Props = React.PropsWithChildren<{
  initialWeeks: WithId<ProgressWeek>[];
  initialItems: WithId<ProgressItem>[];
}>;

export const ProgressProvider: React.FC<Props> = (props) => {
  const { children, initialWeeks, initialItems } = props;
  const params = useParams() as { project: string };

  const [shouldFocus, setShouldFocus] = React.useState(false);
  const [optimisticItems, setOptimisticItems] = React.useOptimistic(
    initialItems,
    (state, item: WithId<ProgressItem>) => {
      return !state.includes(item) ? [...state, item] : state;
    },
  );

  const addProgressItem = () => {
    const id = nanoid();
    const position = (optimisticItems.at(-1)?.position ?? 0) + 1000;
    const newItem = { id, position, description: "", progress: {} };
    React.startTransition(async () => {
      setOptimisticItems(newItem);
      await addProgressItemAction(params.project, newItem);
    });
    setShouldFocus(true);
  };

  return (
    <ProgressContext.Provider
      value={{
        weeks: initialWeeks,
        items: optimisticItems,
        addProgressItem,
        shouldFocus,
        setShouldFocus,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgressContext = () => {
  const context = React.useContext(ProgressContext);
  if (!context)
    throw new Error("useProgressContext must be inside ProgressProvider");
  return context;
};
