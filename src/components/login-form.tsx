"use client";

import { useFormState } from "react-dom";

import { login } from "@/lib/actions";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Icons } from "@/components/icons";
import { SubmitButton } from "@/components/submit-button";

export function LoginForm() {
  const [state, formAction] = useFormState(login, { message: "" });

  return (
      <form action={formAction} className="space-y-4">
        <div className="relative">
          <Label className="sr-only" htmlFor="password">
            Password
          </Label>
          <Input
            id="password"
            name="password"
            placeholder="Password"
            type="password"
            required
          />
          <p className="pt-1 text-destructive">{state.message}</p>

          {/* Show Password Button */}
          <Button
            className="absolute bottom-1 right-1 hidden h-7 w-7"
            size="icon"
            variant="ghost"
            type="button"
          >
            <Icons.EyeIcon className="h-4 w-4" />
            <span className="sr-only">Toggle password visibility</span>
          </Button>
        </div>

        <SubmitButton className="w-full">
          Sign In
        </SubmitButton>
      </form>
  );
}
