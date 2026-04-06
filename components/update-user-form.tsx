"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { updateUser } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { UserRound } from "lucide-react";

interface UpdateUserFormProps {
  name: string;
}

export const UpdateUserForm = ({ name }: UpdateUserFormProps) => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const formData = new FormData(evt.target as HTMLFormElement);
    const name = String(formData.get("name"));

    if (!name) {
      return toast.error("Please enter your name");
    }

    await updateUser({
      ...(name && { name }),
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
          toast.success("User updated successfully");
          router.refresh();
        },
      },
    });
  }

  return (
    <form className="w-full max-w-xl space-y-5" onSubmit={handleSubmit}>
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
            id="name"
            name="name"
            defaultValue={name}
            placeholder="Enter your full name"
            className="w-full bg-transparent text-base text-gray-900 outline-none placeholder:text-gray-400"
          />
        </div>
      </div>

      <Button
        size="lg"
        type="submit"
        disabled={isPending}
        className="rounded-full bg-red-500 px-6 py-6 text-sm font-semibold text-white transition-all duration-300 hover:bg-red-600"
      >
        {isPending ? "Updating..." : "Update profile"}
      </Button>
    </form>
  );
};