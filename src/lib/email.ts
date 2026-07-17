import nodemailer, { type Transporter } from "nodemailer";
import { siteConfig } from "@/data/site";

let cachedTransporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (cachedTransporter) return cachedTransporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error(
      "Email is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS in your environment (see .env.example)."
    );
  }

  cachedTransporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  return cachedTransporter;
}

const brandFooter = `
  <p style="margin-top:24px;padding-top:16px;border-top:1px solid #e2e8f0;color:#64748b;font-size:12px;">
    ${siteConfig.name} · ${siteConfig.locations.headquarters.addressLines.join(", ")}
  </p>
`;

function wrapEmail(title: string, bodyHtml: string): string {
  return `
    <div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;color:#0f172a;">
      <h2 style="color:#2563eb;margin-bottom:8px;">${title}</h2>
      ${bodyHtml}
      ${brandFooter}
    </div>
  `;
}

function row(label: string, value: string): string {
  return `<p style="margin:4px 0;"><strong>${label}:</strong> ${escapeHtml(value)}</p>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const toEmail = process.env.CONTACT_TO_EMAIL || siteConfig.email.contact;

type CareerNotificationInput = {
  name: string;
  email: string;
  phone: string;
  position: string;
  message?: string;
  attachment?: { filename: string; content: Buffer; contentType: string };
};

export async function sendCareerNotification(data: CareerNotificationInput) {
  const transporter = getTransporter();
  const html = wrapEmail(
    "New Job Application",
    [
      row("Name", data.name),
      row("Email", data.email),
      row("Phone", data.phone),
      row("Position", data.position),
      data.message
        ? `<p style="margin-top:12px;"><strong>Message:</strong></p><p style="white-space:pre-wrap;">${escapeHtml(data.message)}</p>`
        : "",
    ].join("")
  );

  await transporter.sendMail({
    from: `"${siteConfig.name} Careers" <${process.env.SMTP_USER}>`,
    to: process.env.CAREERS_TO_EMAIL || siteConfig.email.careers,
    replyTo: data.email,
    subject: `New application: ${data.position} — ${data.name}`,
    html,
    attachments: data.attachment ? [data.attachment] : undefined,
  });
}

export async function sendNewsletterNotification(email: string) {
  const transporter = getTransporter();
  const html = wrapEmail("New Newsletter Subscriber", row("Email", email));

  await transporter.sendMail({
    from: `"${siteConfig.name} Website" <${process.env.SMTP_USER}>`,
    to: toEmail,
    subject: `New newsletter subscriber: ${email}`,
    html,
  });
}

export async function sendCareerThankYou(data: { name: string; email: string; position: string }) {
  const transporter = getTransporter();
  const html = wrapEmail(
    `Thanks for applying, ${data.name.split(" ")[0]}!`,
    `<p>We've received your application for <strong>${escapeHtml(data.position)}</strong> and our talent team will review it shortly.</p>
     <p>If your background looks like a fit, we'll reach out to schedule a conversation.</p>
     <p>— The ${siteConfig.name} Talent Team</p>`
  );

  await transporter.sendMail({
    from: `"${siteConfig.name} Careers" <${process.env.SMTP_USER}>`,
    to: data.email,
    subject: `We've received your application for ${data.position}`,
    html,
  });
}
