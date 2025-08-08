import { useState, useEffect } from "react";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./toggle-mode-button";
import { motion } from "framer-motion";

export const Navbar = () => {
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const variants = {
    hidden: { x: 50, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1, 
      transition: { duration: 0.2 }
    },
  };

  return (
    <nav className="w-full h-[50px] flex items-center justify-end pr-[60px] duration-300 z-10 absolute bg-transparent max-[425px]:bg-background max-[425px]:justify-start max-[425px]:pr-4 max-[425px]:rounded-[10px] mb-2 max-[425px]:gap-2">
      <motion.div
        className="scale-80 origin-right"
        initial="hidden"
        animate={startAnimation ? "visible" : "hidden"}
        variants={variants}
      >
        <ThemeToggle />
      </motion.div>
      <motion.div
        className="scale-80 origin-right"
        initial="hidden"
        animate={startAnimation ? "visible" : "hidden"}
        variants={variants}
      >
        <LanguageSwitcher />
      </motion.div>
    </nav>
  );
};
