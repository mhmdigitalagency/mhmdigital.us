"use client";

import { Button } from "@/components/ui/button";
import { resetPassword } from "@/lib/auth-client";
import { Eye, EyeOff, KeySquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ResetPasswordFormProps {
  token: string;
}

export const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget);

    const password = String(formData.get("password"));
    if (!password) return toast.error("Please enter your new password.");

    const confirmPassword = String(formData.get("confirmPassword"));

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    await resetPassword({
      newPassword: password,
      token,
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
          toast.success("Password reset successfully.");
          router.push("/connexion");
        },
      },
    });
  }

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="space-y-5">
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            New password
          </label>

          <div className="relative flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all duration-300 focus-within:border-red-300 focus-within:bg-white focus-within:shadow-sm">
            <KeySquare className="h-5 w-5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your new password"
              className="w-full bg-transparent pr-10 text-base text-gray-900 outline-none placeholder:text-gray-400"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 text-gray-400 transition hover:text-red-400"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Confirm password
          </label>

          <div className="relative flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all duration-300 focus-within:border-red-300 focus-within:bg-white focus-within:shadow-sm">
            <KeySquare className="h-5 w-5 text-gray-400" />
            <input
              type={showPassword2 ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your new password"
              className="w-full bg-transparent pr-10 text-base text-gray-900 outline-none placeholder:text-gray-400"
            />

            <button
              type="button"
              onClick={() => setShowPassword2(!showPassword2)}
              className="absolute right-4 text-gray-400 transition hover:text-red-400"
              aria-label={showPassword2 ? "Hide password" : "Show password"}
            >
              {showPassword2 ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      <Button
        size="lg"
        type="submit"
        disabled={isPending}
        className="cursor-pointer mt-8 w-full rounded-full bg-red-500 px-6 py-7 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(239,68,68,0.25)] transition-all duration-300 hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Updating..." : "Reset password"}
      </Button>
    </form>
  );
};