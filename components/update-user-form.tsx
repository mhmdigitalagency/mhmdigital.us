"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateUser } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Image, UserRound } from "lucide-react";

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
      return toast.error("Please enter a name or image");
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
          (evt.target as HTMLFormElement).reset();
          router.refresh();
        },
      },
    });
  }

  return (
    <form className="max-w-md w-full space-y-4 mt-10" onSubmit={handleSubmit}>
      <div className="mt-8 flex items-center gap-3">
        <UserRound className="size-6 md:size-8 text-gray-400" />
        <input id="name" name="name" defaultValue={name} className="border rounded-full peer w-full bg-transparent px-4 py-4 
        focus:border-red-500 text-base placeholder-gray-500" />
      </div>

      {/* <div className="relative mt-8">
        <Label htmlFor="image" className="text-lg">Image</Label>
        <Image className="absolute top-9 text-blue-300" />
        <input id="image" name="image" defaultValue={image} className="w-full border-b border-blue-300 pl-9 py-2 focus:outline-none 
      hover:border-b-red-500 transition-all duration-300 bg-transparent" />
      </div> */}

      <Button size="lg" type="submit" disabled={isPending} className="p-6 rounded-full bg-red-500 hover:bg-red-600 transition-all duration-300 cursor-pointer text-xs md:text-sm mt-4">
        Update user
      </Button>
    </form>
  );
};