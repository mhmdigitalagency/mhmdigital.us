// "use server";

// import { headers } from "next/headers";
// import { redirect } from "next/navigation";
// import { prisma } from "@/lib/prisma";
// import { stripe } from "@/lib/stripe";
// import { auth } from "@/lib/auth";

// export async function payPendingOrder(orderId: string) {
//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });

//   if (!session?.user?.id || !session.user.email) {
//     throw new Error("Unauthorized");
//   }

//   const order = await prisma.order.findFirst({
//     where: {
//       id: orderId,
//       userId: session.user.id,
//     },
//     include: {
//       items: true,
//     },
//   });

//   if (!order) {
//     throw new Error("Order not found.");
//   }

//   if (order.status !== "PENDING") {
//     throw new Error("Only pending orders can be paid.");
//   }

//   const checkoutSession = await stripe.checkout.sessions.create({
//     mode: "payment",
//     customer_email: session.user.email,
//     client_reference_id: order.id,
//     metadata: {
//       orderId: order.id,
//       orderNumber: order.orderNumber,
//       userId: session.user.id,
//     },
//     success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
//     cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/orders/${order.id}`,
//     line_items: order.items.map((item) => ({
//       quantity: item.quantity,
//       price_data: {
//         currency: "usd",
//         unit_amount: item.unitPrice,
//         product_data: {
//           name: item.packageName,
//           description: [item.serviceName, item.subServiceName, item.billingCycle]
//             .filter(Boolean)
//             .join(" • "),
//         },
//       },
//     })),
//   });

//   await prisma.order.update({
//     where: { id: order.id },
//     data: {
//       stripeCheckoutSessionId: checkoutSession.id,
//     },
//   });

//   await prisma.orderStatusHistory.create({
//     data: {
//       orderId: order.id,
//       oldStatus: order.status,
//       newStatus: order.status,
//       note: "Customer retried payment with a new Stripe Checkout Session.",
//     },
//   });

//   if (!checkoutSession.url) {
//     throw new Error("Stripe checkout URL not found.");
//   }

//   redirect(checkoutSession.url);
// }

// export async function cancelPendingOrder(orderId: string) {
//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });

//   if (!session?.user?.id) {
//     throw new Error("Unauthorized");
//   }

//   const order = await prisma.order.findFirst({
//     where: {
//       id: orderId,
//       userId: session.user.id,
//     },
//   });

//   if (!order) {
//     throw new Error("Order not found.");
//   }

//   if (order.status !== "PENDING") {
//     throw new Error("Only pending orders can be canceled.");
//   }

//   await prisma.order.update({
//     where: { id: order.id },
//     data: {
//       status: "CANCELED",
//     },
//   });

//   await prisma.orderStatusHistory.create({
//     data: {
//       orderId: order.id,
//       oldStatus: "PENDING",
//       newStatus: "CANCELED",
//       note: "Canceled by customer before payment.",
//     },
//   });
// }

"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";

export async function payPendingOrder(orderId: string) {
  const stripe = getStripe();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id || !session.user.email) {
    throw new Error("Unauthorized");
  }

  if (!process.env.NEXT_PUBLIC_APP_URL) {
    throw new Error("Missing NEXT_PUBLIC_APP_URL");
  }

  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      userId: session.user.id,
    },
    include: {
      items: true,
    },
  });

  if (!order) {
    throw new Error("Order not found.");
  }

  if (order.status !== "PENDING") {
    throw new Error("Only pending orders can be paid.");
  }

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

  await prisma.orderStatusHistory.create({
    data: {
      orderId: order.id,
      oldStatus: order.status,
      newStatus: order.status,
      note: "Customer retried payment with a new Stripe Checkout Session.",
    },
  });

  if (!checkoutSession.url) {
    throw new Error("Stripe checkout URL not found.");
  }

  redirect(checkoutSession.url);
}

export async function cancelPendingOrder(orderId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      userId: session.user.id,
    },
  });

  if (!order) {
    throw new Error("Order not found.");
  }

  if (order.status !== "PENDING") {
    throw new Error("Only pending orders can be canceled.");
  }

  await prisma.order.update({
    where: { id: order.id },
    data: {
      status: "CANCELED",
    },
  });

  await prisma.orderStatusHistory.create({
    data: {
      orderId: order.id,
      oldStatus: "PENDING",
      newStatus: "CANCELED",
      note: "Canceled by customer before payment.",
    },
  });
}