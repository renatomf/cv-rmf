"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Switch } from "./ui/switch";

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  // Se o theme for "system", usamos o theme do sistema
  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  const toggleTheme = () => {
    // Se estiver seguindo o sistema, alternamos manualmente para o oposto
    if (theme === "system") {
      setTheme(isDark ? "light" : "dark");
    } else {
      setTheme(isDark ? "light" : "dark");
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={toggleTheme}
      onKeyDown={(e) => e.key === "Enter" && toggleTheme()}
      className="flex items-center justify-center h-9 px-4 pt-1 bg-card rounded-md text-muted-foreground select-none cursor-pointer gap-x-2 text-xs uppercase scale-80 origin-right"
    >
      <span>Light</span>
      <div onClick={(e) => e.stopPropagation()} className="pt-0.5">
        <Switch checked={isDark} onCheckedChange={toggleTheme} />
      </div>
      <span>Dark</span>
    </div>
  );
}
