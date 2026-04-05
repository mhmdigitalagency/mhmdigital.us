"use server"

import { prisma } from "@/lib/prisma"
import nodemailer from "nodemailer"

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD,
  },
})

export async function subscribeToNewsletter(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase()

  if (!email || !isValidEmail(email)) {
    return {
      success: false,
      message: "Please enter a valid email address.",
    }
  }

  try {
    const existing = await prisma.newsletter.findUnique({
      where: { email },
    })

    if (existing) {
      return {
        success: false,
        message: "This email is already subscribed.",
      }
    }

    await prisma.newsletter.create({
      data: { email },
    })

    await transporter.sendMail({
      from: `"Mhm Digital" <${process.env.NODEMAILER_USER}>`,
      to: email,
      subject: "Welcome to Mhm Digital newsletter",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Welcome to Mhm Digital</h2>
          <p>Thank you for subscribing to our newsletter.</p>
          <p>You will receive updates, news, and offers from us.</p>
        </div>
      `,
    })

    await transporter.sendMail({
      from: `"Mhm Digital" <${process.env.NODEMAILER_USER}>`,
      to: process.env.NODEMAILER_USER,
      subject: "New newsletter subscriber",
      html: `
        <p>A new user subscribed to the newsletter:</p>
        <p><strong>${email}</strong></p>
      `,
    })

    return {
      success: true,
      message: "Subscription successful.",
    }
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    }
  }
}