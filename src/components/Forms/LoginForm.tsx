"use client";

import * as React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { loginFormSchema } from "@/config/formSchema";
import { login } from "@/actions/auth";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Icons } from "@/components/icons";

type Props = { email: string };

const LoginForm: React.FC<Props> = ({ email }) => {
  const [formActionMessage, setFormActionMessage] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { password: "" },
  });

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await login({ email, password: values.password });
      setFormActionMessage(response.message);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">{formActionMessage}</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage>{formActionMessage}</FormMessage>
            </FormItem>
          )}
        />
        <Button disabled={isSubmitting} className="w-full">
          {isSubmitting && (
            <Icons.spinnerIcon className="mr-2 h-4 w-4 animate-spin [animation-duration:1250ms]" />
          )}
          Sign In
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
