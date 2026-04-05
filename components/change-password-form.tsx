"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { changePasswordAction } from "@/actions/change-password-action";
import { toast } from "sonner";
import { Eye, EyeOff, KeySquare } from "lucide-react";

export const ChangePasswordForm = () => {
  const [isPending, setIsPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const formData = new FormData(evt.target as HTMLFormElement);

    setIsPending(true);

    const { error } = await changePasswordAction(formData);

    if (error) {
      toast.error(error);
    } else {
      toast.success("Password changed successfully");
      (evt.target as HTMLFormElement).reset();
    }

    setIsPending(false);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md w-full space-y-4 mt-10">
      <div className="relative mt-8 flex items-center gap-3">
        <KeySquare className="size-6 md:size-8 text-gray-400" />
        <input 
        type={showPassword ? "text" : "password"} 
        id="currentPassword" name="currentPassword" 
        placeholder="Current password ****" 
        className="peer w-full bg-transparent px-4 py-4 border rounded-full
        focus:border-red-500 text-base placeholder-gray-500" />
        <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-4 text-gray-400 hover:text-red-400"
              aria-label={showPassword ? "Hide password" : "Show password"}
        >
              {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
        </button>
      </div>

      <div className="relative mt-8 flex items-center gap-3">
        <KeySquare className="size-6 md:size-8 text-gray-400" />
        <input 
        type={showPassword2 ? "text" : "password"} 
        id="newPassword" name="newPassword" 
        placeholder="New password ****" 
        className="peer w-full bg-transparent px-4 py-4 border rounded-full
        focus:border-red-500 text-base placeholder-gray-500" />
        <button
              type="button"
              onClick={() => setShowPassword2(!showPassword2)}
              className="absolute right-2 top-4 text-gray-400 hover:text-red-400"
              aria-label={showPassword2 ? "Hide password" : "Show password"}
        >
              {showPassword2 ? <EyeOff className="size-6" /> : <Eye className="size-6" />}
        </button>
      </div>

      <Button size="lg" type="submit" disabled={isPending} className="p-6 rounded-full bg-red-500 hover:bg-red-600 transition-all duration-300 cursor-pointer text-xs md:text-sm mt-4">
        Change password
      </Button>
    </form>
  );
};