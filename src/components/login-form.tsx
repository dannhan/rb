import { signIn } from "next-auth/react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Icons } from "@/components/icons";

export function LoginForm() {
  const login = async (formData: FormData) => {
    "use server";

    const password = formData.get("password");
     await signIn("credentials", {
      password,
      redirect: false,
      callbackUrl: '/'
    });
  };

  return (
    <div className="space-y-2 mx-auto w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
      <div className="text-center pb-2">
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
            className="absolute bottom-1 right-1 h-7 w-7 hidden"
            size="icon"
            variant="ghost"
            type="button"
          >
            <Icons.EyeIcon className="h-4 w-4" />
            <span className="sr-only">Toggle password visibility</span>
          </Button>
        </div>
        <Button className="w-full" type="submit">
          Sign in
        </Button>
      </form>
    </div>
  );
}
