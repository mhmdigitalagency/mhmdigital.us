import { prisma } from "@/lib/prisma";
import { Minus } from "lucide-react";

const DEFAULT_STATS = [
  { key: "projects", label: "Projects Completed", value: "150", suffix: "+" },
  { key: "businesses", label: "Businesses Supported", value: "80", suffix: "+" },
  { key: "industries", label: "Industries Served", value: "12", suffix: "+" },
  { key: "satisfaction", label: "Customer Satisfaction", value: "98", suffix: "%" },
  { key: "experience", label: "Years Combined Experience", value: "15", suffix: "+" },
];

export default async function TrustSection() {
  let stats = await prisma.siteStatistic.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  if (stats.length === 0) {
    stats = DEFAULT_STATS.map((s, i) => ({
      id: s.key,
      key: s.key,
      label: s.label,
      value: s.value,
      suffix: s.suffix,
      sortOrder: i,
      isActive: true,
      updatedAt: new Date(),
    }));
  }

  return (
    <section className="py-16 bg-white" aria-labelledby="trust-heading">
      <div className="px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
        <div className="flex items-center gap-2 mb-3 justify-center">
          <Minus className="text-red-500" aria-hidden />
          <p className="text-red-500 font-bold text-sm uppercase tracking-wider">Trusted by Growing Businesses</p>
        </div>
        <h2 id="trust-heading" className="text-2xl md:text-4xl font-bold text-center mb-12">
          Results that speak for themselves
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.key}
              className="text-center rounded-2xl border border-gray-100 bg-gray-50/50 p-6 hover:shadow-md transition-shadow"
            >
              <p className="text-3xl md:text-4xl font-bold text-red-500">
                {stat.value}
                {stat.suffix && <span className="text-2xl">{stat.suffix}</span>}
              </p>
              <p className="mt-2 text-sm text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
