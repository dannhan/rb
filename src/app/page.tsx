"use client";

import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "@/components/login-form";

export default function Page() {
  return (
    <main className="flex h-svh w-full items-center justify-center">
      <section className="relative hidden h-full flex-1 items-center justify-center border-r lg:flex">
        <Image
          src="/images/hero.jpg"
          alt="Image"
          className="w-full object-cover dark:brightness-[0.2] dark:grayscale"
          fill
        />
      </section>
      <section className="bg-mute flex h-full flex-1 items-center justify-center">
        <Tabs defaultValue="admin" className="w-full max-w-96 px-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="admin">Admin</TabsTrigger>
            <TabsTrigger value="manager">Manager</TabsTrigger>
          </TabsList>
          <TabsContent value="admin">
            <Card className="mx-auto w-full max-w-md border-none bg-card shadow-lg dark:border">
              <CardHeader className="text-center">
                <CardTitle className="font-bold tracking-tight">
                  Admin
                </CardTitle>
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
      </section>
    </main>
  );
}
