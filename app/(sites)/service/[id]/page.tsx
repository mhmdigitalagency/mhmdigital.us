import { prisma } from "@/lib/prisma";
import Packages from "@/components/Pages_components/OneService/Packages";
import Service from "@/components/Pages_components/OneService/Service";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const headerList = await headers();

  const session = await auth.api.getSession({
    headers: headerList,
  });

  const service = await prisma.service.findFirstOrThrow({
    where: { id },
    include: {
      packages: !!session,
      subServices: {
        include: {
          packages: !!session,
        },
      },
    },
  });

  return (
    <div className="py-20 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
      <Service service={service} />

      {session ? (
        <Packages service={service} />
      ) : (
        <div className="mt-10 rounded-xl border p-5">
          <h2 className="text-xl font-semibold">Packages</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to view the packages available for this service.
          </p>
          <Link
            href="/connexion"
            className="mt-4 inline-block rounded-full bg-red-500 hover:bg-red-600 transition-all duration-300 px-10 py-3 text-white"
          >
            Sign In
          </Link>
        </div>
      )}
    </div>
  );
};

export default Page;