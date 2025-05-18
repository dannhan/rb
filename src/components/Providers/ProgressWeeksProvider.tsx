"use client";

import * as React from "react";

import type { WithId, ProgressWeek } from "@/types";

type Action =
  | { type: "create"; payload: WithId<ProgressWeek> }
  | { type: "update"; payload: WithId<ProgressWeek> }
  | { type: "delete"; payload: string };

const progressWeeksReducer = (
  state: WithId<ProgressWeek>[],
  action: Action,
) => {
  switch (action.type) {
    case "create":
      return [...state, action.payload];
    case "update":
      return state.map((identity) =>
        identity.id === action.payload.id ? action.payload : identity,
      );
    case "delete":
      return state.filter((identity) => identity.id !== action.payload);
    default:
      return state;
  }
};

type ProgressWeeksContext = {
  weeks: WithId<ProgressWeek>[];
  dispatch: React.Dispatch<Action>;
};

const ProgressWeeksContext = React.createContext<ProgressWeeksContext | null>(
  null,
);

type Props = React.PropsWithChildren<{ initialWeeks: WithId<ProgressWeek>[] }>;

export const ProgressWeeksProvider: React.FC<Props> = (props) => {
  const { children, initialWeeks } = props;
  const [weeks, dispatch] = React.useReducer(
    progressWeeksReducer,
    initialWeeks,
  );

  return (
    <ProgressWeeksContext.Provider value={{ weeks, dispatch }}>
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
