import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { checkRateLimit } from "@/lib/rate-limit";
import { emailTemplate } from "./email-template";
import { escapeHtml } from "@/lib/sanitize";

const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.email().max(200),
  phone: z.string().max(30).optional(),
  message: z.string().min(1).max(2000),
  locale: z.enum(["pt", "en"]).default("pt"),
});

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Muitas requisições. Tente novamente mais tarde." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Dados inválidos." }, { status: 422 });
  }

  const { name, email, phone, message, locale } = parsed.data;
  const emailLocale = locale === "en" ? "en" : "pt";

  const subject = emailLocale === "en"
    ? `New message from ${escapeHtml(name)}`
    : `Nova mensagem de ${escapeHtml(name)}`;

  const { error } = await resend.emails.send({
    from: "Portfólio <onboarding@resend.dev>",
    to: process.env.CONTACT_EMAIL!,
    replyTo: email,
    subject,
    html: emailTemplate(name, email, phone, message, emailLocale),
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
