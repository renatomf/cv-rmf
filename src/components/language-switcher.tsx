"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "./language-context";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const { theme } = useTheme();
  const isEnglish = locale === "en";

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleLanguage = () => {
    setLocale(isEnglish ? "pt" : "en");
  };

  const switchClassName =
    theme === "dark" ? "bg-blue-600" : "bg-gray-300";

  if (!mounted) return null;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={toggleLanguage}
      onKeyDown={(e) => e.key === "Enter" && toggleLanguage()}
      className="flex items-center justify-center h-9 px-4 pt-1 bg-card rounded-md text-muted-foreground select-none cursor-pointer gap-x-2 text-xs uppercase scale-80 origin-right"
    >
      <span>PT</span>
      <div onClick={(e) => e.stopPropagation()} className="pt-0.5">
        <Switch
          checked={isEnglish}
          onCheckedChange={toggleLanguage}
          className={switchClassName}
        />
      </div>
      <span>EN</span>
    </div>
  );
}
