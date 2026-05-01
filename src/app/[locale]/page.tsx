import { notFound } from "next/navigation";
import Home from "@/components/home";

const locales = ["pt", "en"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  return <Home />;
}