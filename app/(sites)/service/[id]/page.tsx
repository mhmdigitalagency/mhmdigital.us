import { prisma } from "@/lib/prisma";
import Packages from "@/components/Pages_components/OneService/Packages";
import Service from "@/components/Pages_components/OneService/Service";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { serviceJsonLd } from "@/lib/seo/json-ld";
import type { Metadata } from "next";

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id } });

  if (!service) {
    return buildPageMetadata({
      title: "Service",
      description: "Digital and print services from MHM Digital in Seattle.",
      path: "/services",
    });
  }

  return buildPageMetadata({
    title: service.name,
    description: service.description.slice(0, 160),
    path: `/service/${id}`,
    ogImage: service.image || undefined,
    keywords: [service.name, `${service.name} Seattle`, "MHM Digital services"],
  });
}

const Page = async ({ params }: PageProps) => {
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
      <JsonLd
        data={serviceJsonLd({
          name: service.name,
          description: service.description,
          path: `/service/${id}`,
          image: service.image || undefined,
        })}
      />
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
            className="mt-4 inline-block rounded-full bg-brand hover:opacity-90 transition-all duration-300 px-10 py-3 text-white"
          >
            Sign In
          </Link>
        </div>
      )}
    </div>
  );
};

export default Page;
