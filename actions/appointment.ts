'use server'

import { appointmentSchema } from '@/schemas'
import nodemailer from 'nodemailer'
import { z } from 'zod'
import handlebars from 'handlebars'

type AppointmentValues = z.infer<typeof appointmentSchema>

export async function appointment(values: AppointmentValues) {
  const parsedValues = appointmentSchema.safeParse(values)

  if (!parsedValues.success) {
    return {
      success: false,
      error: 'Invalid form data.',
      fieldErrors: parsedValues.error.flatten().fieldErrors,
    }
  }

  const data = parsedValues.data

  const smtpHost = process.env.SMTP_HOST
  const smtpPort = Number(process.env.SMTP_PORT || 465)
  const smtpUser = process.env.NODEMAILER_USER
  const smtpPass = process.env.NODEMAILER_PASSWORD
  const receiverEmail = process.env.APPOINTMENT_RECEIVER

  if (!smtpHost || !smtpUser || !smtpPass || !receiverEmail) {
    console.error('Missing SMTP environment variables:', {
      SMTP_HOST: !!smtpHost,
      NODEMAILER_USER: !!smtpUser,
      NODEMAILER_PASSWORD: !!smtpPass,
      APPOINTMENT_RECEIVER: !!receiverEmail,
    })

    return {
      success: false,
      error: 'Email service is not configured correctly.',
    }
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  })

  const htmlTemplate = `
    <div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #111;">
      <h2 style="margin-bottom: 16px;">New appointment request</h2>
      <p>You received a new appointment request from your website.</p>

      <table style="border-collapse: collapse; width: 100%; max-width: 700px;">
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Name</td>
          <td style="padding: 8px; border: 1px solid #ddd;">{{name}}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td>
          <td style="padding: 8px; border: 1px solid #ddd;">{{email}}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Phone number</td>
          <td style="padding: 8px; border: 1px solid #ddd;">{{phoneNumber}}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Company</td>
          <td style="padding: 8px; border: 1px solid #ddd;">{{company}}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Role</td>
          <td style="padding: 8px; border: 1px solid #ddd;">{{role}}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Industry</td>
          <td style="padding: 8px; border: 1px solid #ddd;">{{industry}}</td>
        </tr>
      </table>
    </div>
  `

  const compiledTemplate = handlebars.compile(htmlTemplate)

  const htmlToSend = compiledTemplate({
    name: data.name,
    email: data.email,
    phoneNumber: data.phoneNumber || 'Not provided',
    company: data.company || 'Not provided',
    role: data.role || 'Not provided',
    industry: data.industry || 'Not provided',
  })

  const textToSend = `
New appointment request

Name: ${data.name}
Email: ${data.email}
Phone number: ${data.phoneNumber || 'Not provided'}
Company: ${data.company || 'Not provided'}
Role: ${data.role || 'Not provided'}
Industry: ${data.industry || 'Not provided'}
  `.trim()

  try {
    await transporter.sendMail({
      from: `"MHM Digital Website" <${smtpUser}>`,
      to: receiverEmail,
      replyTo: data.email,
      subject: `New appointment request from ${data.name}`,
      text: textToSend,
      html: htmlToSend,
    })

    return {
      success: true,
      message: 'Appointment request sent successfully.',
    }
  } catch (error) {
    console.error('Error sending appointment email:', error)

    return {
      success: false,
      error: 'Error while sending appointment request.',
    }
  }
}