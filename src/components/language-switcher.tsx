"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch"; // Ajuste caminho
import { useLanguage } from "./language-context";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const [isEnglish, setIsEnglish] = useState(false);

  const { theme } = useTheme();

  useEffect(() => {
    setIsEnglish(locale === "en");
  }, [locale]);

  const toggleLanguage = () => {
    const newValue = !isEnglish;
    setIsEnglish(newValue);
    setLocale(newValue ? "en" : "pt");
  };

  // Define classes dinâmicas para o switch de acordo com o tema
  const switchClassName =
    theme === "dark"
      ? "bg-blue-600" // exemplo cor azul no dark
      : "bg-gray-300"; // exemplo cinza claro no light

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={toggleLanguage}
      onKeyDown={(e) => e.key === "Enter" && toggleLanguage()}
      className="flex items-center justify-center h-9 px-4 pt-1 bg-background rounded-md text-muted-foreground select-none cursor-pointer shadow-[0_3px_4px_rgba(0,0,0,0.1)] gap-x-2 text-xs uppercase"
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



// "use client";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useLanguage } from "./language-context";

// const languages = [
//   { value: "pt", label: "PT" },
//   { value: "en", label: "EN" },
// ] as const;

// export function LanguageSwitcher() {
//   const { locale, setLocale } = useLanguage();

//   return (
//     <Select
//       value={locale}
//       onValueChange={(value) => setLocale(value as "pt" | "en")}
//     >
//       <SelectTrigger className="w-[80px] h-[40px] text-xs bg-background text-muted-foreground">
//         <SelectValue placeholder="Language" />
//       </SelectTrigger>
//       {/* Position "popper" habilita portal, evitando problemas de overflow */}
//       <SelectContent
//         align="end"
//         position="popper"
//         className="w-auto min-w-[10px] max-w-xs z-[9999] bg-background text-muted-foreground"
//       >
//         {languages.map(({ value, label }) => (
//           <SelectItem key={value} value={value}>
//             {label}
//           </SelectItem>
//         ))}
//       </SelectContent>
//     </Select>
//   );
// }
