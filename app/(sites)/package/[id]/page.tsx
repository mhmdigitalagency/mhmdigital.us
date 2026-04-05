import PackageService from "@/components/Pages_components/PackService/PackageService";
import { prisma } from "@/lib/prisma";
import { Package } from "@/types/carts";
import React from "react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const servicePack = await prisma.package.findFirstOrThrow({
    where: {
      id,
    },
    include: {
      service: true,
    },
  });

  const formattedPackage: Package = {
    id: servicePack.id,
    serviceId: servicePack.serviceId,
    name: servicePack.name,
    priceByYear: servicePack.priceByYear,
    priceByMonth: servicePack.priceByMonth,
    price: servicePack.price,
    description: servicePack.description,
    points: servicePack.points,
    image: servicePack.image ?? null,
    service: servicePack.service
      ? {
          id: servicePack.service.id,
          name: servicePack.service.name,
          description: servicePack.service.description,
          icon: servicePack.service.icon,
        }
      : {
          id: "",
          name: "",
          description: "",
          icon: "",
        },
  };

  return <PackageService servicePack={formattedPackage} />;
};

export default Page;