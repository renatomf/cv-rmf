import { NextRequest, NextResponse } from "next/server";

import { locales, defaultLocale } from "@/i18n/config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (hasLocale) return NextResponse.next();

  if (pathname !== "/") return NextResponse.next();

  const acceptLanguage = request.headers.get("accept-language") ?? "";
  const preferred = acceptLanguage.split(",")[0].trim().toLowerCase();
  const locale = preferred.startsWith("en") ? "en" : defaultLocale;

  return NextResponse.redirect(new URL(`/${locale}`, request.url), 308);
}

export const config = {
  matcher: ["/((?!_next|api|favicon|icon|sitemap|robots|opengraph).*)"],
};
