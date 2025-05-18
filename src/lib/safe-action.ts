import { createSafeActionClient } from "next-safe-action";
import { auth } from "@/auth";

export const safeAction = createSafeActionClient();

export const adminAction = createSafeActionClient().use(async ({ next }) => {
  const session = await auth();
  if (session?.user.role !== "admin") {
    console.error("Authorization error from adminAction middleware");
    throw new Error("Unauthorized.");
  }

  return next();
});

export const managerAction = createSafeActionClient().use(async ({ next }) => {
  const session = await auth();
  if (session?.user.role !== "manager") {
    console.error("Authorization error from managerAction middleware");
    throw new Error("Unauthorized.");
  }

  return next();
});
