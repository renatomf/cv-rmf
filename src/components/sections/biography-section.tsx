"use client";

import { useLanguage } from "@/i18n";

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

  const ageValue = locale === "pt" ? `${calculateAge()} anos` : `${calculateAge()} years`;

  const infoItems = messages.biography.infoItems.map((item) =>
    item.type === "age" ? { ...item, value: ageValue } : item
  );

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
          href="/pdf/aws-certified-developer-associate.pdf"
          className="text-brand font-semibold underline"
          download
        >
          {messages.biography.certLinkLabel}
        </a>
      </p>

      <div className="fn_cs_info_items">
        <ul>
          {infoItems.map((item, index) => (
            <li key={index}>
              <p>
                {item.label}:{" "}
                <span>
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={item.type === "contact" ? "hover:text-brand" : undefined}
                    >
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

