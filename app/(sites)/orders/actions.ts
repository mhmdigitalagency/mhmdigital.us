"use server";

import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

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
      note: "Canceled by customer.",
    },
  });
}
