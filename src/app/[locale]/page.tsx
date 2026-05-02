import { notFound } from "next/navigation";

import { locales, Locale } from "@/i18n/config";
import { HomePage } from "./home-page";

export  function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return <HomePage />;
}