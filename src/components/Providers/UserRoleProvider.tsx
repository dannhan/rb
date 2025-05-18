"use client";

import * as React from "react";

// I Love Verbosity
const RoleContext = React.createContext<{
  role: "admin" | "manager" | null;
  admin: boolean;
  manager: boolean;
} | null>(null);

type Props = React.PropsWithChildren<{ role: "admin" | "manager" | undefined }>;
export const RoleProvider: React.FC<Props> = ({ children, role }) => {
  return (
    <RoleContext.Provider
      value={{
        role: role ?? null,
        admin: role === "admin",
        manager: role === "manager",
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};

export const useRoleContext = () => {
  const context = React.useContext(RoleContext);
  if (!context)
    throw new Error("useUserRoleContext must be inside UserRoleContext");
  return context;
};
