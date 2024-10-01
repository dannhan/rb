"use client";

import { useFormState } from "react-dom";

import { login } from "@/actions/auth";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Icons } from "@/components/icons";
import { SubmitButton } from "@/components/submit-button";

export function LoginForm({ email }: { email: string }) {
  const [state, formAction] = useFormState(login, { message: "" });

  return (
    <form action={formAction}>
      <div className="relative pb-2">
        <Label className="sr-only" htmlFor="password">
          Password
        </Label>
        <input
          id="email"
          name="email"
          placeholder="Email"
          value={email}
          required
          className="hidden"
          readOnly
        />
        <Input
          id="password"
          name="password"
          placeholder="Password"
          type="password"
          required
        />
        <p className="pt-1 text-destructive">{state?.message}</p>

        {/* Show Password Button */}
        <Button
          className="absolute bottom-1 right-1 hidden h-7 w-7"
          size="icon"
          variant="ghost"
          type="button"
        >
          <Icons.eyeIcon className="h-4 w-4" />
          <span className="sr-only">Toggle password visibility</span>
        </Button>
      </div>

      <SubmitButton className="w-full">Sign In</SubmitButton>
    </form>
  );
}
