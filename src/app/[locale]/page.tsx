import { notFound } from "next/navigation";
import Home from "../(cv)/page";

const locales = ["pt", "en"];

export default function Page({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  return <Home locale={locale as "pt" | "en"} />;
}