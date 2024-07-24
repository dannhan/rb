import { LoginForm } from "@/components/login-form";

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/40">
      <div className="mx-auto w-full max-w-md space-y-2 rounded-md bg-background p-8 sm:shadow-lg">
        <div className="pb-2 text-center">
          <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Enter the password to continue.
          </p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}
