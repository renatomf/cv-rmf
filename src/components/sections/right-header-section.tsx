"use client";

import { BgAnimated } from "../bg-animated";
import { TextAnimated } from "../text-animated";

interface RightHeaderSectionProps {
  loading: boolean; // recebe do Home
}

export const RightHeaderSection = ({ loading }: RightHeaderSectionProps) => {
  return (
    <section
      id="hero-header"
      className="section_header bg-animated-height !bg-transparent !p-0 relative w-full overflow-hidden"
    >
      <div className="absolute inset-0 z-20">
        <TextAnimated loading={loading} />
      </div>

      <div className="absolute inset-0">
        <BgAnimated />
      </div>
    </section>
  );
};
