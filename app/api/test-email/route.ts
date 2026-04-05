import { NextResponse } from "next/server";
import transporter from "@/lib/nodemailer";

export async function GET() {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: "jacobtshilumba15@gmail.com",
      subject: "Test email",
      text: "This is a test email",
      html: "<p>This is a test email</p>",
    });

    return NextResponse.json({
      success: true,
      messageId: info.messageId,
    });
  } catch (error) {
    console.error("Test email failed:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}