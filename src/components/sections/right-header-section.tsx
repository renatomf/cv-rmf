"use client";

import BgAnimated from "../bg-animated";
import { TextAnimated } from "../text-animated";

export const RightHeaderSection = () => {
  return (
    <section
      id="hero-header"
      className="section_header !bg-transparent !p-0 relative w-full h-screen overflow-hidden"
    >
      {/* Texto centralizado e limitado */}
      <TextAnimated />

      {/* Fundo ocupando a tela inteira */}
      <div className="absolute inset-0 -z-10">
        <BgAnimated />
      </div>
    </section>
  );
};
