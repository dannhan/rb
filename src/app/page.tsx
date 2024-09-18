"use client";

import { LoginForm } from "@/components/login-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page() {
  return (
    <main className="flex h-svh items-center justify-center">
      <Tabs defaultValue="admin" className="w-[400px] px-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="admin">Admin</TabsTrigger>
          <TabsTrigger value="manager">Manager</TabsTrigger>
        </TabsList>
        <TabsContent value="admin">
          <Card className="mx-auto w-full max-w-md border-none bg-card shadow-lg dark:border">
            <CardHeader className="text-center">
              <CardTitle className="font-bold tracking-tight">Admin</CardTitle>
              <CardDescription className="text-base">
                Enter the password to continue.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm email="admin@gmail.com" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="manager">
          <Card className="mx-auto w-full max-w-md border-none bg-card shadow-lg dark:border">
            <CardHeader className="text-center">
              <CardTitle className="font-bold tracking-tight">
                Manager
              </CardTitle>
              <CardDescription className="text-base">
                Enter the password to continue.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm email="manager@gmail.com" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
