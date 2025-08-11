"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/language-context";

interface Word {
  text: string;
  color: string;
  from: number;
  delay: number;
  extraStyle?: React.CSSProperties;
}

export const TextAnimated = () => {
  const { messages } = useLanguage();

  // Pega as palavras animadas do json, com fallback caso não encontre
  const animatedWords = messages?.header?.animatedWords ?? [
    "HI,",
    "I'M",
    "FRONT-END",
    "DEVELOPER",
    "AND",
    "DESIGNER",
    "...",
  ];

  const words: Word[] = [
    { text: animatedWords[0], color: "text-black", from: -350, delay: 0.3 },
    { text: animatedWords[1], color: "text-white", from: -350, delay: 0.4 },
    { text: animatedWords[2], color: "text-black", from: 450, delay: 0.5 },
    {
      text: animatedWords[3],
      color:
        "text-[9rem] font-bold bg-gradient-to-b from-teal-800 to-teal-300 bg-clip-text text-transparent",
      from: 250,
      delay: 0.6,
      extraStyle: {
        filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.2)) saturate(0.5px)",
      },
    },
    { text: animatedWords[4], color: "text-white", from: -250, delay: 0.6 },
    { text: animatedWords[5], color: "text-black", from: -250, delay: 0.6 },
    { text: animatedWords[6], color: "text-white", from: -250, delay: 0.6 },
  ];

  return (
    <div
      className="absolute top-1/2 left-1/2 w-screen max-w-[100%]
        -translate-x-1/2 -translate-y-1/2
        text-center text-8xl font-semibold p-4
        rounded-md uppercase z-10 scale-60"
      aria-label="Animated introduction text"
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          className={`${w.color} mix-blend-overlay inline-block`}
          initial={{ x: w.from, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 20,
            delay: w.delay,
          }}
          style={{
            marginRight: i !== words.length - 1 ? 30 : 0,
            ...w.extraStyle,
          }}
        >
          {w.text}{" "}
        </motion.span>
      ))}
    </div>
  );
};
