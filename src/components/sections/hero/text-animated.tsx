"use client";

import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/i18n";

// ─────────────────────────────────────────────
// PALAVRAS + ESTILO POR IDIOMA
//
// Cada palavra tem:
//   text        — o texto exibido
//   color       — classe Tailwind de cor / gradiente
//   from        — posição X inicial da animação (negativo = vem da esquerda)
//   delay       — delay de entrada em segundos
//   fontSize    — tamanho da fonte (ex: "40px"). undefined = herda o container
//   fontWeight  — peso da fonte (ex: "400", "700"). undefined = herda
//   marginLeft  — deslocamento à esquerda (ex: "-40px"). undefined = sem margem
//   marginRight — deslocamento à direita (ex: "30px"). undefined = sem margem
//   filter      — CSS filter adicional (ex: drop-shadow). undefined = sem filtro
// ─────────────────────────────────────────────

const PHRASES = {
  pt: {
    phrase1: [
      {
        text: "OLÁ,",
        color: "text-black",
        from: -650,
        delay: 0.3,
        fontSize: "30px",
        fontWeight: "400",
        marginLeft: "-660px",
        marginRight: "0px",
        filter: undefined,
      },
      {
        text: "EU SOU",
        color: "text-white",
        from: 650,
        delay: 0.4,
        fontSize: "70px",
        fontWeight: undefined,
        marginLeft: "50px",
        marginRight: "200px",
        filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.2))",
      },
      {
        text: "DESENVOLVEDOR",
        color: "text-[9rem] font-bold bg-gradient-to-b from-teal-800 to-teal-300 bg-clip-text text-transparent",
        from: 250,
        delay: 0.6,
        fontSize: undefined,
        fontWeight: undefined,
        marginLeft: undefined,
        marginRight: undefined,
        filter: `drop-shadow(3px 3px 6px rgba(0,0,0,1)) drop-shadow(6px 6px 12px rgba(0,0,0,0.9)) drop-shadow(10px 10px 20px rgba(0,0,0,0.8))`,
      },
      {
        text: "FRONT-END",
        color: "text-black",
        from: -450,
        delay: 0.5,
        fontSize: "100px",
        fontWeight: undefined,
        marginLeft: "40px",
        marginRight: undefined,
        filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.1))",
      },
      
      {
        text: "SÊNIOR",
        color: "text-white",
        from: 450,
        delay: 0.5,
        fontSize: "80px",
        fontWeight: undefined,
        marginLeft: "380px",
        marginRight: "0px",
        marginTop: "10px",
        filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.2))",
      },

    ],
    phrase2: [
      {
        text: "EU SOU",
        color: "text-black",
        from: -350,
        delay: 0.3,
        fontSize: "30px",
        fontWeight: "400",
        marginLeft: undefined,
        marginRight: "30px",
        filter: undefined,
      },
      {
        text: "APAIXONADO",
        color: "text-white",
        from: -350,
        delay: 0.4,
        fontSize: "90px",
        fontWeight: undefined,
        marginLeft: undefined,
        marginRight: undefined,
        filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.1))",
      },
      {
        text: "EM",
        color: "text-black",
        from: 450,
        delay: 0.5,
        fontSize: "40px",
        fontWeight: undefined,
        marginLeft: "-40px",
        marginRight: undefined,
        filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.1))",
      },
      {
        text: "CRIAR",
        color: "text-[10rem] font-bold bg-gradient-to-b from-teal-800 to-teal-300 bg-clip-text text-transparent",
        from: 250,
        delay: 0.6,
        fontSize: undefined,
        fontWeight: undefined,
        marginLeft: undefined,
        marginRight: undefined,
        filter: `drop-shadow(3px 3px 6px rgba(0,0,0,1)) drop-shadow(6px 6px 12px rgba(0,0,0,0.9)) drop-shadow(10px 10px 20px rgba(0,0,0,0.8))`,
      },
      {
        text: "SOLUÇÕES",
        color: "text-white",
        from: -250,
        delay: 0.6,
        fontSize: "50px",
        fontWeight: "400",
        marginLeft: "-60px",
        marginRight: undefined,
        filter: undefined,
      },
      {
        text: "DIGITAIS",
        color: "text-black",
        from: -250,
        delay: 0.6,
        fontSize: undefined,
        fontWeight: undefined,
        marginLeft: undefined,
        marginRight: "50px",
        filter: undefined,
      },
    ],
  },
  en: {
    phrase1: [
      {
        text: "HI,",
        color: "text-black",
        from: -350,
        delay: 0.3,
        fontSize: "30px",
        fontWeight: "400",
        marginLeft: "-700px",
        marginRight: "30px",
        filter: undefined,
      },
      {
        text: "I'M A",
        color: "text-white",
        from: 450,
        delay: 0.4,
        fontSize: "70px",
        fontWeight: undefined,
        marginLeft: undefined,
        marginRight: undefined,
        filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.1))",
      },
      {
        text: "SENIOR",
        color: "text-black",
        from: -450,
        delay: 0.5,
        fontSize: "90px",
        fontWeight: undefined,
        marginLeft: "-340px",
        display: "block",
        marginRight: undefined,
        filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.1))",
      },
      {
        text: "FRONT-END",
        color: "text-white",
        from: 450,
        delay: 0.5,
        fontSize: "120px",
        fontWeight: undefined,
        marginLeft: "-240px",
        marginRight: undefined,
        marginTop: "10px",
        display: "block",
        filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.1))",
      },
      {
        text: "DEVELOPER",
        color: "text-[10rem] font-bold bg-gradient-to-b from-teal-800 to-teal-300 bg-clip-text text-transparent",
        from: -350,
        delay: 0.6,
        fontSize: undefined,
        fontWeight: undefined,
        marginLeft: "100px",
        marginRight: undefined,
        filter: `drop-shadow(3px 3px 6px rgba(0,0,0,1)) drop-shadow(6px 6px 12px rgba(0,0,0,0.9)) drop-shadow(10px 10px 20px rgba(0,0,0,0.8))`,
      },
    ],
    phrase2: [
      {
        text: "I'M",
        color: "text-black",
        from: -350,
        delay: 0.3,
        fontSize: "30px",
        fontWeight: "400",
        marginLeft: undefined,
        marginRight: "30px",
        filter: undefined,
      },
      {
        text: "PASSIONATE",
        color: "text-white",
        from: 350,
        delay: 0.4,
        fontSize: "90px",
        fontWeight: undefined,
        marginLeft: undefined,
        marginRight: undefined,
        filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.1))",
      },
      {
        text: "ABOUT",
        color: "text-black",
        from: 750,
        delay: 0.5,
        fontSize: "50px",
        fontWeight: undefined,
        marginLeft: "240px",
        marginRight: undefined,
        display: "block",
        filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.1))",
      },
      {
        text: "CREATING",
        color: "text-[10rem] font-bold bg-gradient-to-b from-teal-800 to-teal-300 bg-clip-text text-transparent",
        from: -250,
        delay: 0.6,
        fontSize: undefined,
        fontWeight: undefined,
        marginLeft: undefined,
        marginRight: undefined,
        filter: `drop-shadow(3px 3px 6px rgba(0,0,0,1)) drop-shadow(6px 6px 12px rgba(0,0,0,0.9)) drop-shadow(10px 10px 20px rgba(0,0,0,0.8))`,
      },
      {
        text: "DIGITAL",
        color: "text-white",
        from:  450,
        delay: 0.6,
        fontSize: "50px",
        fontWeight: "400",
        marginLeft: "-50px",
        marginRight: "0px",
        filter: undefined,
      },
      {
        text: "EXPERIENCES",
        color: "text-black",
        from: 250,
        delay: 0.6,
        fontSize: undefined,
        fontWeight: undefined,
        marginLeft: undefined,
        marginRight: "50px",
        filter: undefined,
      },
    ],
  },
};

// ─────────────────────────────────────────────

interface WordConfig {
  text: string;
  color: string;
  from: number;
  delay: number;
  fontSize: string | undefined;
  fontWeight: string | undefined;
  marginLeft: string | undefined;
  marginRight: string | undefined;
  marginTop?: string;
  display?: string;
  filter: string | undefined;
}

interface Word {
  text: string;
  color: string;
  from: number;
  delay: number;
  extraStyle: React.CSSProperties;
}

interface TextAnimatedProps {
  loading: boolean;
}

export const TextAnimated = ({ loading }: TextAnimatedProps) => {
  const { locale } = useLanguage();

  const phrases: Word[][] = useMemo(() => {
    const { phrase1, phrase2 } = PHRASES[locale];

    const toWord = (cfg: WordConfig): Word => ({
      text: cfg.text,
      color: cfg.color,
      from: cfg.from,
      delay: cfg.delay,
      extraStyle: {
        ...(cfg.fontSize    && { fontSize:    cfg.fontSize }),
        ...(cfg.fontWeight  && { fontWeight:  cfg.fontWeight }),
        ...(cfg.marginLeft  && { marginLeft:  cfg.marginLeft }),
        ...(cfg.marginRight && { marginRight: cfg.marginRight }),
        ...(cfg.marginTop   && { marginTop:   cfg.marginTop }),
        ...(cfg.display     && { display:     cfg.display }),
        ...(cfg.filter      && { filter:      cfg.filter }),
      },
    });

    return [phrase1.map(toWord), phrase2.map(toWord)];
  }, [locale]);

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (loading || paused) return;

    const currentPhrase = phrases[phraseIndex];
    const totalAnimationTime = Math.max(...currentPhrase.map((w) => w.delay)) + 0.8;

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
  }, [phraseIndex, loading, paused, phrases]);

  if (loading) return null;

  const currentWords = phrases[phraseIndex];

  return (
    <>
      <motion.div
        className="absolute top-1/2 left-1/2 w-screen max-w-[100%]
          -translate-x-1/2 -translate-y-1/2
          text-center text-8xl font-semibold p-4
          rounded-md uppercase z-10 scale-70 select-none"
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

      {/* <button
        onClick={() => setPaused((p) => !p)}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20
          flex items-center justify-center w-10 h-10 rounded-full
          bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20
          text-white transition-all duration-200 hover:scale-110"
        aria-label={paused ? "Play" : "Pause"}
      >
        {paused ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 translate-x-0.5">
            <path d="M8 5v14l11-7z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        )}
      </button> */}
    </>
  );
};
