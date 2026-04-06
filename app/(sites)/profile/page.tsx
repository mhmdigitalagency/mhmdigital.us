import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { UpdateUserForm } from "@/components/update-user-form";
import { ChangePasswordForm } from "@/components/change-password-form";
import { prisma } from "@/lib/prisma";
import {
  Building2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";

const Page = async () => {
  const headerList = await headers();

  const session = await auth.api.getSession({
    headers: headerList,
  });

  if (!session) redirect("/connexion");

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      company: true,
      phoneNumber: true,
      billingAddress: true,
      shippingAddress: true,
      billingCity: true,
      billingPostal: true,
      shippingCity: true,
      shippingPostal: true,
      createdAt: true,
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
      <div className="mb-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-red-500">
          Account settings
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-5xl">
          My profile
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-gray-500">
          Manage your personal information, update your profile, and keep your
          account secure.
        </p>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1fr_380px]">
        <div className="space-y-8">
          <div className="overflow-hidden rounded-[32px] border border-gray-200 bg-white shadow-[0_15px_45px_rgba(0,0,0,0.06)]">
            <div className="bg-linear-to-b from-red-500 to-red-400 px-6 py-8 text-white md:px-8">
              <div className="flex flex-col gap-5 md:flex-row md:items-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-2xl font-bold uppercase backdrop-blur-sm">
                  {initials}
                </div>

                <div>
                  <h2 className="text-2xl font-bold md:text-3xl">{user.name}</h2>
                  <p className="mt-1 text-sm text-red-50">{user.email}</p>
                  <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">
                    <ShieldCheck className="h-4 w-4" />
                    {user.role}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 px-6 py-6 md:grid-cols-2 md:px-8">
              <div className="rounded-2xl bg-gray-50 p-4">
                <div className="mb-2 flex items-center gap-2 text-gray-500">
                  <Building2 className="h-4 w-4" />
                  <span className="text-sm font-medium">Company</span>
                </div>
                <p className="font-semibold text-gray-900">{user.company || "—"}</p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-4">
                <div className="mb-2 flex items-center gap-2 text-gray-500">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm font-medium">Phone</span>
                </div>
                <p className="font-semibold text-gray-900">
                  {user.phoneNumber || "—"}
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-4">
                <div className="mb-2 flex items-center gap-2 text-gray-500">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm font-medium">Email</span>
                </div>
                <p className="font-semibold text-gray-900 break-all">{user.email}</p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-4">
                <div className="mb-2 flex items-center gap-2 text-gray-500">
                  <UserRound className="h-4 w-4" />
                  <span className="text-sm font-medium">Member since</span>
                </div>
                <p className="font-semibold text-gray-900">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[32px] border border-gray-200 bg-white shadow-[0_15px_45px_rgba(0,0,0,0.06)]">
            <div className="border-b border-gray-100 px-6 py-5 md:px-8">
              <h2 className="text-2xl font-bold text-gray-900">
                User information
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Your saved billing and shipping information
              </p>
            </div>

            <div className="grid gap-4 px-6 py-6 md:grid-cols-2 md:px-8">
              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="text-sm font-medium text-gray-500">Full name</p>
                <p className="mt-1 font-semibold text-gray-900">{user.name}</p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="text-sm font-medium text-gray-500">Role</p>
                <p className="mt-1 font-semibold text-gray-900">{user.role}</p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-4 md:col-span-2">
                <p className="text-sm font-medium text-gray-500">Billing address</p>
                <p className="mt-1 font-semibold text-gray-900">
                  {user.billingAddress || "—"}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {user.billingCity || "—"} {user.billingPostal || ""}
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-4 md:col-span-2">
                <p className="text-sm font-medium text-gray-500">Shipping address</p>
                <p className="mt-1 font-semibold text-gray-900">
                  {user.shippingAddress || "—"}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {user.shippingCity || "—"} {user.shippingPostal || ""}
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[32px] border border-gray-200 bg-white shadow-[0_15px_45px_rgba(0,0,0,0.06)]">
            <div className="border-b border-gray-100 px-6 py-5 md:px-8">
              <h2 className="text-2xl font-bold text-gray-900">Update profile</h2>
              <p className="mt-1 text-sm text-gray-500">
                Change your personal information
              </p>
            </div>

            <div className="px-6 py-6 md:px-8">
              <UpdateUserForm name={user.name} />
            </div>
          </div>

          <div className="overflow-hidden rounded-[32px] border border-gray-200 bg-white shadow-[0_15px_45px_rgba(0,0,0,0.06)]">
            <div className="border-b border-gray-100 px-6 py-5 md:px-8">
              <h2 className="text-2xl font-bold text-gray-900">Change password</h2>
              <p className="mt-1 text-sm text-gray-500">
                Keep your account safe with a strong password
              </p>
            </div>

            <div className="px-6 py-6 md:px-8">
              <ChangePasswordForm />
            </div>
          </div>
        </div>

        <div className="xl:sticky xl:top-24 xl:self-start">
          <div className="overflow-hidden rounded-[32px] border border-gray-200 bg-white shadow-[0_15px_45px_rgba(0,0,0,0.08)]">
            <div className="bg-linear-to-r from-red-500 to-red-400 px-6 py-6 text-white">
              <h2 className="text-2xl font-bold">Profile summary</h2>
              <p className="mt-2 text-sm text-red-50">
                Quick overview of your account
              </p>
            </div>

            <div className="space-y-4 px-6 py-6">
              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="text-sm text-gray-500">Account name</p>
                <p className="mt-1 font-semibold text-gray-900">{user.name}</p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="text-sm text-gray-500">Email</p>
                <p className="mt-1 break-all font-semibold text-gray-900">
                  {user.email}
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="text-sm text-gray-500">Role</p>
                <p className="mt-1 font-semibold text-gray-900">{user.role}</p>
              </div>

              <div className="rounded-2xl bg-red-50 p-4">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-red-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Saved addresses
                    </p>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Billing and shipping details are available in your profile
                      information.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;