"use client";

import * as React from "react";
import { useParams } from "next/navigation";

import { nanoid } from "@/lib/nanoid";
import { addProgressItemAction } from "@/actions/create";

import type { WithId, ProgressItem } from "@/types";

type ProgressItemsContext = {
  items: WithId<ProgressItem>[];
  addProgressItem: () => void;
  shouldFocus: boolean;
  setShouldFocus: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProgressItemsContext = React.createContext<ProgressItemsContext | null>(
  null,
);

type Props = React.PropsWithChildren<{ initialItems: WithId<ProgressItem>[] }>;

export const ProgressItemsProvider: React.FC<Props> = (props) => {
  const { children, initialItems } = props;
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
    <ProgressItemsContext.Provider
      value={{
        items: optimisticItems,
        addProgressItem,
        shouldFocus,
        setShouldFocus,
      }}
    >
      {children}
    </ProgressItemsContext.Provider>
  );
};

export const useProgressItemsContext = () => {
  const context = React.useContext(ProgressItemsContext);
  if (!context)
    throw new Error(
      "useProgressItemsContext must be inside ProgressItemsProvider",
    );
  return context;
};
