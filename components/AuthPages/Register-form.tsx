"use client";

import { Eye, EyeOff, Mail, KeySquare, UserRound } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { signUpEmailAction } from "@/actions/sign-up-email-action";

function safeCallback(cb?: string | null) {
  if (!cb) return "/profile";
  if (!cb.startsWith("/")) return "/profile";
  if (cb.startsWith("//")) return "/profile";
  return cb;
}

type Props = {
  callbackURL?: string;
};

const RegisterForm = ({ callbackURL }: Props) => {
  const [isPending, setPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<{
    name?: string[];
    email?: string[];
    password?: string[];
    website?: string[];
  }>({});

  const router = useRouter();
  const searchParams = useSearchParams();

  const cb = useMemo(() => {
    const fromQuery = searchParams.get("callbackURL");
    return safeCallback(callbackURL ?? fromQuery);
  }, [callbackURL, searchParams]);

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (isPending) return;

    setPending(true);
    setFieldErrors({});

    try {
      const formData = new FormData(evt.currentTarget);
      formData.set("callbackURL", cb);

      const result = await signUpEmailAction(formData);

      if (result.fieldErrors) {
        setFieldErrors(result.fieldErrors);
      }

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success("Registration complete. Please verify your email.");
      router.push(
        result.redirectTo ||
          `/inscription/success?callbackURL=${encodeURIComponent(cb)}`
      );
    } catch (e: any) {
      toast.error(e?.message ?? "Registration failed");
    } finally {
      setPending(false);
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit} noValidate>
      <input type="hidden" name="callbackURL" value={cb} />

      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="space-y-5">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Full name
          </label>

          <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all duration-300 focus-within:border-red-300 focus-within:bg-white focus-within:shadow-sm">
            <UserRound className="h-5 w-5 text-gray-400" />
            <input
              name="name"
              type="text"
              id="name"
              required
              autoComplete="name"
              maxLength={120}
              className="w-full bg-transparent text-base text-gray-900 outline-none placeholder:text-gray-400"
              placeholder="Enter your full name"
            />
          </div>

          {fieldErrors.name?.[0] && (
            <p className="mt-2 text-sm text-red-500">{fieldErrors.name[0]}</p>
          )}
        </div>

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

          {fieldErrors.email?.[0] && (
            <p className="mt-2 text-sm text-red-500">{fieldErrors.email[0]}</p>
          )}
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
              autoComplete="new-password"
              minLength={8}
              maxLength={200}
              className="w-full bg-transparent pr-10 text-base text-gray-900 outline-none placeholder:text-gray-400"
              placeholder="Create your password"
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

          {fieldErrors.password?.[0] && (
            <p className="mt-2 text-sm text-red-500">
              {fieldErrors.password[0]}
            </p>
          )}
        </div>
      </div>

      <Button
        disabled={isPending}
        type="submit"
        className="cursor-pointer mt-8 w-full rounded-full bg-red-500 px-6 py-7 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(239,68,68,0.25)] transition-all duration-300 hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Loading..." : "Create account"}
      </Button>
    </form>
  );
};

export default RegisterForm;