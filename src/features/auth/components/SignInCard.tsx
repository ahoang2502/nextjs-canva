"use client";

import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export const SignInCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onProviderSignIn = (provider: "github" | "google") => {
    signIn(provider, { callbackUrl: "/" });
  };

  const onCredentialsSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signIn("credentials", { email, password, callbackUrl: "/" });
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0 ">
        <CardTitle>Login to continue</CardTitle>

        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={onCredentialsSignIn} className="space-y-2.5">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
          />

          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            required
          />

          <Button type="submit" className="w-full" size="lg">
            Continue
          </Button>
        </form>

        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button
            variant="outline"
            size="lg"
            className="w-full relative"
            onClick={() => onProviderSignIn("google")}
          >
            <FcGoogle className="mr-2 size-5 top-2.5 left-2.5 absolute" />
            Continue with Google
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full relative"
            onClick={() => onProviderSignIn("github")}
          >
            <FaGithub className="mr-2 size-5 top-2.5 left-2.5 absolute" />
            Continue with Github
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up">
            <span className="text-sky-700 hover:underline">Sign up</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
