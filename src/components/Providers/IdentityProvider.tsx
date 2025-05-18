"use client";

import * as React from "react";

import type { WithId, Identity } from "@/types";

type Action =
  | { type: "create"; payload: WithId<Identity> }
  | { type: "update"; payload: WithId<Identity> }
  | { type: "delete"; payload: string };

const identitiesReducer = (state: WithId<Identity>[], action: Action) => {
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

type IdentitiesContext = {
  identities: WithId<Identity>[];
  dispatch: React.Dispatch<Action>;
};

const IdentitiesContext = React.createContext<IdentitiesContext | null>(null);

type Props = React.PropsWithChildren<{ initialIdentities: WithId<Identity>[] }>;
export const IdentitiesProvider: React.FC<Props> = (props) => {
  const { children, initialIdentities } = props;
  const [identities, dispatch] = React.useReducer(
    identitiesReducer,
    initialIdentities,
  );

  return (
    <IdentitiesContext.Provider value={{ identities, dispatch }}>
      {children}
    </IdentitiesContext.Provider>
  );
};

export const useIdentitiesContext = () => {
  const context = React.useContext(IdentitiesContext);
  if (!context)
    throw new Error("useIdentitiesContext must be inside IdentitiesProvider");
  return context;
};
