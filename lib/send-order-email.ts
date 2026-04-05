import transporter from "@/lib/nodemailer";

type OrderEmailItem = {
  packageName: string;
  serviceName: string;
  subServiceName?: string | null;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  billingCycle: string;
};

interface SendOrderPaidEmailProps {
  to: string;
  customerName: string;
  orderNumber: string;
  items: OrderEmailItem[];
  totalAmount: number;
}

function formatCents(amount: number) {
  return `$${(amount / 100).toFixed(2)} USD`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendOrderPaidEmail({
  to,
  customerName,
  orderNumber,
  items,
  totalAmount,
}: SendOrderPaidEmailProps) {
  const safeCustomerName = escapeHtml(customerName || "Customer");
  const safeOrderNumber = escapeHtml(orderNumber);

  const rows = items
    .map((item) => {
      const packageName = escapeHtml(item.packageName);
      const serviceName = escapeHtml(item.serviceName);
      const subServiceName = escapeHtml(item.subServiceName ?? "-");
      const billingCycle = escapeHtml(item.billingCycle);

      return `
        <tr>
          <td style="border:1px solid #e5e7eb;padding:10px;vertical-align:top;">${packageName}</td>
          <td style="border:1px solid #e5e7eb;padding:10px;vertical-align:top;">${serviceName}</td>
          <td style="border:1px solid #e5e7eb;padding:10px;vertical-align:top;">${subServiceName}</td>
          <td style="border:1px solid #e5e7eb;padding:10px;vertical-align:top;">${billingCycle}</td>
          <td style="border:1px solid #e5e7eb;padding:10px;vertical-align:top;">${item.quantity}</td>
          <td style="border:1px solid #e5e7eb;padding:10px;vertical-align:top;">${formatCents(item.unitPrice)}</td>
          <td style="border:1px solid #e5e7eb;padding:10px;vertical-align:top;">${formatCents(item.totalPrice)}</td>
        </tr>
      `;
    })
    .join("");

  const textLines = items.map(
    (item, index) =>
      `${index + 1}. ${item.packageName} | ${item.serviceName} | ${
        item.subServiceName ?? "-"
      } | ${item.billingCycle} | Qty: ${item.quantity} | Unit: ${formatCents(
        item.unitPrice
      )} | Total: ${formatCents(item.totalPrice)}`
  );

  const text = `
Hello ${customerName || "Customer"},

Thank you for your payment. We have successfully received your order.

Order Number: ${orderNumber}

Order Details:
${textLines.join("\n")}

Order Total: ${formatCents(totalAmount)}

If you have any questions, simply reply to this email.

MHM Digital
contact@primeprint.store
`.trim();

  const html = `
    <div style="margin:0;padding:24px;background-color:#f9fafb;">
      <div style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;color:#111827;">
        
        <div style="padding:24px 28px;background:#111827;color:#ffffff;">
          <h1 style="margin:0;font-size:24px;line-height:1.3;">MHM Digital</h1>
          <p style="margin:8px 0 0;font-size:14px;line-height:1.6;color:#e5e7eb;">
            Payment confirmation
          </p>
        </div>

        <div style="padding:28px;">
          <p style="margin:0 0 16px;font-size:15px;line-height:1.7;">Hello ${safeCustomerName},</p>

          <p style="margin:0 0 16px;font-size:15px;line-height:1.7;">
            Thank you for your payment. We have successfully received your order.
          </p>

          <p style="margin:0 0 20px;font-size:15px;line-height:1.7;">
            <strong>Order Number:</strong> ${safeOrderNumber}
          </p>

          <table style="width:100%;border-collapse:collapse;margin:0 0 20px;font-size:14px;">
            <thead>
              <tr style="background:#f3f4f6;">
                <th style="border:1px solid #e5e7eb;padding:10px;text-align:left;">Package</th>
                <th style="border:1px solid #e5e7eb;padding:10px;text-align:left;">Service</th>
                <th style="border:1px solid #e5e7eb;padding:10px;text-align:left;">Subservice</th>
                <th style="border:1px solid #e5e7eb;padding:10px;text-align:left;">Billing</th>
                <th style="border:1px solid #e5e7eb;padding:10px;text-align:left;">Qty</th>
                <th style="border:1px solid #e5e7eb;padding:10px;text-align:left;">Unit</th>
                <th style="border:1px solid #e5e7eb;padding:10px;text-align:left;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>

          <p style="margin:0 0 16px;font-size:15px;line-height:1.7;">
            <strong>Order Total:</strong> ${formatCents(totalAmount)}
          </p>

          <p style="margin:0 0 16px;font-size:15px;line-height:1.7;">
            If you have any questions, simply reply to this email.
          </p>

          <p style="margin:0;font-size:15px;line-height:1.7;">
            Thank you,<br />
            MHM Digital
          </p>
        </div>

        <div style="padding:18px 28px;background:#f3f4f6;border-top:1px solid #e5e7eb;">
          <p style="margin:0;font-size:13px;line-height:1.7;color:#4b5563;">
            MHM Digital<br />
            Email:
            <a href="mailto:contact@primeprint.store" style="color:#111827;text-decoration:none;">
              contact@primeprint.store
            </a>
          </p>
        </div>
      </div>
    </div>
  `;

  try {
    console.log("Sending order confirmation email to:", to);

    const info = await transporter.sendMail({
      from: '"MHM Digital" <contact@primeprint.store>',
      to,
      replyTo: "contact@primeprint.store",
      subject: `Order payment confirmed - ${orderNumber}`,
      text,
      html,
      headers: {
        "X-Entity-Ref-ID": orderNumber,
      },
    });

    console.log("Email sent successfully:", info.messageId);
    console.log("Accepted:", info.accepted);
    console.log("Rejected:", info.rejected);
    console.log("Response:", info.response);

    return info;
  } catch (error) {
    console.error("Failed to send order email:", error);
    throw error;
  }
}