import { motion } from "framer-motion";

export const TextAnimated = () => {
  return (
    <div className="absolute top-1/2 left-1/2 w-screen max-w-[100%] transform -translate-x-1/2 -translate-y-1/2 text-center text-8xl font-semibold p-4 rounded-md uppercase z-10 scale-60">
      {/* HI, (da esquerda para direita) */}
      <motion.span
        className="text-black font-normal mix-blend-overlay"
        initial={{ x: -350, opacity: 0 }}
        animate={{ x: -25, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        style={{ display: "inline-block" }}
      >
        HI,{" "}
      </motion.span>

      {/* I'M (da esquerda para direita) */}
      <motion.span
        className="text-white mix-blend-overlay font-normal"
        initial={{ x: -350 }}
        animate={{ x: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        style={{ display: "inline-block" }}
      >
        I&apos;M{" "}
      </motion.span>

      {/* FRONT-END (da direita para esquerda) */}
      <motion.span
        className="text-black mix-blend-overlay"
        initial={{ x: 450, opacity: 0 }}
        animate={{ x: 30, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        style={{ display: "inline-block" }}
      >
        FRONT-END{" "}
      </motion.span>

      {/* DEVELOPER (da direita para esquerda) */}
      <motion.span
        className="text-[9rem] font-bold mix-blend-overlay bg-gradient-to-b from-teal-800 to-teal-300 bg-clip-text text-transparent"
        initial={{ x: 250, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.3, delay: 0.6 }}
        style={{
          display: "inline-block",
          // WebkitTextStroke: "1px rgba(15, 118, 110, 0.5)", // stroke teal-800 meio transparente
          filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.2)) saturate(0.5px)",
        }}
      >
        DEVELOPER{" "}
      </motion.span>

      <br />

      {/* AND (da esquerda para direita) */}
      <motion.span
        className="text-white -ml-[120px]"
        initial={{ x: -250, opacity: 0 }}
        animate={{ x: 30, opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        style={{ display: "inline-block" }}
      >
        AND{" "}
      </motion.span>

      {/* DESIGNER (da esquerda para direita) */}
      <motion.span
        className="text-black"
        initial={{ x: -250, opacity: 0 }}
        animate={{ x: 65, opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        style={{ display: "inline-block" }}
      >
        DESIGNER
      </motion.span>
      <motion.span
        className="text-white"
        initial={{ x: -250, opacity: 0 }}
        animate={{ x: 85, opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        style={{ display: "inline-block" }}
      >
        ...
      </motion.span>
    </div>
  );
};
