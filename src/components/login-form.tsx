"use client";

import { login } from "@/lib/actions";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Icons } from "@/components/icons";
import { LoginButton } from "@/components/login-button";

export function LoginForm() {
  return (
    <div className="mx-auto w-full max-w-md space-y-2 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
      <div className="pb-2 text-center">
        <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Enter the password to continue.
        </p>
      </div>

      <form className="space-y-4" action={login}>
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

        <LoginButton className="w-full" />
      </form>
    </div>
  );
}
