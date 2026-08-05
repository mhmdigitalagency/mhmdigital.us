"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { requireCustomer } from "@/lib/auth-redirect";
import { generateOrderNumber } from "@/lib/order";

const quoteSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().min(1),
  message: z.string().min(10).max(5000),
  type: z.string().optional(),
});

export async function submitQuoteRequest(formData: FormData) {
  const parsed = quoteSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    company: formData.get("company") || undefined,
    service: formData.get("service"),
    message: formData.get("message"),
    type: formData.get("type") || undefined,
  });

  if (!parsed.success) {
    return { success: false, error: "Please fill in all required fields correctly." };
  }

  const data = parsed.data;
  const budget = String(formData.get("budget") || "").trim();
  const timeline = String(formData.get("timeline") || "").trim();
  const messageParts = [data.message];
  if (budget) messageParts.unshift(`Budget: ${budget}`);
  if (timeline) messageParts.unshift(`Timeline: ${timeline}`);
  const fullMessage = messageParts.join("\n\n");

  try {
    await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        service: data.service,
        message: fullMessage,
        source: data.type || "website-quote",
        status: "NEW",
      },
    });

    const existingUser = await prisma.user.findUnique({ where: { email: data.email } });

    if (existingUser) {
      const quoteNumber = `QT-${Date.now().toString(36).toUpperCase()}`;
      await prisma.quote.create({
        data: {
          quoteNumber,
          userId: existingUser.id,
          status: "SENT",
          notes: fullMessage,
          sentAt: new Date(),
          lineItems: {
            create: {
              description: `${data.service} — Quote Request`,
              quantity: 1,
              unitPrice: 0,
              totalPrice: 0,
            },
          },
        },
      });
    }

    return { success: true, message: "Your quote request has been submitted. We'll respond within 1 business day." };
  } catch (error) {
    console.error("Quote submission error:", error);
    return { success: false, error: "Something went wrong. Please try again or contact us directly." };
  }
}

export async function createPrintOrderRequest(formData: FormData) {
  const session = await requireCustomer();

  const productName = String(formData.get("productName") || "").trim();
  const quantity = Number(formData.get("quantity") || 1);
  const size = String(formData.get("size") || "").trim() || null;
  const material = String(formData.get("material") || "").trim() || null;
  const finishing = String(formData.get("finishing") || "").trim() || null;
  const notes = String(formData.get("notes") || "").trim() || null;
  const isBulk = formData.get("isBulk") === "true";

  if (!productName) {
    return { success: false, error: "Product name is required." };
  }

  try {
    const order = await prisma.printOrder.create({
      data: {
        orderNumber: generateOrderNumber().replace("ORD", "PRT"),
        userId: session.user.id,
        productName,
        quantity: Math.max(1, quantity),
        size,
        material,
        finishing,
        notes,
        status: isBulk ? "QUOTE_REQUESTED" : "DRAFT",
      },
    });

    return {
      success: true,
      message: isBulk
        ? "Bulk quote request submitted. Our print team will contact you shortly."
        : "Print order created. Upload your artwork from the Files section.",
      orderId: order.id,
    };
  } catch (error) {
    console.error("Print order error:", error);
    return { success: false, error: "Failed to create print order." };
  }
}
