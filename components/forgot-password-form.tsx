"use client";

import { Button } from "@/components/ui/button";
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

    if (!email) {
      return toast.error("Please enter your email.");
    }

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
    <form className="w-full" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-semibold text-gray-700"
        >
          Email address
        </label>

        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all duration-300 focus-within:border-red-300 focus-within:bg-white focus-within:shadow-sm">
          <Mail className="h-5 w-5 text-gray-400" />
          <input
            name="email"
            type="email"
            id="email"
            required
            autoComplete="email"
            inputMode="email"
            className="w-full bg-transparent text-base text-gray-900 outline-none placeholder:text-gray-400"
            placeholder="Enter your email"
          />
        </div>
      </div>

      <Button
        size="lg"
        type="submit"
        disabled={isPending}
        className="cursor-pointer mt-8 w-full rounded-full bg-red-500 px-6 py-7 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(239,68,68,0.25)] transition-all duration-300 hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Sending..." : "Send reset link"}
      </Button>
    </form>
  );
};