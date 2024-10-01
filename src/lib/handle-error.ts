import { isRedirectError } from "next/dist/client/components/redirect";
import { toast } from "sonner";
import { z } from "zod";

export function getErrorMessage(error: unknown) {
  if (error instanceof z.ZodError) {
    const errors = error.issues.map((issue) => {
      return issue.message;
    });
    return errors.join("\n");
  }

  if (isRedirectError(error)) {
    throw error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong, please try again later.";
}

export function showErrorToast(err: unknown) {
  const errorMessage = getErrorMessage(err);
  return toast.error(errorMessage);
}
