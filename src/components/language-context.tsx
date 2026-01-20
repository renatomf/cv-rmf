"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import messagesData from "@/data/messages.json" assert { type: "json" };

type Locale = "pt" | "en";

interface LanguageContextProps {
  locale: Locale;
  messages: typeof messagesData["pt"];
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Locale>("pt");

  const value: LanguageContextProps = {
    locale,
    messages: messagesData[locale],
    setLocale,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};
