"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { requireCustomer } from "@/lib/auth-redirect";
import { generateOrderNumber } from "@/lib/order";
import { calculateSeattleTaxFromCents } from "@/lib/tax";
import { storeCustomerFile } from "@/actions/files";
import {
  labelForOption,
  PRINT_FINISHING_OPTIONS,
  PRINT_MATERIAL_OPTIONS,
  PRINT_SIZE_OPTIONS,
  PRINT_TURNAROUND_OPTIONS,
} from "@/lib/print-order-options";
import { syncLeadToGhl } from "@/lib/ghl";

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
    const leadSource = data.type || "website-quote";

    await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        service: data.service,
        message: fullMessage,
        source: leadSource,
        status: "NEW",
      },
    });

    await syncLeadToGhl({
      source: leadSource,
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      service: data.service,
      message: data.message,
      budget: budget || null,
      timeline: timeline || null,
      tags: [leadSource, data.service].filter(Boolean),
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

  const productSlug = String(formData.get("productSlug") || "").trim();
  const quantity = Number(formData.get("quantity") || 1);
  const sizeValue = String(formData.get("size") || "").trim();
  const materialValue = String(formData.get("material") || "").trim();
  const finishingValue = String(formData.get("finishing") || "").trim();
  const turnaroundValue = String(formData.get("turnaround") || "").trim();
  const isBulk = formData.get("isBulk") === "true";
  const artwork = formData.get("artwork");

  if (!productSlug) {
    return { success: false, error: "Please select a print product from the catalog." };
  }

  if (!isBulk && (!(artwork instanceof File) || artwork.size === 0)) {
    return { success: false, error: "Please upload your print-ready artwork file." };
  }

  const product = await prisma.printProduct.findFirst({
    where: { slug: productSlug, isActive: true },
  });

  if (!product) {
    return { success: false, error: "Selected print product was not found." };
  }

  let subtotal = 0;
  if (product.basePrice) {
    subtotal = product.basePrice * Math.max(1, quantity);
  }

  const size = sizeValue ? labelForOption(PRINT_SIZE_OPTIONS, sizeValue) : null;
  const material = materialValue ? labelForOption(PRINT_MATERIAL_OPTIONS, materialValue) : null;
  const finishing = finishingValue ? labelForOption(PRINT_FINISHING_OPTIONS, finishingValue) : null;
  const turnaround = turnaroundValue ? labelForOption(PRINT_TURNAROUND_OPTIONS, turnaroundValue) : null;

  try {
    const { subtotal: pricedSubtotal, tax, total } = calculateSeattleTaxFromCents(subtotal);

    const order = await prisma.printOrder.create({
      data: {
        orderNumber: generateOrderNumber().replace("ORD", "PRT"),
        userId: session.user.id,
        productId: product.id,
        productName: product.name,
        quantity: Math.max(1, quantity),
        size,
        material,
        finishing,
        turnaround,
        notes: null,
        subtotal: pricedSubtotal,
        total,
        status: isBulk ? "QUOTE_REQUESTED" : "ARTWORK_REVIEW",
      },
    });

    if (artwork instanceof File && artwork.size > 0) {
      const upload = await storeCustomerFile(session.user.id, artwork, {
        category: "PRINT_READY",
        printOrderId: order.id,
        uploadedBy: session.user.id,
      });

      if (!upload.success) {
        await prisma.printOrder.delete({ where: { id: order.id } });
        return { success: false, error: upload.error };
      }
    }

    const artworkName =
      artwork instanceof File && artwork.size > 0 ? artwork.name : undefined;

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { name: true, email: true, phoneNumber: true, company: true },
    });

    if (user) {
      await syncLeadToGhl({
        source: isBulk ? "print-bulk" : "print-order",
        name: user.name,
        email: user.email,
        phone: user.phoneNumber,
        company: user.company,
        service: product.name,
        message: [
          `Order: ${order.orderNumber}`,
          `Quantity: ${order.quantity}`,
          size ? `Size: ${size}` : null,
          material ? `Material: ${material}` : null,
          finishing ? `Finishing: ${finishing}` : null,
          turnaround ? `Turnaround: ${turnaround}` : null,
          artworkName ? `Artwork: ${artworkName}` : null,
          `Subtotal: $${(pricedSubtotal / 100).toFixed(2)}`,
          `Total (incl. tax): $${(total / 100).toFixed(2)}`,
        ]
          .filter(Boolean)
          .join("\n"),
        tags: [isBulk ? "print-bulk" : "print-order", product.slug],
        metadata: {
          orderNumber: order.orderNumber,
          orderId: order.id,
          productSlug: product.slug,
          quantity: order.quantity,
          subtotalCents: pricedSubtotal,
          totalCents: total,
        },
      });
    }

    revalidatePath("/dashboard/print-orders");
    revalidatePath("/dashboard/files");

    const taxNote =
      tax > 0 ? ` Seattle sales tax (${(tax / 100).toFixed(2)} USD) is included.` : "";

    return {
      success: true,
      message: isBulk
        ? `Bulk quote request submitted successfully.${taxNote} Our print team will contact you shortly.`
        : `Print order ${order.orderNumber} submitted successfully.${taxNote} Your artwork is attached and our team will review it soon.`,
      orderId: order.id,
      orderNumber: order.orderNumber,
      subtotal: pricedSubtotal,
      tax,
      total,
    };
  } catch (error) {
    console.error("Print order error:", error);
    return { success: false, error: "Failed to create print order." };
  }
}
