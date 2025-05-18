"use client";

import * as React from "react";

import type { WithId, TeamMember } from "@/types";

type Action =
  | { type: "create"; payload: WithId<TeamMember> }
  | { type: "update"; payload: WithId<TeamMember> }
  | { type: "delete"; payload: string };

const teamReducer = (state: WithId<TeamMember>[], action: Action) => {
  switch (action.type) {
    case "create":
      return [...state, action.payload];
    case "update":
      return state.map((teamMember) =>
        teamMember.id === action.payload.id ? action.payload : teamMember,
      );
    case "delete":
      return state.filter((teamMember) => teamMember.id !== action.payload);
    default:
      return state;
  }
};

type TeamContext = {
  team: WithId<TeamMember>[];
  dispatch: React.Dispatch<Action>;
};

const TeamContext = React.createContext<TeamContext | null>(null);

type Props = React.PropsWithChildren<{ initialTeam: WithId<TeamMember>[] }>;
export const TeamProvider: React.FC<Props> = (props) => {
  const { children, initialTeam } = props;
  const [team, dispatch] = React.useReducer(teamReducer, initialTeam);

  return (
    <TeamContext.Provider value={{ team, dispatch }}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTeamContext = () => {
  const context = React.useContext(TeamContext);
  if (!context) throw new Error("useTeamContext must be inside TeamProvider");
  return context;
};
