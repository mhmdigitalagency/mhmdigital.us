"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BillingCycle, CartItem } from "@/types/carts";
import { useCart } from "@/context/CartContext";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Contact from "./Conctact";
import { toast } from "sonner";
import SitePromoBanner from "@/components/Promo/SitePromoBanner";
import PackagePriceDisplay from "@/components/Promo/PackagePriceDisplay";

interface Package {
  id: string;
  slug?: string;
  name: string;
  priceByMonth: number | null;
  priceByYear: number | null;
  price: number | null;
  description: string;
  points: string[];
  image?: string | null;
}

interface SubService {
  id: string;
  name: string;
  packages: Package[];
}

interface Service {
  id: string;
  name: string;
  packages: Package[];
  subServices?: SubService[];
}

interface Props {
  services: Service[];
  isLoggedIn: boolean;
}

const Packages: React.FC<Props> = ({ services, isLoggedIn }) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedSubServiceId, setSelectedSubServiceId] = useState<string | null>(null);
  const [isMonthly, setIsMonthly] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    if (services.length > 0) {
      const firstService = services[0];
      setSelectedServiceId(firstService.id);

      if (firstService.subServices && firstService.subServices.length > 0) {
        setSelectedSubServiceId(firstService.subServices[0].id);
      } else {
        setSelectedSubServiceId(null);
      }
    }
  }, [services]);

  const selectedService = useMemo(
    () => services.find((service) => service.id === selectedServiceId) || null,
    [services, selectedServiceId]
  );

  const hasSubServices =
    !!selectedService?.subServices && selectedService.subServices.length > 0;

  const filteredPackages = useMemo(() => {
    if (!selectedService) return [];

    if (hasSubServices && selectedSubServiceId) {
      return (
        selectedService.subServices?.find((sub) => sub.id === selectedSubServiceId)?.packages || []
      );
    }

    return selectedService.packages || [];
  }, [selectedService, hasSubServices, selectedSubServiceId]);

  const selectedSubService = useMemo(() => {
    if (!selectedService?.subServices || !selectedSubServiceId) return null;
    return (
      selectedService.subServices.find((sub) => sub.id === selectedSubServiceId) || null
    );
  }, [selectedService, selectedSubServiceId]);

  const handleSelectService = (service: Service) => {
    setSelectedServiceId(service.id);

    if (service.subServices && service.subServices.length > 0) {
      setSelectedSubServiceId(service.subServices[0].id);
    } else {
      setSelectedSubServiceId(null);
    }
  };

  const hasRecurringPricing = (pack: Package) => {
    return pack.priceByMonth !== null && pack.priceByYear !== null;
  };

  const getBillingCycle = (pack: Package): BillingCycle => {
    if (hasRecurringPricing(pack)) {
      return isMonthly ? "MONTHLY" : "YEARLY";
    }

    return "ONE_TIME";
  };

  const getSelectedPrice = (pack: Package) => {
    if (hasRecurringPricing(pack)) {
      return isMonthly ? (pack.priceByMonth ?? 0) : (pack.priceByYear ?? 0);
    }

    return pack.price ?? 0;
  };

  const getPriceSuffix = (pack: Package) => {
    if (hasRecurringPricing(pack)) {
      return isMonthly ? " / Month" : " / Year";
    }
    return "";
  };

  const handleAddToCart = (pack: Package) => {
    if (!selectedService) return;

    const item: CartItem = {
      packageId: pack.id,
      quantity: 1,
      packageDuration: getBillingCycle(pack),
      package: {
        ...pack,
        serviceId: selectedService.id,
        subServiceId: selectedSubService?.id ?? null,
        service: {
          id: selectedService.id,
          name: selectedService.name,
          description: "",
          icon: "",
        },
        subService: selectedSubService
          ? {
              id: selectedSubService.id,
              name: selectedSubService.name,
              description: "",
            }
          : null,
      },
    };

    addToCart(item);

    toast.success("Package added to cart", {
      description: `${pack.name} has been successfully added to your cart.`,
    });
  };

  if (!isLoggedIn)
    return (
      <div className="py-20 text-center font-bold text-2xl">
        <p>Please log in to view the packages.</p>
      </div>
    );

  return (
    <div className="mt-20 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
      <div className="flex flex-col items-center justify-center">
        <h5 className="text-xl font-semibold text-red-500">Packages</h5>
        <h1 className="mb-6 max-w-xl text-center text-3xl font-bold leading-tight md:text-[44px]">
          Pricing plans for every need
        </h1>
        <SitePromoBanner className="mb-10 max-w-3xl" />
      </div>

      {services.length > 0 && (
        <div className="mb-10 flex flex-wrap justify-center gap-4">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => handleSelectService(service)}
              className={`rounded-full px-4 py-2 text-sm transition-all duration-300 hover:bg-red-500 hover:text-white xl:text-base ${
                selectedServiceId === service.id
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {service.name}
            </button>
          ))}
        </div>
      )}

      {hasSubServices && selectedService?.subServices && (
        <>
          <div className="mb-10 flex flex-wrap justify-center gap-4">
            {selectedService.subServices.map((subService) => (
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
                checked={isMonthly}
                onCheckedChange={setIsMonthly}
                className={isMonthly ? "bg-red-500" : "bg-gray-200"}
              />
              <Label htmlFor="price-type-switch" className="text-xl font-semibold">
                {isMonthly ? "Monthly Price" : "Yearly Price"}
              </Label>
            </div>
          </div>
        </>
      )}

      {filteredPackages.length > 0 ? (
        <div className="mx-4 mt-10 grid gap-8 xl:mx-14 xl:grid-cols-3">
          {filteredPackages.map((pack) => {
            const isPopular = pack.name === "Growth";
            const priceAmount = getSelectedPrice(pack);

            return (
              <div
                key={pack.id}
                className={`relative flex flex-col rounded-[32px] border bg-white p-8 shadow-[0_12px_40px_rgba(0,36,67,0.08)] transition-shadow hover:shadow-[0_20px_50px_rgba(0,36,67,0.12)] ${
                  isPopular ? "border-brand ring-2 ring-brand/20 xl:-mt-2 xl:mb-2" : "border-gray-200"
                }`}
              >
                {isPopular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-navy px-4 py-1 text-xs font-bold uppercase tracking-wide text-white">
                    Most Popular
                  </span>
                )}

                <div className="w-full">
                  <div className="mb-8 w-[20%]">
                    <Link href={`/package/${pack.id}`}>
                      {pack.image ? (
                        <Image
                          src={pack.image}
                          alt={pack.name}
                          width={120}
                          height={120}
                          className="rounded-3xl object-cover"
                        />
                      ) : (
                        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gray-100 text-sm text-gray-400">
                          No image
                        </div>
                      )}
                    </Link>
                  </div>

                  <h5 className="mb-2 text-2xl text-gray-500">
                    {pack.name || "Default name"}
                  </h5>

                  <div className="mb-6">
                    <PackagePriceDisplay
                      amount={priceAmount}
                      packageSlug={pack.slug}
                      serviceName={selectedService?.name}
                      packageName={pack.name}
                      suffix={getPriceSuffix(pack)}
                    />
                  </div>

                  <p className="mb-8 text-lg text-gray-500">
                    {pack.description || "Default description"}
                  </p>
                </div>

                <div className="w-full">
                  <h4 className="mb-2 text-xl font-semibold">What&apos;s included?</h4>

                  {pack.points.map((point, pointIndex) => (
                    <div className="mt-6 flex items-start gap-4" key={pointIndex}>
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 p-1 text-white">
                        <Check className="h-4 w-4" />
                      </span>
                      <h5 className="text-base font-medium text-gray-500">
                        {point || "Default point"}
                      </h5>
                    </div>
                  ))}

                  <div className="mt-auto pt-8">
                    <motion.button
                      type="button"
                      whileHover={{ y: -6 }}
                      whileTap={{ scale: 0.98 }}
                      className={`group flex w-full items-center justify-center rounded-full px-10 py-4 text-white cursor-pointer transition-colors ${
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
      ) : (
        <div className="mt-5 flex w-full flex-col items-center justify-center">
          <h1 className="mb-2 max-w-xl text-center text-[20px] font-normal leading-snug text-gray-500">
            <span className="font-bold text-black">{selectedService?.name} </span>
            services, please contact us directly. We&apos;re here to assist you.
          </h1>
          <Contact serviceName={selectedService?.name || ""} />
        </div>
      )}
    </div>
  );
};

export default Packages;