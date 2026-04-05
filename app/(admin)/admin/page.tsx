import { auth } from "@/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import getSession from "@/lib/getSession";
import Image from "next/image";
import avatarPlaceholder from "@/assets/images/avatar_placeholder.png";

export const metadata: Metadata = {
  title: "Admin",
};

export default async function Page() {
  const session = await getSession()
  const user = session?.user

  if (!user) {
    redirect("/settings")
  }

  if (user.role !== "ADMIN") {
    return <main className="mx-auto my-10">
        <p className="text-center">You are not authorized to view this page</p>
    </main>
  }

  return (
    <div className="mt-[100px] px-4 xl:px-14 xxl:px-[10rem] xll:px-[25rem] py-10">
      <div className="mx-auto mb-10 space-y-3 flex flex-col items-center justify-center">
      {user.image ? (
          <Image
          src={user.image}
          width={100}
          alt="User profile picture"
          height={100}
          className="rounded-full"
          />
        ) : (
          <Image
          src={avatarPlaceholder}
          width={100}
          alt="User profile picture"
          height={100}
          className="rounded-full"
          />
        )}
        <h1 className="text-center text-3xl font-bold">Admin Page</h1>
        <p className="text-center text-lg">Welcome, admin <span className="font-bold">{user.name}</span></p>
      </div>
    </div>
  );
}
