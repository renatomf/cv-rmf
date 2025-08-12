"use client";

import { ChevronsDown, Mouse, Pointer } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ScrollDownIndicator() {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function checkMobile() {
      setIsMobile(window.innerWidth <= 768);
    }
    checkMobile();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setVisible(false);
      return;
    }

    const delayTimeout = setTimeout(() => {
      setVisible(true);
    }, 2000);

    const scrollContainer =
      document.querySelector(".cv__content") ||
      document.querySelector(".rmf_cv") ||
      window;

    function handleScroll() {
      let scrollPosition = 0;

      if (scrollContainer instanceof Window) {
        scrollPosition =
          window.scrollY || document.documentElement.scrollTop;
      } else {
        scrollPosition = (scrollContainer as HTMLElement).scrollTop;
      }

      if (scrollPosition > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    }

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(delayTimeout);
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile]);

  return (
    <AnimatePresence>
      {visible && !isMobile && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="fixed bottom-16 left-3/5 -translate-x-3/5 z-[9999] flex flex-col items-center text-black dark:text-white select-none"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          >
          </motion.div>
            <Mouse className="w-6 h-6 opacity-60" color="black" />

          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "easeInOut",
              delay: 0.2,
            }}
            className="mt-1"
          >
            <ChevronsDown className="w-5 h-5 opacity-60" color="black" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
