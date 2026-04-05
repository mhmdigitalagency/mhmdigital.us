// import "server-only";
// import "dotenv/config";

// import nodemailer from "nodemailer"

// const transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST,
//       port: Number(process.env.SMTP_PORT || 465),
//       secure: true,
//       auth: {
//             user: process.env.NODEMAILER_USER,
//             pass: process.env.NODEMAILER_PASSWORD 
//       }
// })

// export default transporter

import "server-only";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 465),
  secure: Number(process.env.SMTP_PORT || 465) === 465,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

export async function verifyMailer() {
  try {
    await transporter.verify();
    console.log("SMTP server is ready");
  } catch (error) {
    console.error("SMTP verification failed:", error);
  }
}

export default transporter;