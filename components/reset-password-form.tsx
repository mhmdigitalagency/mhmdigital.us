"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    if (!password) return toast.error("Please enter your email.");

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
    <form className="w-full space-y-4 mt-10" onSubmit={handleSubmit}>
      <div className="relative mt-8 flex items-center gap-3">
        <KeySquare className="size-6 md:size-8 text-gray-400" />
        <input type={showPassword ? "text" : "password"} id="password" name="password" placeholder="New password *" 
        className="border rounded-full peer w-full bg-transparent px-4 py-4 
                focus:border-red-500 text-base placeholder-gray-500" />
                                
        {/* Toggle icon */}
        <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-4 text-gray-400 hover:text-blue-400 transition"
              aria-label={showPassword ? "Hide password" : "Show password"}
        >
              {showPassword ? <EyeOff /> : <Eye />}
        </button>
      </div>

      <div className="relative mt-8 flex items-center gap-3">
        <KeySquare className="size-6 md:size-8 text-gray-400" />
        <input type={showPassword2 ? "text" : "password"} id="confirmPassword" name="confirmPassword" placeholder="Confirm password *" 
        className="border rounded-full peer w-full bg-transparent px-4 py-4 
                focus:border-red-500 text-base placeholder-gray-500" />
                                
        {/* Toggle icon */}
        <button
              type="button"
              onClick={() => setShowPassword2(!showPassword2)}
              className="absolute right-2 top-4 text-gray-400 hover:text-blue-400 transition"
              aria-label={showPassword2 ? "Hide password" : "Show password"}
        >
              {showPassword2 ? <EyeOff /> : <Eye />}
        </button>
      </div>

      <Button size='lg' type="submit" disabled={isPending} className="p-6 rounded-full cursor-pointer transition-all duration-300 bg-red-500 hover:bg-red-600">
        Reset password
      </Button>
    </form>
  );
};