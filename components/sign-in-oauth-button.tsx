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

  const logo =
    provider === "google"
      ? "/images/G.png"
      : "/images/G.png"; 

  return (
    <Button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className="flex items-center justify-center gap-3 py-8 border-gray-200 rounded-full bg-transparent hover:bg-black/10 w-full transition-all duration-300 cursor-pointer"
    >
      <Image
        src={logo}
        alt={providerName}
        width={20}
        height={20}
        className="object-contain"
      />

      <h5 className="text-sm text-black">
        {isPending ? "Redirecting..." : `Sign ${action} with ${providerName}`}
      </h5>
    </Button>
  );
};

export default SignInOAuthButton;