import { useFormStatus } from "react-dom";

import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LoginButton({ className }: { className?: string }) {
  const { pending } = useFormStatus();

  return (
    <Button className={className} type="submit" disabled={pending}>
      {pending && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
      Sign In
    </Button>
  );
}
