"use client";

import { useFormStatus } from "react-dom";

import { type ButtonProps, Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export function SubmitButton({ children, ...props }: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} {...props}>
      {pending && (
        <Icons.spinnerIcon className="mr-2 h-4 w-4 animate-spin [animation-duration:1250ms]" />
      )}
      {children}
    </Button>
  );
}
