"use client";

import { Eye, EyeOff, KeySquare, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { signInEmailAction } from "@/actions/sign-in-email-action";

function safeCallback(cb: string | null, fallback = "/profile") {
  if (!cb) return fallback;
  if (!cb.startsWith("/")) return fallback;
  if (cb.startsWith("//")) return fallback;
  return cb;
}

const LoginForm = ({
  callbackURL: callbackFromProps,
}: {
  callbackURL?: string;
}) => {
  const [isPending, setPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackURL = useMemo(() => {
    const fromQuery = searchParams.get("callbackURL");
    return safeCallback(callbackFromProps ?? fromQuery, "/profile");
  }, [callbackFromProps, searchParams]);

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (isPending) return;
    setPending(true);

    try {
      const formData = new FormData(evt.currentTarget);
      formData.set("callbackURL", callbackURL);

      const { error, redirectTo } = await signInEmailAction(formData);

      if (error) {
        toast.error(error);
        return;
      }

      toast.success("Logged in successfully.");
      router.replace(redirectTo || "/profile");
      router.refresh();
      window.location.reload();
    } catch (e: any) {
      toast.error(e?.message ?? "Login failed.");
    } finally {
      setPending(false);
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit} noValidate>
      <input type="hidden" name="callbackURL" value={callbackURL} />

      <div className="space-y-5">
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
              maxLength={200}
              className="w-full bg-transparent text-base text-gray-900 outline-none placeholder:text-gray-400"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Password
          </label>

          <div className="relative flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all duration-300 focus-within:border-red-300 focus-within:bg-white focus-within:shadow-sm">
            <KeySquare className="h-5 w-5 text-gray-400" />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              id="password"
              required
              autoComplete="current-password"
              maxLength={200}
              className="w-full bg-transparent pr-10 text-base text-gray-900 outline-none placeholder:text-gray-400"
              placeholder="Enter your password"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
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

        <div className="flex justify-end">
          <Link
            href="/auth/forgot-password"
            className="text-sm font-medium text-gray-500 transition hover:text-red-500"
          >
            Forgot password?
          </Link>
        </div>
      </div>

      <Button
        disabled={isPending}
        type="submit"
        className="cursor-pointer mt-8 w-full rounded-full bg-red-500 px-6 py-7 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(239,68,68,0.25)] transition-all duration-300 hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Loading..." : "Sign in"}
      </Button>
    </form>
  );
};

export default LoginForm;