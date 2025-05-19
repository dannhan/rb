"use client";

import * as React from "react";

import type { WithId, DesignDrawingCategory } from "@/types";

type Action =
  | { type: "create"; payload: WithId<DesignDrawingCategory> }
  | { type: "update"; payload: WithId<DesignDrawingCategory> }
  | { type: "delete"; payload: string }
  | { type: "delete-image"; payload: { id: string; imageURL: string } };

const designDrawingCategoriesReducer = (
  state: WithId<DesignDrawingCategory>[],
  { type, payload }: Action,
) => {
  switch (type) {
    case "create":
      return [payload, ...state];
    case "update":
      return state.map((category) =>
        category.id === payload.id ? payload : category,
      );
    case "delete":
      return state.filter((category) => category.id !== payload);
    case "delete-image":
      return state.map((category) =>
        category.id === payload.id
          ? {
              ...category,
              imageURLs:
                category.imageURLs?.filter((url) => url !== payload.imageURL) ??
                [],
            }
          : category,
      );
    default:
      return state;
  }
};

type DesignDrawingsContext = {
  categories: WithId<DesignDrawingCategory>[];
  dispatch: React.Dispatch<Action>;
};

const DesignDrawingsContext = React.createContext<DesignDrawingsContext | null>(
  null,
);

type Props = React.PropsWithChildren<{
  initialDesignDrawingCategories: WithId<DesignDrawingCategory>[];
}>;
export const DesignDrawingsProvider: React.FC<Props> = (props) => {
  const { children, initialDesignDrawingCategories } = props;
  const [categories, dispatch] = React.useReducer(
    designDrawingCategoriesReducer,
    initialDesignDrawingCategories,
  );

  return (
    <DesignDrawingsContext.Provider value={{ categories, dispatch }}>
      {children}
    </DesignDrawingsContext.Provider>
  );
};

export const useDesignDrawingsContext = () => {
  const context = React.useContext(DesignDrawingsContext);
  if (!context)
    throw new Error(
      "useDesignDrawingsContext must be use inside DesignDrawingsContextProvider",
    );
  return context;
};
