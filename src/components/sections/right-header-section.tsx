import BgAnimated from "../bg-animated";
import { TextAnimated } from "../text-animanted";

export const RightHeaderSection = () => {
  return (
    <section
      id="hero-header"
      className="section_header !bg-transparent !p-0 relative min-h-screen"
    >
      {/* Texto na frente com z-index alto */}
      <TextAnimated />

      {/* BgAnimated atrás com z-index menor */}
      <div className="absolute inset-0 -z-10">
        <BgAnimated />
      </div>
    </section>
  );
};
