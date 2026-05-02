"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useState,
} from "react";

import translationsData from "./translations.json";
import { Locale, defaultLocale } from "./config";

interface LanguageContextProps {
  locale: Locale;
  messages: typeof translationsData["pt"];
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

interface LanguageProviderProps {
  children: ReactNode;
  locale?: Locale;
}

export const LanguageProvider = ({
  children,
  locale: initialLocale = defaultLocale,
}: LanguageProviderProps) => {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  const value = useMemo(
    () => ({
      locale,
      messages: translationsData[locale],
      setLocale,
    }),
    [locale]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
};
