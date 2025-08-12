"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Switch } from "./ui/switch";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    const newValue = !isDark;
    setIsDark(newValue);
    setTheme(newValue ? "dark" : "light");
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={toggleTheme}
      onKeyDown={(e) => e.key === "Enter" && toggleTheme()}
      className="flex items-center justify-center h-9 px-4 pt-1 bg-background rounded-md text-muted-foreground select-none cursor-pointer gap-x-2 text-xs uppercase"
    >
      <span>Light</span>
      <div onClick={(e) => e.stopPropagation()} className="pt-0.5">
        <Switch checked={isDark} onCheckedChange={toggleTheme} />
      </div>
      <span>Dark</span>
    </div>
  );
}
