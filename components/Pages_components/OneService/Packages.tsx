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
import { applyBrandingPromo, formatPromoPrice, BRANDING_PROMO_LABEL } from "@/lib/promotions";

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

  const getOriginalPrice = (pack: PackageItem) => {
    if (hasRecurringPricing(pack)) {
      return isPriceTypeSwitchOn ? (pack.priceByMonth ?? 0) : (pack.priceByYear ?? 0);
    }
    return pack.price ?? 0;
  };

  const getDisplayedPrice = (pack: PackageItem) => {
    const amount = getOriginalPrice(pack);

    if (hasRecurringPricing(pack)) {
      const suffix = isPriceTypeSwitchOn ? " / Month" : " / Year";
      const promo = applyBrandingPromo(amount, pack.slug);
      if (promo.promoApplied) {
        return `${formatPromoPrice(promo.finalPrice)}${suffix}`;
      }
      return `$ ${amount.toFixed(2)}${suffix}`;
    }

    const promo = applyBrandingPromo(amount, pack.slug);
    if (promo.promoApplied) {
      return formatPromoPrice(promo.finalPrice);
    }

    return `$ ${amount.toFixed(2)}`;
  };

  const hasPromo = (pack: PackageItem) =>
    applyBrandingPromo(getOriginalPrice(pack), pack.slug).promoApplied;

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
            <h1 className="mb-10 max-w-xl text-center text-3xl font-bold leading-tight md:text-[44px]">
              Pricing plans for every need
            </h1>
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

          <div className="mt-10 flex flex-col gap-10 rounded-[40px] bg-white px-2 py-16 shadow-[rgba(7,65,210,0.1)_0px_9px_30px] xl:grid xl:grid-cols-3 xl:gap-0">
            {filteredPackages.map((pack, index) => {
              const isLast = index === filteredPackages.length - 1;

              return (
                <div
                  key={pack.id}
                  className={`flex flex-col items-center px-10 pb-10 md:flex-row xl:flex-col xl:pb-0 ${
                    !isLast ? "border-b xl:border-b-0 xl:border-r" : ""
                  }`}
                >
                  <div className="w-full">
                    <div className="mb-8">
                      <Link href={`/package/${pack.id}`}>
                        <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500 text-2xl font-bold text-white">
                          {pack.name.charAt(0)}
                        </span>
                      </Link>
                    </div>

                    <h5 className="mb-2 text-2xl text-gray-500">{pack.name}</h5>

                    {hasPromo(pack) ? (
                      <div className="mb-6">
                        <span className="mb-2 inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand">
                          {BRANDING_PROMO_LABEL}
                        </span>
                        <div className="flex flex-wrap items-baseline gap-2">
                          <h4 className="text-2xl font-bold text-brand">{getDisplayedPrice(pack)}</h4>
                          <span className="text-lg text-gray-400 line-through">
                            $ {getOriginalPrice(pack).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <h4 className="mb-6 text-2xl font-bold">{getDisplayedPrice(pack)}</h4>
                    )}

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

                    <div className="mt-10">
                      <motion.button
                        type="button"
                        whileHover={{ y: -10, transition: { type: "spring" } }}
                        className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-red-500 px-10 py-4 text-white shadow-[rgba(7,65,210,0.1)_0px_9px_30px]"
                        onClick={() => handleAddToCart(pack)}
                      >
                        <h5 className="text-base font-semibold">Add to cart</h5>
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