import { Jost } from "next/font/google";
import { Toaster } from "sonner";
import type { Metadata } from "next";

import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-context";
import { TooltipProvider } from "@/components/ui/tooltip";
import { metadata as siteMetadata } from "@/config/metadata";

import "./globals.css";

const jost = Jost({ subsets: ["latin"] });

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

/**
 * ✅ Normaliza locale da URL
 */
function normalizeLocale(locale: string): "pt-BR" | "en-US" {
  return locale === "en" ? "en-US" : "pt-BR";
}

/**
 * ✅ Metadata dinâmica baseada na rota (/pt ou /en)
 */
export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const localeKey = normalizeLocale(params.locale);

  return {
    metadataBase: new URL("https://renatomf.is-a.dev"),
    ...siteMetadata[localeKey],
  };
}

/**
 * ✅ JSON-LD dinâmico (SEO)
 */
function getJsonLd(locale: "pt" | "en") {
  if (locale === "en") {
    return {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Renato Marques",
      url: "https://renatomf.is-a.dev/en",
      jobTitle: "Senior Front-End Developer",
      description:
        "Senior Front-End Developer with 15+ years of experience in React, Next.js, Angular, TypeScript, React Native and Flutter. AWS Developer Associate certified.",
      sameAs: [
        "https://www.linkedin.com/in/renatomf76/",
        "https://github.com/renatomf",
        "https://www.instagram.com/renatomardev/",
      ],
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Renato Marques",
    url: "https://renatomf.is-a.dev/pt",
    jobTitle: "Desenvolvedor Front-End Sênior",
    description:
      "Desenvolvedor Front-End Sênior com +15 anos de experiência em React, Next.js, Angular, TypeScript, React Native e Flutter. Certificado AWS Developer Associate.",
    sameAs: [
      "https://www.linkedin.com/in/renatomf76/",
      "https://github.com/renatomf",
      "https://www.instagram.com/renatomardev/",
    ],
  };
}

export default function RootLayout({ children, params }: Props) {
  const locale = params.locale === "en" ? "en" : "pt";
  const htmlLang = locale === "en" ? "en-US" : "pt-BR";

  const jsonLd = getJsonLd(locale);

  return (
    <html
      lang={htmlLang}
      className={`${jost.className} antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* ✅ JSON-LD dinâmico */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>

      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {/* ✅ locale vindo da URL */}
          <LanguageProvider locale={locale}>
            <Toaster
              position="bottom-right"
              toastOptions={{ style: { zIndex: 5000 } }}
            />

            <TooltipProvider>
              {children}
            </TooltipProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}