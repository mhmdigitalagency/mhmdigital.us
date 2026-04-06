"use client";

import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";
import Image from "next/image";

interface SignInOAuthButtonProps {
  provider: "google" | "github";
  signUp?: boolean;
  callbackURL?: string;
}

function safeCallback(cb?: string) {
  if (!cb) return "/profile";
  if (!cb.startsWith("/")) return "/profile";
  if (cb.startsWith("//")) return "/profile";
  return cb;
}

const SignInOAuthButton = ({
  provider,
  signUp,
  callbackURL,
}: SignInOAuthButtonProps) => {
  const [isPending, setIsPending] = useState(false);

  const cb = useMemo(() => safeCallback(callbackURL), [callbackURL]);

  const handleClick = async () => {
    await signIn.social({
      provider,
      callbackURL: cb,
      errorCallbackURL: "/connexion/error",
      fetchOptions: {
        onRequest: () => setIsPending(true),
        onResponse: () => setIsPending(false),
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    });
  };

  const action = signUp ? "up" : "in";
  const providerName = provider === "google" ? "Google" : "GitHub";

  const logo = provider === "google" ? "/images/G.png" : "/images/G.png";

  return (
    <Button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className="cursor-pointer flex w-full items-center justify-center gap-3 rounded-full border border-gray-200 bg-white px-5 py-6 text-black shadow-sm transition-all duration-300 hover:bg-gray-50 hover:shadow-md"
    >
      <Image
        src={logo}
        alt={providerName}
        width={20}
        height={20}
        className="object-contain"
      />

      <span className="text-sm font-semibold">
        {isPending ? "Redirecting..." : `Sign ${action} with ${providerName}`}
      </span>
    </Button>
  );
};

export default SignInOAuthButton;