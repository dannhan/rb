"use client";

import { useFormStatus } from "react-dom";

import { LogOutIcon } from "lucide-react";

import { logout } from "@/actions/auth";

import { type ButtonProps, Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icons } from "@/components/icons";

export function LogoutForm({ className }: { className?: string }) {
  return (
    <form action={logout}>
      <SubmitButton size="sm" className={className}>
        Sign Out
      </SubmitButton>
    </form>
  );
}

export function HomeLogoutForm(props: ButtonProps) {
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <form action={logout}>
            <SubmitButton
              variant="outline"
              size="icon"
              className="bg-muted/50"
              {...props}
            >
              <LogOutIcon className="size-[1.2rem]" />
            </SubmitButton>
          </form>
        </TooltipTrigger>
        <TooltipContent>
          <p>Logout</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function SubmitButton({ children, ...props }: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} {...props}>
      {pending ? (
        <Icons.spinnerIcon className="size-[1.2rem] animate-spin [animation-duration:1250ms]" />
      ) : (
        children
      )}
    </Button>
  );
}
