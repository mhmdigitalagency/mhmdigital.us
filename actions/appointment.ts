'use server';

import { appointmentSchema } from '@/schemas';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';
import handlebars from 'handlebars';

export async function appointment(values: z.infer<typeof appointmentSchema>) {

  const parsedValues = appointmentSchema.parse(values);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "465"),
    secure: true,
    auth: {
      user: process.env.SMTP_USER, 
      pass: process.env.SMTP_PASS,
    },
  });

  const htmlTemplate = `
    <h3>New message of {{name}}</h3>
    <ul>
      <li>Name: {{name}}</li>
      <li>Email: {{email}}</li>
      <li>Phone number: {{phoneNumber}}</li>
      <li>Company: {{company}}</li>
      <li>Role: {{role}}</li>
      <li>Industry: {{industry}}</li>
    </ul>
  `;

  const compiledTemplate = handlebars.compile(htmlTemplate);
  const htmlToSend = compiledTemplate({
    name: values.name,
    email: values.email,
    phoneNumber: values.phoneNumber,
    company: values.company || "Not provided",
    role: values.role,
    industry: values.industry,
  });

  const mailOptions = {
    from: parsedValues.email,
    to: 'info@mhmdigital.us',
    subject: `New message of ${parsedValues.name}`,
    html: htmlToSend, 
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true }; 
  } catch (error) {
    console.error('Error sending email : ', error);
    return { success: false, error: 'Error while sending message.' };
  }
}
