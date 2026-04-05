"use client";

import { Eye, EyeOff, Mail, User, KeySquare, UserRound } from "lucide-react";
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
      router.push(result.redirectTo || `/inscription/success?callbackURL=${encodeURIComponent(cb)}`);
    } catch (e: any) {
      toast.error(e?.message ?? "Registration failed");
    } finally {
      setPending(false);
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit} noValidate>
      <input type="hidden" name="callbackURL" value={cb} />

      {/* Honeypot */}
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

      <div className="w-full">
        {/* Full Name */}
        <div className="relative flex items-center gap-3">
          <UserRound className="size-6 md:size-8 text-gray-400" />
          <input
            name="name"
            type="text"
            id="name"
            required
            autoComplete="name"
            maxLength={120}
            className="border rounded-full peer w-full bg-transparent px-4 py-4 
          focus:border-red-500 text-base placeholder-gray-500"
            placeholder="Full name *"
          />
          {fieldErrors.name?.[0] && (
            <p className="mt-2 text-sm text-red-500">{fieldErrors.name[0]}</p>
          )}
        </div>

        {/* Email */}
        <div className="relative mt-8 flex items-center gap-3">
          <Mail className="size-6 md:size-8 text-gray-400" />
          <input
            name="email"
            type="email"
            id="email"
            required
            autoComplete="email"
            inputMode="email"
            maxLength={200}
            className="border rounded-full peer w-full bg-transparent px-4 py-4 
          focus:border-red-500 text-base placeholder-gray-500"
            placeholder="Email *"
          />
          {fieldErrors.email?.[0] && (
            <p className="mt-2 text-sm text-red-500">{fieldErrors.email[0]}</p>
          )}
        </div>

        {/* Password */}
        <div className="relative mt-8 flex items-center gap-3">
          <KeySquare className="size-6 md:size-8 text-gray-400" />
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            id="password"
            required
            autoComplete="new-password"
            minLength={8}
            maxLength={200}
            className="border rounded-full peer w-full bg-transparent px-4 py-4 
          focus:border-red-500 text-base placeholder-gray-500"
            placeholder="Password *"
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-4 text-gray-400 hover:text-blue-400 transition"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="size-6" />
            ) : (
              <Eye className="size-6" />
            )}
          </button>

          {fieldErrors.password?.[0] && (
            <p className="mt-2 text-sm text-red-500">{fieldErrors.password[0]}</p>
          )}
        </div>
      </div>

      <div className="mt-10 w-full block sm:flex items-center gap-3">
        <Button
          disabled={isPending}
          type="submit"
          className="bg-red-500 text-white fontmedium px-16 py-8 w-full rounded-full shadow-md flex items-center gap-2 transition-all duration-300 hover:bg-red-600 cursor-pointer 
          disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <h5 className="text-center text-white">
            {isPending ? "Loading..." : "Sign up"}
          </h5>
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;