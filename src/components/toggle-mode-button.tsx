import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { Switch } from "./ui/switch";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(theme === "dark");
  }, [theme]);

  const handleToggle = (checked: boolean) => {
    setIsDark(checked);
    setTheme(checked ? "dark" : "light");
  };

  return (
    <div className="flex flex-row items-center h-9 px-[15px] my-[7px] bg-background rounded-full text-muted-foreground select-none cursor-pointer shadow-[0_3px_4px_rgba(0,0,0,0.3)] gap-x-4" >
      Light
      <Switch checked={isDark} onCheckedChange={handleToggle} />
      Dark
    </div>
  );
}
