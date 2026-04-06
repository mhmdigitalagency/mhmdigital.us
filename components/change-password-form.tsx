"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { changePasswordAction } from "@/actions/change-password-action";
import { toast } from "sonner";
import { Eye, EyeOff, KeyRound } from "lucide-react";

export const ChangePasswordForm = () => {
  const [isPending, setIsPending] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

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
    <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-5">
      <div>
        <label
          htmlFor="currentPassword"
          className="mb-2 block text-sm font-semibold text-gray-700"
        >
          Current password
        </label>

        <div className="relative flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all duration-300 focus-within:border-red-300 focus-within:bg-white focus-within:shadow-sm">
          <KeyRound className="h-5 w-5 text-gray-400" />
          <input
            type={showCurrentPassword ? "text" : "password"}
            id="currentPassword"
            name="currentPassword"
            placeholder="Enter your current password"
            className="w-full bg-transparent pr-10 text-base text-gray-900 outline-none placeholder:text-gray-400"
          />
          <button
            type="button"
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            className="absolute right-4 text-gray-400 transition hover:text-red-400"
            aria-label={showCurrentPassword ? "Hide password" : "Show password"}
          >
            {showCurrentPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <div>
        <label
          htmlFor="newPassword"
          className="mb-2 block text-sm font-semibold text-gray-700"
        >
          New password
        </label>

        <div className="relative flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all duration-300 focus-within:border-red-300 focus-within:bg-white focus-within:shadow-sm">
          <KeyRound className="h-5 w-5 text-gray-400" />
          <input
            type={showNewPassword ? "text" : "password"}
            id="newPassword"
            name="newPassword"
            placeholder="Enter your new password"
            className="w-full bg-transparent pr-10 text-base text-gray-900 outline-none placeholder:text-gray-400"
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-4 text-gray-400 transition hover:text-red-400"
            aria-label={showNewPassword ? "Hide password" : "Show password"}
          >
            {showNewPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <Button
        size="lg"
        type="submit"
        disabled={isPending}
        className="rounded-full bg-red-500 px-6 py-6 text-sm font-semibold text-white transition-all duration-300 hover:bg-red-600"
      >
        {isPending ? "Updating..." : "Change password"}
      </Button>
    </form>
  );
};