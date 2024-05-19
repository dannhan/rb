"use client";

import { useFormStatus } from "react-dom";

import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
      Sign Out
    </Button>
  );
}
