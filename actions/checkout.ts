"use server";

import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { generateOrderNumber } from "@/lib/order";
import { auth } from "@/lib/auth";
import { BillingCycle } from "@/app/generated/prisma/client";
import { calculateSeattleTaxFromCents } from "@/lib/tax";
import { applySitePromo } from "@/lib/promotions";

type CheckoutPayloadItem = {
  packageId: string;
  quantity: number;
  packageDuration: BillingCycle;
};

export type CheckoutResult =
  | {
      success: true;
      message: string;
      orderId: string;
      orderNumber: string;
      subtotal: number;
      tax: number;
      total: number;
    }
  | { success: false; message: string };

function getUnitPriceFromPackage(
  pkg: {
    slug: string;
    price: number | null;
    priceByMonth: number | null;
    priceByYear: number | null;
  },
  billingCycle: BillingCycle
) {
  let dollars = 0;

  if (billingCycle === "MONTHLY") {
    dollars = pkg.priceByMonth ?? 0;
  } else if (billingCycle === "YEARLY") {
    dollars = pkg.priceByYear ?? 0;
  } else {
    dollars = pkg.price ?? 0;
  }

  const { finalPrice } = applySitePromo(dollars, pkg.slug, {
    packageName: pkg.name,
  });
  return Math.round(finalPrice * 100);
}

/** Creates an order without online payment — team contacts customer to arrange payment. */
export async function createCheckoutSession(items: CheckoutPayloadItem[]): Promise<CheckoutResult> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id || !session.user.email) {
      return { success: false, message: "You must be logged in to submit an order." };
    }

    if (!items.length) {
      return { success: false, message: "Your cart is empty." };
    }

    if (!process.env.NEXT_PUBLIC_APP_URL) {
      return { success: false, message: "Checkout is temporarily unavailable. Please try again later." };
    }

    const packageIds = items.map((item) => item.packageId);

    const packages = await prisma.package.findMany({
      where: {
        id: { in: packageIds },
        isActive: true,
      },
      include: {
        service: true,
        subService: true,
      },
    });

    if (packages.length !== items.length) {
      return { success: false, message: "Some packages in your cart were not found." };
    }

    const orderItemsData = items.map((cartItem) => {
      const pkg = packages.find((p) => p.id === cartItem.packageId);

      if (!pkg) {
        throw new Error(`Package not found: ${cartItem.packageId}`);
      }

      const unitPrice = getUnitPriceFromPackage(pkg, cartItem.packageDuration);

      if (unitPrice <= 0) {
        throw new Error(`Invalid price for package: ${pkg.name}`);
      }

      return {
        packageId: pkg.id,
        quantity: cartItem.quantity,
        billingCycle: cartItem.packageDuration,
        unitPrice,
        totalPrice: unitPrice * cartItem.quantity,
        serviceName: pkg.service?.name ?? "Service",
        subServiceName: pkg.subService?.name ?? null,
        packageName: pkg.name,
        packageDescription: pkg.description,
      };
    });

    const rawSubtotal = orderItemsData.reduce((sum, item) => sum + item.totalPrice, 0);
    const { subtotal, tax, total } = calculateSeattleTaxFromCents(rawSubtotal);

    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        userId: session.user.id,
        status: "PENDING",
        subtotal,
        total,
        currency: "USD",
        items: {
          create: orderItemsData,
        },
        statusHistory: {
          create: {
            oldStatus: null,
            newStatus: "PENDING",
            note: `Order submitted with ${(tax / 100).toFixed(2)} USD Seattle sales tax included. Our team will contact you to arrange payment.`,
          },
        },
      },
    });

    return {
      success: true,
      message: `Order ${order.orderNumber} submitted successfully! Our team will contact you to confirm details and arrange payment.`,
      orderId: order.id,
      orderNumber: order.orderNumber,
      subtotal,
      tax,
      total,
    };
  } catch (error) {
    console.error("Checkout error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to submit your order. Please try again.",
    };
  }
}
