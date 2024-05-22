"use client";

import { useFormStatus } from "react-dom";

import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  size?: "default" | "sm" | "lg" | "icon" | null;
  className?: string;
  children?: React.ReactNode;
};

export function SubmitButton({ size, className, children }: Props) {
  const { pending } = useFormStatus();

  return (
    <Button size={size} type="submit" disabled={pending} className={className}>
      {pending && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}
