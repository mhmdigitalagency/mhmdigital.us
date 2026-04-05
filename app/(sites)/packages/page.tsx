import FAQ from "@/components/Pages_components/Contact/FAQ";
import Packages from "@/components/Pages_components/Package/Packages";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";

const Page = async () => {
  const headerList = await headers();

  const session = await auth.api.getSession({
    headers: headerList,
  });

  const isLoggedIn = !!session;

  const services = await prisma.service.findMany({
    include: {
      packages: isLoggedIn,
      subServices: {
        include: {
          packages: isLoggedIn,
        },
      },
    },
  });

  return (
    <div>
      <Packages services={services} isLoggedIn={isLoggedIn} />
      <div className="bg-[#e1dfe23c]">
        <FAQ />
      </div>
    </div>
  );
};

export default Page;