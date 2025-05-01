"use client";

import * as React from "react";

import type { WithId, ProgressWeek } from "@/types";

type ProgressWeeksContext = { weeks: WithId<ProgressWeek>[] };

const ProgressWeeksContext = React.createContext<ProgressWeeksContext | null>(
  null,
);

type Props = React.PropsWithChildren<{ initialWeeks: WithId<ProgressWeek>[] }>;

export const ProgressWeeksProvider: React.FC<Props> = (props) => {
  const { children, initialWeeks } = props;

  return (
    <ProgressWeeksContext.Provider value={{ weeks: initialWeeks }}>
      {children}
    </ProgressWeeksContext.Provider>
  );
};

export const useProgressWeeksContext = () => {
  const context = React.useContext(ProgressWeeksContext);
  if (!context)
    throw new Error(
      "useProgressWeeksContext must be inside ProgressWeeksProvider",
    );
  return context;
};
