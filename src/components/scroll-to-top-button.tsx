"use client";

import { ArrowUpFromLine } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ScrollToTopButton() {
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollMax, setScrollMax] = useState(0);
  const [scrollContainer, setScrollContainer] = useState<Window | HTMLElement | null>(null);

  useEffect(() => {
    // Tenta selecionar o container que possui scroll
    let container: HTMLElement | Window | null = null;
    const c1 = document.querySelector(".cv__content");
    const c2 = document.querySelector(".rmf_cv");

    // Verifica se esses containers realmente podem scrollar
    function canScroll(el: HTMLElement) {
      return el.scrollHeight > el.clientHeight;
    }

    if (c1 && canScroll(c1)) {
      container = c1;
    } else if (c2 && canScroll(c2)) {
      container = c2;
    } else {
      container = window;
    }

    setScrollContainer(container);

    function onScroll() {
      if (container instanceof Window) {
        setScrollTop(window.scrollY || document.documentElement.scrollTop);
        setScrollMax(document.documentElement.scrollHeight - window.innerHeight);
      } else {
        setScrollTop(container.scrollTop);
        setScrollMax(container.scrollHeight - container.clientHeight);
      }
    }

    container.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      container.removeEventListener("scroll", onScroll);
    };
  }, []);

  const isAtBottom = scrollMax > 100 && scrollTop >= scrollMax - 20;

  function scrollToTop() {
    if (!scrollContainer) return;

    if (scrollContainer instanceof Window) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <AnimatePresence>
      {isAtBottom && (
        <div className="fixed bottom-1 left-0 right-0 z-[9999] px-1 flex justify-center md:justify-end">
          <motion.button
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 0.6 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className="flex items-center justify-center w-12 h-12 rounded-lg dark:text-black text-white shadow-lg bg-primary hover:bg-[#0bafac] focus:outline-none focus:ring-2 focus:ring-bg-primary/80"
            aria-label="Scroll to top"
            title="Scroll to top"
          >
            <ArrowUpFromLine className="w-6 h-6" />
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
}
