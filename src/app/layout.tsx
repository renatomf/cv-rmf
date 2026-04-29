import { Jost } from "next/font/google";
import { Toaster } from "sonner";

import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-context";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { Metadata } from "next";
import { metadata as siteMetadata } from "@/config/metadata";
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL("https://renatomf.is-a.dev"),
  ...siteMetadata["pt-BR"],
  robots: {
    index: true,
    follow: true,
  },
};

const jost = Jost({ subsets: ["latin"] });

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Renato Marques",
  url: "https://renatomf.is-a.dev",
  jobTitle: "Desenvolvedor Front-End Sênior",
  description:
    "Desenvolvedor Front-End Sênior com +15 anos de experiência em React, Next.js, Angular, TypeScript, React Native e Flutter. Certificado AWS Developer Associate.",
  sameAs: [
    "https://www.linkedin.com/in/renatomf76/",
    "https://github.com/renatomf",
    "https://www.instagram.com/renatomardev/",
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "Angular",
    "Vue.js",
    "TypeScript",
    "JavaScript",
    "React Native",
    "Flutter",
    "Node.js",
    "AWS",
    "GraphQL",
    "PostgreSQL",
    "MongoDB",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <html lang="pt-BR" className={`${jost.className} antialiased`} suppressHydrationWarning>
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </head>
        <body className="bg-background text-foreground">
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <Toaster position="bottom-right" toastOptions={{ style: { zIndex: 5000 } }} />
            <TooltipProvider>
              <main>{children}</main>
            </TooltipProvider>
          </ThemeProvider>
        </body>
      </html>
    </LanguageProvider>
  );
}
