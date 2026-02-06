"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/components/language-context";

interface Word {
  text: string;
  color: string;
  from: number;
  delay: number;
  extraStyle?: React.CSSProperties;
}

interface TextAnimatedProps {
  loading: boolean; // recebe do Home
}

export const TextAnimated = ({ loading }: TextAnimatedProps) => {
  const { messages } = useLanguage();

  // Frases
  const animatedWords1 = messages?.header?.animatedWords1 ?? [
    "HI,",
    "I'M",
    "FRONT-END",
    "DEVELOPER",
    "AND",
    "DESIGNER",
    "...",
  ];
  const animatedWords2 = messages?.header?.animatedWords2 ?? [
    "I'M",
    "PASSIONATE",
    "ABOUT",
    "CREATING",
    "WEB",
    "INTERFACES",
    "...",
  ];

  const baseLayout: Omit<Word, "text">[] = [
    {
      color: "text-black",
      from: -350,
      delay: 0.3,
      extraStyle: { fontSize: "30px", marginRight: "30px", fontWeight: "400" },
    },
    {
      color: "text-white",
      from: -350,
      delay: 0.4,
      extraStyle: {
        filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.1))",
        fontSize: "70px",
      },
    },
    {
      color: "text-black",
      from: 450,
      delay: 0.5,
      extraStyle: {
        filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.1))",
        fontSize: "90px",
        marginLeft: "-40px",
      },
    },
    {
      color:
        "text-[10rem] font-bold bg-gradient-to-b from-teal-800 to-teal-300 bg-clip-text text-transparent",
      from: 250,
      delay: 0.6,
      extraStyle: {
        filter: `
      drop-shadow(3px 3px 6px rgba(0,0,0,1))
      drop-shadow(6px 6px 12px rgba(0,0,0,0.9))
      drop-shadow(10px 10px 20px rgba(0,0,0,0.8))
    `,
      },
    },
    {
      color: "text-white",
      from: -250,
      delay: 0.6,
      extraStyle: {
        fontSize: "50px",
        marginLeft: "-60px",
        fontWeight: "400",
      },
    },
    {
      color: "text-black",
      from: -250,
      delay: 0.6,
      extraStyle: { marginRight: "50px" },
    },
    {
      color: "text-black",
      from: -250,
      delay: 0.6,
      extraStyle: { fontSize: "20px", marginLeft: "-45px" },
    },
  ];

  const phrases: Word[][] = useMemo(
    () => [
      animatedWords1.map((text, i) => ({ ...baseLayout[i], text })),
      animatedWords2.map((text, i) => ({ ...baseLayout[i], text })),
    ],
    [animatedWords1, animatedWords2]
  );

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  // só roda o ciclo quando loading terminou
  useEffect(() => {
    if (loading) return;

    const currentPhrase = phrases[phraseIndex];
    const totalAnimationTime =
      Math.max(...currentPhrase.map((w) => w.delay)) + 0.8;

    let nextTimer: ReturnType<typeof setTimeout> | undefined;

    const timer = setTimeout(() => {
      setReverse(true);
      nextTimer = setTimeout(() => {
        setReverse(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }, 2000);
    }, (totalAnimationTime + 5) * 1000);

    return () => {
      clearTimeout(timer);
      if (nextTimer) clearTimeout(nextTimer);
    };
  }, [phraseIndex, loading, phrases]);

  // não mostra nada até loading ser false
  if (loading) return null;

  const currentWords = phrases[phraseIndex];

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 w-screen max-w-[100%]
        -translate-x-1/2 -translate-y-1/2
        text-center text-8xl font-semibold p-4
        rounded-md uppercase z-10 scale-60 select-none"
    >
      {currentWords.map((w, i) => (
        <motion.span
          key={i}
          className={`${w.color} inline-block mix-blend-overlay`}
          initial={{ x: w.from, opacity: 0, filter: "blur(20px)" }}
          animate={
            reverse
              ? { x: w.from, opacity: 0, filter: "blur(20px)" }
              : { x: 0, opacity: 1, filter: "blur(0px)" }
          }
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 20,
            delay: w.delay,
          }}
          style={{
            marginRight: i !== currentWords.length - 1 ? 80 : 0,
            ...w.extraStyle,
          }}
        >
          {w.text}{" "}
        </motion.span>
      ))}
    </motion.div>
  );
};
