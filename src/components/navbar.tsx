"use client";

import { Menu, X, Home, User, Briefcase, GraduationCap, Wrench, Mail } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./toggle-mode-button";
import { LanguageSwitcher } from "./language-switcher";
import { useLanguage } from "@/components/language-context";

interface NavbarProps {
  scrollToSection: (href: string) => void;
  activeSection: string;
  show: boolean;
}

export const Navbar = ({ scrollToSection, activeSection, show }: NavbarProps) => {
  const { messages } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = useMemo(
    () => [
      { icon: Home, label: messages.nav?.home ?? "Início", href: "#cv_header" },
      { icon: User, label: messages.nav?.biography ?? "Biografia", href: "#cv_biography" },
      { icon: GraduationCap, label: messages.nav?.education ?? "Educação", href: "#cv_education" },
      { icon: Briefcase, label: messages.nav?.experience ?? "Experiência", href: "#cv_experience" },
      { icon: Wrench, label: messages.nav?.skills ?? "Habilidades", href: "#cv_skills" },
      { icon: Mail, label: messages.nav?.contact ?? "Contato", href: "#contact" },
    ],
    [messages]
  );

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
  }, [isMenuOpen]);

  if (!show) return null;

  return (
    <nav className="navbar fixed top-0 left-0 right-0 h-[70px] xl:h-[50px] z-[10000] pl-[50px] pr-[70px] flex items-center justify-between text-white xl:text-black bg-black xl:bg-transparent">
      {/* Botão de menu */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
      >
        <Button
          className="flex items-center gap-2 font-medium hover:text-foreground transition-colors relative z-50"
          variant="ghost"
          aria-label={messages.nav?.menu ?? "Menu"}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu style={{ width: 22, height: 22 }} />
          <span>MENU</span>
        </Button>
      </motion.div>

      {/* Toggle tema e idioma */}
      <motion.div
        className="hidden md:flex flex-row items-center gap-2"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
      >
        <ThemeToggle />
        <LanguageSwitcher />
      </motion.div>

      {/* Menu lateral */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-[2px] z-[9999]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />

            <motion.div
              className="fixed top-0 right-0 h-screen w-full md:w-[35%] xl:w-1/4 2xl:w-1/5 bg-black/95 backdrop-blur z-[11000] overflow-y-auto"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3 }}
            >
              {/* Botão de fechar */}
              <div className="absolute top-4 right-4 z-10">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full bg-white/20 backdrop-blur"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label={messages.nav?.closeMenu ?? "Fechar menu"}
                >
                  <X className="h-5 w-5 text-white" />
                </Button>
              </div>

              {/* Itens do menu */}
              <div className="p-4 flex flex-col gap-2 mt-14">
                {menuItems.map((item) => (
                  <Button
                    key={item.href}
                    variant="ghost"
                    className={`w-full justify-start text-left h-14 px-4 hover:bg-accent/5 hover:text-[#0bafac] text-base ${
                      activeSection === item.href ? "text-[#0bafac]" : "text-white"
                    }`}
                    onClick={() => {
                      scrollToSection(item.href);
                      setIsMenuOpen(false);
                    }}
                    aria-current={activeSection === item.href ? "page" : undefined}
                  >
                    <item.icon className="mr-4 h-6 w-6" />
                    {item.label}
                  </Button>
                ))}
              </div>

              {/* Tema e idioma dentro do menu */}
              <div className="flex flex-col gap-4 mt-8 pt-6 border-t border-white/20 px-4">
                <div className="flex items-center justify-between p-4 bg-black rounded-lg">
                  <span className="text-sm font-medium text-white">{messages.nav?.theme ?? "Tema"}</span>
                  <ThemeToggle />
                </div>
                <div className="flex items-center justify-between p-4 bg-black rounded-lg">
                  <span className="text-sm font-medium text-white">{messages.nav?.language ?? "Idioma"}</span>
                  <LanguageSwitcher />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};
