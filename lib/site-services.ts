import { prisma } from "@/lib/prisma";
import { MAIN_SERVICES } from "@/lib/constants/services-data";
import { withDatabase } from "@/lib/db-safe";

export type PublicService = {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
};

function servicesFromConstants(): PublicService[] {
  return MAIN_SERVICES.map((service) => ({
    id: service.slug,
    slug: service.slug,
    name: service.name,
    description: service.description,
    icon: service.icon,
  }));
}

export async function getPublicServices(): Promise<PublicService[]> {
  return withDatabase(
    () =>
      prisma.service.findMany({
        where: { isActive: true },
        orderBy: { position: "asc" },
        select: {
          id: true,
          slug: true,
          name: true,
          description: true,
          icon: true,
        },
      }),
    servicesFromConstants()
  );
}

export async function getContactFormServices(): Promise<PublicService[]> {
  return withDatabase(
    () =>
      prisma.service.findMany({
        select: {
          id: true,
          slug: true,
          name: true,
          description: true,
          icon: true,
        },
      }),
    servicesFromConstants()
  );
}
