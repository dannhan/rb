"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

type Props = {
  size?: "default" | "sm" | "lg" | "icon" | null;
  className?: string;
  children?: React.ReactNode;
};

export function SubmitButton({ size, className, children }: Props) {
  const { pending } = useFormStatus();

  return (
    <Button size={size} type="submit" disabled={pending} className={className}>
      {pending && (
        <Icons.spinnerIcon className="mr-2 h-4 w-4 animate-spin [animation-duration:1250ms]" />
      )}
      {children}
    </Button>
  );
}
