import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { UpdateUserForm } from "@/components/update-user-form";
import { ChangePasswordForm } from "@/components/change-password-form";
import { prisma } from "@/lib/prisma";
import { Mail, Phone, UserRound } from "lucide-react";

const Page = async () => {
  const headerList = await headers();

  const session = await auth.api.getSession({
    headers: headerList,
  });

  if (!session) redirect("/connexion");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      company: true,
      phoneNumber: true,
    },
  });

  if (!user) redirect("/connexion");

  const initials = user.name
    ? user.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
    : "US";

  return (
    <div className="min-h-screen bg-linear-to-b from-white via-red-50/20 to-white px-4 py-12 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            My profile
          </h1>
          <p className="mt-2 text-gray-500">
            Update your name and password.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm mb-6">
          <div className="flex items-center gap-4 border-b border-gray-100 px-6 py-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500 text-lg font-bold uppercase text-white">
              {initials}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>

          <div className="grid gap-4 px-6 py-5 sm:grid-cols-2">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Mail className="h-4 w-4 text-gray-400" />
              <span className="break-all">{user.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Phone className="h-4 w-4 text-gray-400" />
              <span>{user.phoneNumber || "No phone saved"}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600 sm:col-span-2">
              <UserRound className="h-4 w-4 text-gray-400" />
              <span>{user.company || "No company saved"}</span>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm mb-6">
          <div className="border-b border-gray-100 px-6 py-4">
            <h2 className="text-lg font-bold text-gray-900">Update name</h2>
          </div>
          <div className="px-6 py-5">
            <UpdateUserForm name={user.name} />
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-4">
            <h2 className="text-lg font-bold text-gray-900">Change password</h2>
          </div>
          <div className="px-6 py-5">
            <ChangePasswordForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
