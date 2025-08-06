import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./toggle-mode-button";

export const Navbar = () => {
  return (
    <nav className="w-full h-[50px] flex items-center justify-end pr-[60px] duration-300 z-10 absolute bg-transparent max-[425px]:bg-background max-[425px]:justify-start max-[425px]:pr-4 max-[425px]:rounded-[10px] mb-2 max-[425px]:gap-2">
      <div className="scale-80 origin-right">
        <ThemeToggle />
      </div>
      <div className="scale-80 origin-right">
        <LanguageSwitcher />
      </div>
    </nav>
  );
};
