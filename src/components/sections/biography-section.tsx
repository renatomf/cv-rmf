import { useLanguage } from "@/components/language-context";

const calculateAge = () => {
  const birth = new Date(1976, 10, 30);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

export const BiographySection = () => {
  const { locale, messages } = useLanguage();

  const ageItem = {
    label: locale === "pt" ? "Idade" : "Age",
    value: locale === "pt" ? `${calculateAge()} anos` : `${calculateAge()} years`,
  };

  const infoItems = [
    ...messages.biography.infoItems.slice(0, 3),
    ageItem,
    ...messages.biography.infoItems.slice(3),
  ];

  return (
    <section id="cv_biography">
      <div className="section_title">
        <h3>{messages.biography.title}</h3>
      </div>

      <p className="pb-4">{messages.biography.paragraph1}</p>
      <p className="pb-4">{messages.biography.paragraph2}</p>
      <p className="pb-4">{messages.biography.paragraph3}</p>
      <p className="pb-4">{messages.biography.paragraph4}</p>
      <p className="pb-4">{messages.biography.paragraph5}</p>
      <p className="pb-4">{messages.biography.paragraph6}</p>
      <p className="pt-4 pb-1">
        <a
          href="/pdf/AWS Certified Developer - Associate certificate.pdf"
          download
        >
          {messages.biography.paragraph7}
        </a>
      </p>

      <div className="fn_cs_info_items">
        <ul>
          {infoItems.map(
            (
              item: { label: string; value: string; link?: string },
              index: number
            ) => (
              <li key={index}>
                <p>
                  {item.label}:{" "}
                  <span>
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={
                          item.label === "Telefone" || item.label === "E-mail"
                            ? "hover:text-[#0bafac]"
                            : undefined
                        }
                      >
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </span>
                </p>
              </li>
            )
          )}
        </ul>
      </div>
    </section>
  );
};
