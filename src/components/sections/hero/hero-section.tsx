"use client";

import { TextAnimated } from "./animated-text";
import { HeroView } from "./hero-view";

interface HeroSectionProps {
  loading: boolean;
}

export const HeroSection = ({ loading }: HeroSectionProps) => {
  return (
    <section
      id="hero-header"
      className="section_header bg-animated-height !bg-transparent !p-0 relative w-full overflow-hidden"
    >
      <div className="absolute inset-0 z-20">
        <TextAnimated loading={loading} />
      </div>

      <div className="absolute inset-0">
        <HeroView />
      </div>
    </section>
  );
};
