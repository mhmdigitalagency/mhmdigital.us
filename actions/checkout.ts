"use server";

import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { generateOrderNumber } from "@/lib/order";
import { auth } from "@/lib/auth";
import { BillingCycle } from "@/app/generated/prisma/client";

type CheckoutPayloadItem = {
  packageId: string;
  quantity: number;
  packageDuration: BillingCycle;
};

function getUnitPriceFromPackage(
  pkg: {
    price: number | null;
    priceByMonth: number | null;
    priceByYear: number | null;
  },
  billingCycle: BillingCycle
) {
  if (billingCycle === "MONTHLY") {
    return Math.round((pkg.priceByMonth ?? 0) * 100);
  }

  if (billingCycle === "YEARLY") {
    return Math.round((pkg.priceByYear ?? 0) * 100);
  }

  return Math.round((pkg.price ?? 0) * 100);
}

export async function createCheckoutSession(items: CheckoutPayloadItem[]) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id || !session.user.email) {
    throw new Error("You must be logged in to continue.");
  }

  if (!items.length) {
    throw new Error("Your cart is empty.");
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
    throw new Error("Some packages were not found.");
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

  const subtotal = orderItemsData.reduce((sum, item) => sum + item.totalPrice, 0);

  const order = await prisma.order.create({
    data: {
      orderNumber: generateOrderNumber(),
      userId: session.user.id,
      status: "PENDING",
      subtotal,
      total: subtotal,
      currency: "USD",
      items: {
        create: orderItemsData,
      },
      statusHistory: {
        create: {
          oldStatus: null,
          newStatus: "PENDING",
          note: "Order created before Stripe checkout.",
        },
      },
    },
    include: {
      items: true,
    },
  });

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: session.user.email,
    client_reference_id: order.id,
    metadata: {
      orderId: order.id,
      orderNumber: order.orderNumber,
      userId: session.user.id,
    },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/orders/${order.id}?canceled=1`,
    line_items: order.items.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "usd",
        unit_amount: item.unitPrice,
        product_data: {
          name: item.packageName,
          description: [item.serviceName, item.subServiceName, item.billingCycle]
            .filter(Boolean)
            .join(" • "),
        },
      },
    })),
  });

  await prisma.order.update({
    where: { id: order.id },
    data: {
      stripeCheckoutSessionId: checkoutSession.id,
    },
  });

  if (!checkoutSession.url) {
    throw new Error("Stripe checkout URL not found.");
  }

  return {
    checkoutUrl: checkoutSession.url,
    orderId: order.id,
  };
}