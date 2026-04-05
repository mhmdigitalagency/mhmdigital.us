// import { NextRequest, NextResponse } from "next/server";
// import Stripe from "stripe";
// import { stripe } from "@/lib/stripe";
// import { prisma } from "@/lib/prisma";
// import { sendOrderPaidEmail } from "@/lib/send-order-email";

// export async function POST(req: NextRequest) {
//   const body = await req.text();
//   const signature = req.headers.get("stripe-signature");

//   if (!signature) {
//     return new NextResponse("Missing stripe signature", { status: 400 });
//   }

//   let event: Stripe.Event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       body,
//       signature,
//       process.env.STRIPE_WEBHOOK_SECRET!
//     );
//   } catch (error) {
//     console.error("Webhook signature verification failed:", error);
//     return new NextResponse("Invalid signature", { status: 400 });
//   }

//   try {
//     switch (event.type) {
//       case "checkout.session.completed": {
//       const session = event.data.object as Stripe.Checkout.Session;
//       const orderId = session.metadata?.orderId;

//       console.log("Webhook received: checkout.session.completed");
//       console.log("Session ID:", session.id);
//       console.log("Session metadata:", session.metadata);

//       if (!orderId) {
//         console.error("Missing orderId in Stripe session metadata");
//         break;
//       }

//       const existingOrder = await prisma.order.findUnique({
//         where: { id: orderId },
//         include: {
//           user: true,
//           items: true,
//           payments: true,
//         },
//       });

//       if (!existingOrder) {
//         console.error("Order not found:", orderId);
//         break;
//       }

//       const customerEmail = existingOrder.user?.email;
//       const customerName = existingOrder.user?.name || "Customer";

//       console.log("Order found:", existingOrder.orderNumber);
//       console.log("Customer email:", customerEmail);
//       console.log("Current status:", existingOrder.status);

//       if (!customerEmail) {
//         console.error("No customer email found for order:", orderId);
//         break;
//       }

//       const paymentAlreadyExists = await prisma.payment.findFirst({
//         where: {
//           stripeCheckoutSessionId: session.id,
//         },
//       });

//       if (paymentAlreadyExists) {
//         console.log("Stripe session already processed:", session.id);
//         break;
//       }

//       await prisma.order.update({
//         where: { id: orderId },
//         data: {
//           status: "PAID",
//           paidAt: new Date(),
//           stripePaymentIntentId:
//             typeof session.payment_intent === "string"
//               ? session.payment_intent
//               : null,
//         },
//       });

//       await prisma.payment.create({
//         data: {
//           orderId,
//           userId: existingOrder.userId,
//           provider: "STRIPE",
//           status: "SUCCEEDED",
//           amount: existingOrder.total,
//           currency: existingOrder.currency,
//           stripeCheckoutSessionId: session.id,
//           stripePaymentIntentId:
//             typeof session.payment_intent === "string"
//               ? session.payment_intent
//               : null,
//           paidAt: new Date(),
//         },
//       });

//       await prisma.orderStatusHistory.create({
//         data: {
//           orderId,
//           oldStatus: existingOrder.status,
//           newStatus: "PAID",
//           note: "Stripe payment completed successfully.",
//         },
//       });

//       try {
//         await sendOrderPaidEmail({
//           to: customerEmail,
//           customerName,
//           orderNumber: existingOrder.orderNumber,
//           totalAmount: existingOrder.total,
//           items: existingOrder.items.map((item) => ({
//             packageName: item.packageName,
//             serviceName: item.serviceName,
//             subServiceName: item.subServiceName,
//             quantity: item.quantity,
//             unitPrice: item.unitPrice,
//             totalPrice: item.totalPrice,
//             billingCycle: item.billingCycle,
//           })),
//         });
//       } catch (mailError) {
//         console.error("Order confirmation email failed:", mailError);
//       }

//       break;
//     }

//       default:
//         break;
//     }

//     return NextResponse.json({ received: true });
//   } catch (error) {
//     console.error("Stripe webhook error:", error);
//     return new NextResponse("Webhook handler failed", { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { sendOrderPaidEmail } from "@/lib/send-order-email";

export async function POST(req: NextRequest) {
  const stripe = getStripe();

  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return new NextResponse("Missing stripe signature", { status: 400 });
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error("Missing STRIPE_WEBHOOK_SECRET");
    return new NextResponse("Webhook secret not configured", { status: 500 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.metadata?.orderId;

        console.log("Webhook received: checkout.session.completed");
        console.log("Session ID:", session.id);
        console.log("Session metadata:", session.metadata);

        if (!orderId) {
          console.error("Missing orderId in Stripe session metadata");
          break;
        }

        const existingOrder = await prisma.order.findUnique({
          where: { id: orderId },
          include: {
            user: true,
            items: true,
            payments: true,
          },
        });

        if (!existingOrder) {
          console.error("Order not found:", orderId);
          break;
        }

        const customerEmail = existingOrder.user?.email;
        const customerName = existingOrder.user?.name || "Customer";

        console.log("Order found:", existingOrder.orderNumber);
        console.log("Customer email:", customerEmail);
        console.log("Current status:", existingOrder.status);

        if (!customerEmail) {
          console.error("No customer email found for order:", orderId);
          break;
        }

        const paymentAlreadyExists = await prisma.payment.findFirst({
          where: {
            stripeCheckoutSessionId: session.id,
          },
        });

        if (paymentAlreadyExists) {
          console.log("Stripe session already processed:", session.id);
          break;
        }

        await prisma.order.update({
          where: { id: orderId },
          data: {
            status: "PAID",
            paidAt: new Date(),
            stripePaymentIntentId:
              typeof session.payment_intent === "string"
                ? session.payment_intent
                : null,
          },
        });

        await prisma.payment.create({
          data: {
            orderId,
            userId: existingOrder.userId,
            provider: "STRIPE",
            status: "SUCCEEDED",
            amount: existingOrder.total,
            currency: existingOrder.currency,
            stripeCheckoutSessionId: session.id,
            stripePaymentIntentId:
              typeof session.payment_intent === "string"
                ? session.payment_intent
                : null,
            paidAt: new Date(),
          },
        });

        await prisma.orderStatusHistory.create({
          data: {
            orderId,
            oldStatus: existingOrder.status,
            newStatus: "PAID",
            note: "Stripe payment completed successfully.",
          },
        });

        try {
          await sendOrderPaidEmail({
            to: customerEmail,
            customerName,
            orderNumber: existingOrder.orderNumber,
            totalAmount: existingOrder.total,
            items: existingOrder.items.map((item) => ({
              packageName: item.packageName,
              serviceName: item.serviceName,
              subServiceName: item.subServiceName,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              totalPrice: item.totalPrice,
              billingCycle: item.billingCycle,
            })),
          });
        } catch (mailError) {
          console.error("Order confirmation email failed:", mailError);
        }

        break;
      }

      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook error:", error);
    return new NextResponse("Webhook handler failed", { status: 500 });
  }
}