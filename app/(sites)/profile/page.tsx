import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { UpdateUserForm } from "@/components/update-user-form";
import { ChangePasswordForm } from "@/components/change-password-form";
import { prisma } from "@/lib/prisma";

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

  return (
    <div className="px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] py-10 min-h-screen">
      <hr />

      <div className="py-4 md:py-10 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] xl:w-[45%] mx-auto flex flex-col justify-center items-center">
        <div className="border-b rounded py-3 w-full text-center">
          <h5 className="font-semibold text-2xl md:text-3xl">Profile</h5>
        </div>
      </div>

      <div className="mt-10">
        <button className="aspect-square w-16 h-16 md:w-24 md:h-24 rounded-full bg-gray-400 text-primary-foreground flex items-center justify-center">
          <span className="uppercase text-lg font-bold">
            {user.name.slice(0, 2)}
          </span>
        </button>
      </div>

      <div className="mt-10 space-y-3 p-4 rounded-b-md border border-t-8 border-green-400">
        <h2 className="text-lg md:text-2xl font-bold">User information</h2>

        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Company:</strong> {user.company || "—"}</p>
        <p><strong>Phone:</strong> {user.phoneNumber || "—"}</p>
        <p><strong>Billing address:</strong> {user.billingAddress || "—"}</p>
        <p><strong>Billing city:</strong> {user.billingCity || "—"}</p>
        <p><strong>Billing postal:</strong> {user.billingPostal || "—"}</p>
        <p><strong>Shipping address:</strong> {user.shippingAddress || "—"}</p>
        <p><strong>Shipping city:</strong> {user.shippingCity || "—"}</p>
        <p><strong>Shipping postal:</strong> {user.shippingPostal || "—"}</p>
      </div>

      <div className="mt-10 space-y-4 p-4 rounded-b-md border border-t-8 border-blue-400">
        <h2 className="text-lg md:text-2xl font-bold">Update user</h2>

        <UpdateUserForm name={user.name} />
      </div>

      <div className="mt-10 space-y-4 p-4 rounded-b-md border border-t-8 border-red-400">
        <h2 className="text-lg md:text-2xl font-bold">Change password</h2>

        <ChangePasswordForm />
      </div>
    </div>
  );
};

export default Page;