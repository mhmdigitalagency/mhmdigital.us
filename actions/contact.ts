'use server'

import { contactSchema } from '@/schemas'
import nodemailer from 'nodemailer'
import { z } from 'zod'
import handlebars from 'handlebars'

type ContactValues = z.infer<typeof contactSchema>

export async function contact(values: ContactValues) {
  const parsedValues = contactSchema.safeParse(values)

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
  const smtpPassword = process.env.NODEMAILER_PASSWORD
  const contactReceiver = process.env.CONTACT_RECEIVER

  if (!smtpHost || !smtpUser || !smtpPassword || !contactReceiver) {
    console.error('Missing SMTP or contact receiver environment variables.')
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
      pass: smtpPassword,
    },
  })

  const htmlTemplate = `
    <div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #111;">
      <h2 style="margin-bottom: 16px;">New contact form submission</h2>
      
      <p style="margin: 0 0 12px;">
        You received a new message from your website contact form.
      </p>

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
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Service requested</td>
          <td style="padding: 8px; border: 1px solid #ddd;">{{service}}</td>
        </tr>
      </table>

      <div style="margin-top: 20px;">
        <h3 style="margin-bottom: 8px;">Project description</h3>
        <div style="padding: 14px; border: 1px solid #ddd; background: #f9f9f9; white-space: pre-line;">
          {{description}}
        </div>
      </div>
    </div>
  `

  const compiledTemplate = handlebars.compile(htmlTemplate)

  const templateData = {
    name: data.name,
    email: data.email,
    phoneNumber: data.phoneNumber || 'Not provided',
    company: data.company || 'Not provided',
    service: data.service,
    description: data.description,
  }

  const htmlToSend = compiledTemplate(templateData)

  const textToSend = `
New contact form submission

Name: ${data.name}
Email: ${data.email}
Phone number: ${data.phoneNumber || 'Not provided'}
Company: ${data.company || 'Not provided'}
Service requested: ${data.service}

Project description:
${data.description}
  `.trim()

  const mailOptions = {
    from: `"MHM Digital Website" <${smtpUser}>`,
    to: contactReceiver,
    replyTo: data.email,
    subject: `New message from ${data.name}`,
    text: textToSend,
    html: htmlToSend,
  }

  try {
    await transporter.sendMail(mailOptions)

    return {
      success: true,
      message: 'Message sent successfully.',
    }
  } catch (error) {
    console.error('Error sending email:', error)

    return {
      success: false,
      error: 'Error while sending message.',
    }
  }
}