"use client";

import * as React from "react";

import type { WithId, ProgressItem } from "@/types";

type ProgressItemsContext = {
  items: WithId<ProgressItem>[];
  shouldFocus: boolean;
  setShouldFocus: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProgressItemsContext = React.createContext<ProgressItemsContext | null>(
  null,
);

type Props = React.PropsWithChildren<{ initialItems: WithId<ProgressItem>[] }>;

export const ProgressItemsProvider: React.FC<Props> = (props) => {
  const { children, initialItems } = props;
  const [shouldFocus, setShouldFocus] = React.useState(false);

  return (
    <ProgressItemsContext.Provider
      value={{
        items: initialItems,
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
