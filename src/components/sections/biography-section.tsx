import { useLanguage } from "@/components/language-context";

export const BiographySection = () => {
  const { messages } = useLanguage();

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
      <p className="flex items-center font-medium !text-[#0bafac] ">
        {messages.biography.paragraph6}
      </p>

      <div className="fn_cs_info_items">
        <ul>
          {messages.biography.infoItems.map(
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
