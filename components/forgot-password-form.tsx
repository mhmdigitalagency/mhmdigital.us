"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import { requestPasswordReset } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const ForgotPasswordForm = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget);
    const email = String(formData.get("email"));

    if (!email) return toast.error("Please enter your email.");

    await requestPasswordReset({
      email,
      redirectTo: "/auth/reset-password",
      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success("Reset link sent to your email.");
          router.push("/auth/forgot-password/success");
        },
      },
    });
  }

  return (
    <form className="w-full space-y-4 mt-10" onSubmit={handleSubmit}>
      <div className="relative mt-8 flex items-center gap-3">
            <Mail className="size-6 md:size-8 text-gray-400" />
            <input
                  name='email'
                  type="email"
                  id="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  className="border rounded-full peer w-full bg-transparent px-4 py-4 
                focus:border-red-500 text-base placeholder-gray-500" 
                placeholder="Email *"
            />
      </div>

      <Button size="lg" type="submit" disabled={isPending} className="p-6 rounded-full bg-red-500 cursor-pointer transition-all duration-300 hover:bg-red-600">
        Send reset link
      </Button>
    </form>
  );
};