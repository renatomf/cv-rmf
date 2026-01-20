"use client";

import { ArrowUpFromLine } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ScrollToTopButtonProps {
  scrollToSection: (href: string) => void;
}

export function ScrollToTopButton({ scrollToSection }: ScrollToTopButtonProps) {
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollMax, setScrollMax] = useState(0);

  useEffect(() => {
    const c1 = document.querySelector(".cv__content") as HTMLElement | null;
    const c2 = document.querySelector(".rmf_cv") as HTMLElement | null;
    let container: HTMLElement | Window = window;

    const canScroll = (el: HTMLElement) => el.scrollHeight > el.clientHeight;
    if (c1 && canScroll(c1)) container = c1;
    else if (c2 && canScroll(c2)) container = c2;

    const onScroll = () => {
      if (container instanceof Window) {
        setScrollTop(window.scrollY || document.documentElement.scrollTop);
        setScrollMax(document.documentElement.scrollHeight - window.innerHeight);
      } else {
        setScrollTop(container.scrollTop);
        setScrollMax(container.scrollHeight - container.clientHeight);
      }
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  const isVisible = scrollTop >= scrollMax - 20;

  const scrollToTop = () => scrollToSection("#cv_header");

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-2 left-0 right-0 z-[9000] px-1 flex justify-center md:justify-end">
          <motion.button
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 0.6 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="flex items-center justify-center w-12 h-12 rounded-lg dark:text-black text-white shadow-lg bg-primary hover:bg-[#0bafac] focus:outline-none focus:ring-2 focus:ring-bg-primary/80"
          >
            <ArrowUpFromLine className="w-6 h-6" />
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
}
