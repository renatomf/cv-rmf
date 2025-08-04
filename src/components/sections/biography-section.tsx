import { useLanguage } from "@/components/language-context";

export const BiographySection = () => {
  const { messages } = useLanguage();

  return (
    <section id="cv_biography">
      <div className="section_title">
        <h3>{messages.biography.title}</h3>
      </div>
      <p>{messages.biography.paragraph1}</p>
      <p>{messages.biography.paragraph2}</p>
    </section>
  );
};
