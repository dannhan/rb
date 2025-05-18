"use client";

import * as React from "react";

import type { Image } from "@/types";

type Action =
  | { type: "create"; payload: Image[] }
  | { type: "update"; payload: Image }
  | { type: "delete"; payload: string };

const projectImagesReducer = (state: Image[], { type, payload }: Action) => {
  switch (type) {
    case "create":
      return [...state, ...payload];
    case "update":
      return state.map((projectImages) =>
        projectImages.key === payload.key ? payload : projectImages,
      );
    case "delete":
      return state.filter((projectImages) => projectImages.key !== payload);
    default:
      return state;
  }
};

type projectImagesContext = {
  projectImages: Image[];
  dispatch: React.Dispatch<Action>;
};

const projectImagesContext = React.createContext<projectImagesContext | null>(
  null,
);

type Props = React.PropsWithChildren<{
  initialProjectImages: Image[];
}>;
export const ProjectImagesProvider: React.FC<Props> = (props) => {
  const { children, initialProjectImages } = props;
  const [projectImages, dispatch] = React.useReducer(
    projectImagesReducer,
    initialProjectImages,
  );

  return (
    <projectImagesContext.Provider value={{ projectImages, dispatch }}>
      {children}
    </projectImagesContext.Provider>
  );
};

export const useProjectImagesContext = () => {
  const context = React.useContext(projectImagesContext);
  if (!context)
    throw new Error(
      "useprojectImagesContext must be use inside projectImagesContextProvider",
    );
  return context;
};
