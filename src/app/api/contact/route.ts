import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const LIMIT = 3;
const WINDOW_MS = 60 * 60 * 1000; // 1 hora

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (entry.count >= LIMIT) return false;

  entry.count++;
  return true;
}

const emailTemplate = (name: string, email: string, phone: string | undefined, message: string) => {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = phone ? escapeHtml(phone) : undefined;
  const safeMessage = escapeHtml(message);

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0; padding:0; background-color:#0f0f0f; font-family: Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f0f0f; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background-color:#1a1a1a; border-radius:12px; overflow:hidden; border:1px solid #2a2a2a;">

          <!-- Header -->
          <tr>
            <td style="background-color:#0bafac; padding:32px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="48" style="vertical-align:middle; padding-right:16px;">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M30 28V12C30 10.8954 29.1046 10 28 10H27.8994C27.369 10 26.8604 10.2109 26.4854 10.5859L10.5859 26.4854C10.2109 26.8604 10 27.369 10 27.8994V40H0V27.8994C2.15312e-05 24.7168 1.26423 21.6645 3.51465 19.4141L19.4141 3.51465C21.6645 1.26423 24.7168 2.1373e-05 27.8994 0H28C34.6274 0 40 5.37258 40 12V28C40 34.6274 34.6274 40 28 40H14V30H28C29.1046 30 30 29.1046 30 28Z M0 0H17L7 10H0V0Z" fill="white"/>
                    </svg>
                  </td>
                  <td style="vertical-align:middle;">
                    <p style="margin:0; color:rgba(255,255,255,0.75); font-size:11px; letter-spacing:2px; text-transform:uppercase; font-weight:600;">Portfólio</p>
                    <h1 style="margin:4px 0 0; color:#ffffff; font-size:22px; font-weight:700; letter-spacing:-0.5px;">Renato Marques Ferreira</h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Accent bar -->
          <tr>
            <td style="height:3px; background: linear-gradient(90deg, #0bafac, #09d4d0, #0bafac);"></td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">

              <p style="margin:0 0 28px; color:#a0a0a0; font-size:14px; line-height:1.6;">
                Você recebeu uma nova mensagem através do formulário de contato do seu portfólio.
              </p>

              <!-- Info cards -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">

                <!-- Nome -->
                <tr>
                  <td style="padding-bottom:8px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#242424; border-radius:8px; border-left:3px solid #0bafac;">
                      <tr>
                        <td style="padding:14px 18px;">
                          <p style="margin:0 0 4px; font-size:10px; color:#0bafac; text-transform:uppercase; letter-spacing:1.5px; font-weight:700;">Nome</p>
                          <p style="margin:0; font-size:16px; color:#f0f0f0; font-weight:500;">${safeName}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Email -->
                <tr>
                  <td style="padding-bottom:8px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#242424; border-radius:8px; border-left:3px solid #0bafac;">
                      <tr>
                        <td style="padding:14px 18px;">
                          <p style="margin:0 0 4px; font-size:10px; color:#0bafac; text-transform:uppercase; letter-spacing:1.5px; font-weight:700;">E-mail</p>
                          <a href="mailto:${safeEmail}" style="margin:0; font-size:16px; color:#0bafac; font-weight:500; text-decoration:none;">${safeEmail}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                ${safePhone ? `
                <!-- Telefone -->
                <tr>
                  <td style="padding-bottom:8px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#242424; border-radius:8px; border-left:3px solid #0bafac;">
                      <tr>
                        <td style="padding:14px 18px;">
                          <p style="margin:0 0 4px; font-size:10px; color:#0bafac; text-transform:uppercase; letter-spacing:1.5px; font-weight:700;">Telefone</p>
                          <p style="margin:0; font-size:16px; color:#f0f0f0; font-weight:500;">${safePhone}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>` : ""}

                <!-- Mensagem -->
                <tr>
                  <td>
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#242424; border-radius:8px; border-left:3px solid #0bafac;">
                      <tr>
                        <td style="padding:14px 18px;">
                          <p style="margin:0 0 8px; font-size:10px; color:#0bafac; text-transform:uppercase; letter-spacing:1.5px; font-weight:700;">Mensagem</p>
                          <p style="margin:0; font-size:15px; color:#d0d0d0; line-height:1.7; white-space:pre-wrap;">${safeMessage}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
};

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Muitas requisições. Tente novamente mais tarde." },
      { status: 429 }
    );
  }

  const { name, email, phone, message } = await req.json();

  const { error } = await resend.emails.send({
    from: "Portfólio <onboarding@resend.dev>",
    to: process.env.CONTACT_EMAIL!,
    replyTo: email,
    subject: `Nova mensagem de ${escapeHtml(name)}`,
    html: emailTemplate(name, email, phone, message),
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
