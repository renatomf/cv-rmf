import { Jost } from "next/font/google";
import { Toaster } from "sonner";

import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-context";
import { TooltipProvider } from "@/components/ui/tooltip";
import './globals.css';

const jost = Jost({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <html lang="pt-BR" className={`${jost.className} antialiased`} suppressHydrationWarning>
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
