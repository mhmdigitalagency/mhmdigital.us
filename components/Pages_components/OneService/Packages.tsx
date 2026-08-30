"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Check } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeIn } from "../../../lib/variants";
import { useCart } from "@/context/CartContext";
import { BillingCycle, CartItem } from "@/types/carts";
import Contact from "./Contact";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import SitePromoBanner from "@/components/Promo/SitePromoBanner";
import PackagePriceDisplay from "@/components/Promo/PackagePriceDisplay";

interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  packages: {
    id: string;
    slug?: string;
    serviceId: string | null;
    subServiceId: string | null;
    name: string;
    priceByYear: number | null;
    priceByMonth: number | null;
    price: number | null;
    description: string;
    points: string[];
    image?: string | null;
  }[];
  subServices: {
    id: string;
    name: string;
    description: string;
    serviceId: string;
    packages: {
      id: string;
      slug?: string;
      serviceId: string | null;
      subServiceId: string | null;
      name: string;
      priceByYear: number | null;
      priceByMonth: number | null;
      price: number | null;
      description: string;
      points: string[];
      image?: string | null;
    }[];
  }[];
}

interface PackageItem {
  id: string;
  slug?: string;
  serviceId: string | null;
  subServiceId: string | null;
  name: string;
  priceByYear: number | null;
  priceByMonth: number | null;
  price: number | null;
  description: string;
  points: string[];
  image?: string | null;
}

interface Props {
  service: Service;
}

const PackagesComponent: React.FC<Props> = ({ service }) => {
  const [selectedSubServiceId, setSelectedSubServiceId] = useState<string | null>(null);
  const [isPriceTypeSwitchOn, setIsPriceTypeSwitchOn] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    if (service?.subServices?.length > 0) {
      setSelectedSubServiceId(service.subServices[0].id);
    }
  }, [service]);

  const selectedSubService = useMemo(() => {
    if (!selectedSubServiceId) return null;
    return service.subServices.find((sub) => sub.id === selectedSubServiceId) ?? null;
  }, [service.subServices, selectedSubServiceId]);

  const filteredPackages =
    selectedSubServiceId && service.subServices.length > 0
      ? selectedSubService?.packages || []
      : service.packages;

  const hasRecurringPricing = (pack: PackageItem) =>
    pack.priceByMonth !== null && pack.priceByYear !== null;

  const getBillingCycle = (pack: PackageItem): BillingCycle => {
    if (hasRecurringPricing(pack)) {
      return isPriceTypeSwitchOn ? "MONTHLY" : "YEARLY";
    }
    return "ONE_TIME";
  };

  const getPriceSuffix = (pack: PackageItem) => {
    if (hasRecurringPricing(pack)) {
      return isPriceTypeSwitchOn ? " / Month" : " / Year";
    }
    return "";
  };

  const handleAddToCart = (pack: PackageItem) => {
    const item: CartItem = {
      packageId: pack.id,
      quantity: 1,
      packageDuration: getBillingCycle(pack),
      package: {
        ...pack,
        service: {
          id: service.id,
          name: service.name,
          description: service.description,
          icon: service.icon,
        },
        subService: selectedSubService
          ? {
              id: selectedSubService.id,
              name: selectedSubService.name,
              description: selectedSubService.description,
            }
          : null,
      },
    };

    addToCart(item);

    toast.success("Package added to cart", {
      description: `${pack.name} has been successfully added to your cart.`,
    });
  };

  return (
    <>
      {service.packages.length <= 0 && service.subServices.length <= 0 ? (
        <div className="mt-32 flex flex-col items-center justify-center">
          <h1 className="mb-5 max-w-xl text-center text-[20px] font-normal leading-snug text-gray-500">
            <span className="font-bold text-black">{service.name} </span>
            services, please contact us directly. We&apos;re here to assist you with all your needs.
          </h1>
          <Contact service={service.name} />
        </div>
      ) : (
        <motion.div
          variants={fadeIn("up", 0.3)}
          viewport={{ once: false, amount: 0.2 }}
          className="mt-5"
        >
          <div className="flex flex-col items-center justify-center">
            <h5 className="text-xl font-semibold text-red-500">Packages</h5>
            <h1 className="mb-6 max-w-xl text-center text-3xl font-bold leading-tight md:text-[44px]">
              Pricing plans for every need
            </h1>
            <SitePromoBanner className="mb-10 max-w-3xl" />
          </div>

          {service.subServices.length > 0 && (
            <>
              <div className="mb-10 flex flex-wrap justify-center gap-4">
                {service.subServices.map((subService) => (
                  <button
                    key={subService.id}
                    onClick={() => setSelectedSubServiceId(subService.id)}
                    className={`rounded-full px-4 py-2 text-sm transition-all duration-300 hover:bg-red-500 hover:text-white xl:text-base ${
                      selectedSubServiceId === subService.id
                        ? "bg-red-500 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {subService.name}
                  </button>
                ))}
              </div>

              <div className="mb-10 flex flex-col items-center gap-4">
                <div className="flex flex-col items-center gap-3 space-x-2">
                  <Switch
                    id="price-type-switch"
                    checked={isPriceTypeSwitchOn}
                    onCheckedChange={setIsPriceTypeSwitchOn}
                    className={isPriceTypeSwitchOn ? "bg-red-500" : "bg-gray-200"}
                  />
                  <Label htmlFor="price-type-switch" className="text-xl font-semibold">
                    {isPriceTypeSwitchOn ? "Monthly Price" : "Yearly Price"}
                  </Label>
                </div>
              </div>
            </>
          )}

          <div className="mt-10 grid gap-8 xl:grid-cols-3">
            {filteredPackages.map((pack) => {
              const isPopular = pack.name === "Growth";
              const priceAmount = hasRecurringPricing(pack)
                ? isPriceTypeSwitchOn
                  ? (pack.priceByMonth ?? 0)
                  : (pack.priceByYear ?? 0)
                : (pack.price ?? 0);

              return (
                <div
                  key={pack.id}
                  className={`relative flex flex-col rounded-[32px] border bg-white p-8 shadow-[0_12px_40px_rgba(0,36,67,0.08)] ${
                    isPopular ? "border-brand ring-2 ring-brand/20 xl:-mt-2 xl:mb-2" : "border-gray-200"
                  }`}
                >
                  {isPopular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-navy px-4 py-1 text-xs font-bold uppercase tracking-wide text-white">
                      Most Popular
                    </span>
                  )}

                  <div className="w-full">
                    <div className="mb-8">
                      <Link href={`/package/${pack.id}`}>
                        <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500 text-2xl font-bold text-white">
                          {pack.name.charAt(0)}
                        </span>
                      </Link>
                    </div>

                    <h5 className="mb-2 text-2xl text-gray-500">{pack.name}</h5>

                    <div className="mb-6">
                      <PackagePriceDisplay
                        amount={priceAmount}
                        packageSlug={pack.slug}
                        serviceName={service.name}
                        packageName={pack.name}
                        suffix={getPriceSuffix(pack)}
                      />
                    </div>

                    <p className="mb-8 text-lg text-gray-500">{pack.description}</p>
                  </div>

                  <div className="w-full">
                    <h4 className="mb-2 text-xl font-semibold">What&apos;s included?</h4>

                    {pack.points.map((point, pointIndex) => (
                      <div className="mt-6 flex items-start gap-4" key={pointIndex}>
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 p-1 text-white">
                          <Check className="h-4 w-4" />
                        </span>
                        <h5 className="text-base font-medium text-gray-500">{point}</h5>
                      </div>
                    ))}

                    <div className="mt-auto pt-8">
                      <motion.button
                        type="button"
                        whileHover={{ y: -6 }}
                        whileTap={{ scale: 0.98 }}
                        className={`group flex w-full cursor-pointer items-center justify-center rounded-full px-10 py-4 text-white ${
                          isPopular ? "bg-brand hover:bg-brand/90" : "bg-brand-navy hover:bg-brand-navy/90"
                        }`}
                        onClick={() => handleAddToCart(pack)}
                      >
                        <span className="text-base font-semibold">Add to cart</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </>
  );
};

export default PackagesComponent;