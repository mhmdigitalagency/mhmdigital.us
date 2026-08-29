"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Check } from "lucide-react";
import image3 from "@/public/images/image-project-overview-marketing-template.svg";
import {
  BillingCycle,
  CartItem,
  Package as CartPackage,
} from "@/types/carts";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import {
  applyBrandingPromo,
  formatPromoPrice,
  BRANDING_PROMO_LABEL,
} from "@/lib/promotions";

interface Props {
  servicePack: CartPackage;
}

const PackageService = ({ servicePack }: Props) => {
  const { addToCart } = useCart();

  const hasMonthly = servicePack.priceByMonth !== null;
  const hasYearly = servicePack.priceByYear !== null;
  const hasRecurringPricing = hasMonthly || hasYearly;

  const defaultMode: BillingCycle = hasMonthly
    ? "MONTHLY"
    : hasYearly
    ? "YEARLY"
    : "ONE_TIME";

  const [selectedMode, setSelectedMode] = useState<BillingCycle>(defaultMode);

  const selectedPrice = useMemo(() => {
    if (selectedMode === "MONTHLY") return servicePack.priceByMonth ?? 0;
    if (selectedMode === "YEARLY") return servicePack.priceByYear ?? 0;
    return servicePack.price ?? 0;
  }, [selectedMode, servicePack]);

  const pricePromo = useMemo(
    () =>
      applyBrandingPromo(selectedPrice, servicePack.slug, {
        serviceName: servicePack.service?.name,
        packageName: servicePack.name,
      }),
    [selectedPrice, servicePack]
  );

  const priceLabel = useMemo(() => {
    if (selectedMode === "MONTHLY") return "/ month";
    if (selectedMode === "YEARLY") return "/ year";
    return "";
  }, [selectedMode]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as BillingCycle;
    setSelectedMode(value);
  };

  const handleAddToCart = (
    event?: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    event?.preventDefault();

    const item: CartItem = {
      package: servicePack,
      quantity: 1,
      packageDuration: selectedMode,
      packageId: servicePack.id,
    };

    addToCart(item);

    toast.success("Package added to cart", {
      description: `${servicePack.name} has been successfully added to your cart.`,
    });
  };

  return (
    <>
      <div className="mt-20 px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.8, delay: 0.2 } }}
          className="mb-24 block w-full items-start justify-between md:flex"
        >
          <div className="w-full md:w-[58%]">
            <div className="flex w-full flex-col justify-center md:w-[60%]">
              <p className="mb-2 font-extrabold text-red-500">
                {servicePack.service?.name}
                {servicePack.subService?.name
                  ? ` • ${servicePack.subService.name}`
                  : ""}
              </p>

              <motion.div
                whileHover={{
                  rotate: 360,
                  transition: { type: "spring", duration: 2 },
                }}
                className="mb-2 w-[20%]"
              >
                {servicePack.image ? (
                  <img
                    src={servicePack.image}
                    alt={servicePack.name}
                    className="rounded-3xl"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gray-100 text-sm text-gray-400">
                    No image
                  </div>
                )}
              </motion.div>

              <h1 className="mb-3 max-w-xl text-left text-[40px] font-bold leading-tight sm:text-[62px] lg:max-w-4xl">
                {servicePack.name}
              </h1>

              <p className="text-left text-[18px] font-semibold leading-7 text-gray-500">
                {servicePack.description}
              </p>
            </div>

            <div className="mt-10">
              <h4 className="mb-2 text-xl font-bold">What&apos;s included?</h4>

              {servicePack.points.map((point, index) => (
                <div className="mt-6 flex items-center gap-4" key={index}>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-500 p-1 text-white">
                    <Check className="h-4 w-4" />
                  </span>
                  <h5 className="text-lg font-medium text-black">
                    {point || "Default point"}
                  </h5>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 w-full md:mt-0 md:w-[42%]">
            <div className="w-full rounded-[40px] border bg-white px-10 py-14 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
              <h3 className="mb-3 text-2xl font-semibold">
                Order your package today!
              </h3>

              <p className="text-[17px] font-semibold leading-7 text-gray-500">
                Choose your preferred package option and add it directly to your cart.
              </p>

              {hasRecurringPricing ? (
                <form onSubmit={handleAddToCart}>
                  <select
                    value={selectedMode === "ONE_TIME" ? "" : selectedMode}
                    onChange={handleSelectChange}
                    required
                    className="mt-16 w-full cursor-pointer rounded-[40px] border bg-white px-5 py-5 shadow-sm transition-all duration-300 hover:border-black"
                  >
                    <option value="">Package Duration</option>

                    {hasYearly && (
                      <option value="YEARLY" className="font-semibold text-gray-500">
                        1 Year
                      </option>
                    )}

                    {hasMonthly && (
                      <option value="MONTHLY" className="font-semibold text-gray-500">
                        1 Month
                      </option>
                    )}
                  </select>

                  {pricePromo.promoApplied ? (
                    <div className="mt-10">
                      <span className="mb-2 inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand">
                        {BRANDING_PROMO_LABEL}
                      </span>
                      <div className="flex flex-wrap items-baseline gap-2">
                        <h4 className="text-3xl font-extrabold text-brand">
                          {formatPromoPrice(pricePromo.finalPrice)} {priceLabel}
                        </h4>
                        <span className="text-lg text-gray-400 line-through">
                          ${selectedPrice.toFixed(2)} {priceLabel}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <h4 className="mt-10 text-3xl font-extrabold">
                      ${selectedPrice.toFixed(2)} {priceLabel}
                    </h4>
                  )}

                  <motion.button
                    whileHover={{ y: -10, transition: { type: "spring" } }}
                    className="mt-10 w-full rounded-full bg-red-500 px-10 py-5 text-white"
                    type="submit"
                  >
                    <h5 className="text-center text-[17px] font-semibold">
                      Add to Cart
                    </h5>
                  </motion.button>
                </form>
              ) : (
                <div>
                  {pricePromo.promoApplied ? (
                    <div className="mt-10">
                      <span className="mb-2 inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand">
                        {BRANDING_PROMO_LABEL}
                      </span>
                      <div className="flex flex-wrap items-baseline gap-2">
                        <h4 className="text-3xl font-extrabold text-brand">
                          {formatPromoPrice(pricePromo.finalPrice)}
                        </h4>
                        <span className="text-lg text-gray-400 line-through">
                          ${(servicePack.price ?? 0).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <h4 className="mt-10 text-3xl font-extrabold">
                      ${(servicePack.price ?? 0).toFixed(2)}
                    </h4>
                  )}

                  <motion.button
                    whileHover={{ y: -10, transition: { type: "spring" } }}
                    className="mt-10 w-full cursor-pointer rounded-full bg-red-500 px-10 py-5 text-white"
                    onClick={handleAddToCart}
                    type="button"
                  >
                    <h5 className="text-center text-[17px] font-semibold">
                      Add to Cart
                    </h5>
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <div className="my-25">
          <div className="mx-auto w-[90%] rounded-[40px] bg-slate-50 px-6 pb-10 pt-24 shadow-md md:w-[80%] md:px-10 lg:w-[70%] lg:px-16">
            <div className="mb-20">
              <h2 className="text-[30px] font-bold sm:text-[40px]">
                About the Package
              </h2>

              <p className="mt-10 text-base font-semibold leading-8 text-gray-500 md:text-[18px]">
                Proin sed libero enim sed faucibus turpis in. Nisi est sit amet
                facilisis. Venenatis cras sed felis eget velit. A erat nam at
                lectus urna duis convallis. Cras ornare arcu dui vivamus arcu
                felis. Viverra ipsum nunc aliquet bibendum enim facilisis
                gravida.
              </p>

              <p className="mt-10 text-base font-semibold leading-8 text-gray-500 md:text-[18px]">
                Tellus pellentesque eu tincidunt tortor aliquam nulla facilisi
                cras. Et netus et malesuada fames. Vel orci porta non pulvinar
                neque laoreet suspendisse. Malesuada fames ac turpis egestas
                maecenas pharetra convallis.
              </p>

              <Image
                src={image3}
                alt="package overview"
                priority
                width={0}
                height={0}
                sizes="100vw"
                className="mt-10 w-full rounded-[50px]"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PackageService;