import { useLanguage } from "@/components/language-context";

export const EducationSection = () => {
  const { messages } = useLanguage();

  return (
    <section id="cv_education">
      <div className="section_title">
        <h3>{messages.education.title}</h3>
      </div>
      <div className="fn_cs_boxed_list">
        <ul>
          <li>
            <div className="item">
              <div className="item_top">
                <h5>{messages.education.university}</h5>
                <span>({messages.education.period})</span>
              </div>
              <h3>{messages.education.degree}</h3>
              <p>
                {messages.education.description}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};
