import { LoginForm } from "@/components/login-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  return (
    <main className="flex h-dvh items-center justify-center">
      <Card className="mx-auto w-full max-w-md border-none dark:border sm:shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="font-bold tracking-tight">
            Welcome back
          </CardTitle>
          <CardDescription className="text-base">
            Enter the password to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  );
}
