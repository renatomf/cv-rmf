import Image from "next/image";
import BgAnimated from "../bg-animated";
import { TextAnimated } from "../text-animanted";

export const RightHeaderSection = () => {
  return (
    <section
      id="hero-header"
      className="section_header !bg-transparent !p-0 relative min-h-screen"
    >
      <TextAnimated />

      <div className="absolute inset-0 -z-10">
        <BgAnimated />
      </div>
      
    </section>
  );
};
