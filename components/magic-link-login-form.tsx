"use client";

import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Mail } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";

function safeCallback(cb?: string | null) {
  if (!cb) return "";
  if (!cb.startsWith("/")) return "";
  // optionnel: éviter des redirects vers des routes sensibles
  // if (cb.startsWith("/api")) return "";
  return cb;
}

export const MagicLinkLoginForm = ({
  callbackURL,
}: {
  callbackURL?: string;
}) => {
  const [isPending, setIsPending] = useState(false);
  const ref = useRef<HTMLDetailsElement>(null);
  const searchParams = useSearchParams();

  const cb =
    safeCallback(callbackURL) ||
    safeCallback(searchParams.get("callbackURL")) ||
    "/profile";

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    const formData = new FormData(evt.currentTarget);
    const email = String(formData.get("email") || "").trim();

    if (!email) return toast.error("Please enter your email.");

    await signIn.magicLink({
      email,
      name: email.split("@")[0],
      callbackURL: cb,
      fetchOptions: {
        onRequest: () => setIsPending(true),
        onResponse: () => setIsPending(false),
        onError: (ctx) => {toast.error(ctx.error.message)},
        onSuccess: () => {
          toast.success("Check your email for the magic link!");
          if (ref.current) ref.current.open = false;
          (evt.target as HTMLFormElement).reset();
        },
      },
    });
  }

  return (
    <details ref={ref} className="w-full overflow-hidden">
      <summary className="flex gap-2 items-center justify-center px-2 py-5 rounded-full text-black hover:bg-black/10 bg-slate-200 transition duration-300 cursor-pointer text-sm font-medium">
        Continue with email link
      </summary>

      <form onSubmit={handleSubmit} className="px-2 py-3">
        <Label htmlFor="email" className="sr-only">
          Email
        </Label>

        <div className="flex gap-2 items-center">
          <div className="relative w-full flex items-center gap-3">
            <Mail className="size-5 md:size-6 text-gray-400" />
            <input
              type="email"
              id="email"
              name="email"
              className="border rounded-full peer w-full bg-transparent px-4 py-2 
            focus:border-red-500 text-base placeholder-gray-500"
              placeholder="Email *"
              autoComplete="email"
            />
          </div>

          <Button
            disabled={isPending}
            className="rounded-full cursor-pointer transition-all duration-300 bg-red-500 hover:bg-red-600"
            type="submit"
          >
            {isPending ? "Sending..." : "Send"}
          </Button>
        </div>
      </form>
    </details>
  );
};
