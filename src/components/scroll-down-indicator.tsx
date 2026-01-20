"use client";

import { ChevronsDown, Mouse } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ScrollDownIndicatorProps {
  loading: boolean;
}

export function ScrollDownIndicator({ loading }: ScrollDownIndicatorProps) {
  const [showIndicator, setShowIndicator] = useState(false);
  const [visible, setVisible] = useState(false);
  const [initialDelayPassed, setInitialDelayPassed] = useState(false);

  useEffect(() => {
    function checkScreen() {
      setShowIndicator(window.innerWidth >= 1280);
    }

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    if (!showIndicator || loading) {
      setVisible(false);
      return;
    }

    const scrollContainer =
      document.querySelector(".cv__content") ||
      document.querySelector(".rmf_cv") ||
      window;

    function handleScroll() {
      let scrollPosition = 0;
      if (scrollContainer instanceof Window) {
        scrollPosition = window.scrollY || document.documentElement.scrollTop;
      } else {
        scrollPosition = (scrollContainer as HTMLElement).scrollTop;
      }

      setVisible(scrollPosition <= 100);
    }

    if (!initialDelayPassed) {
      const timeout = setTimeout(() => {
        setInitialDelayPassed(true);
        handleScroll();
      }, 1600);
      return () => clearTimeout(timeout);
    } else {
      handleScroll();
    }

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, [showIndicator, loading, initialDelayPassed]);

  if (!showIndicator || !visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-16 2xl:bottom-28 left-3/5 -translate-x-3/5 z-[9999] flex-col items-center text-black dark:text-white select-none flex"
        >
          <div>
            <Mouse className="w-6 h-6 opacity-60" color="black" />
          </div>

          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{
              repeat: Infinity,
              duration: 0.5,
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
