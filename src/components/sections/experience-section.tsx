import { useLanguage } from "@/components/language-context";

export const ExperienceSection = () => {
  const { messages } = useLanguage();

  return (
    <section id="cv_experience">
      <div className="section_title">
        <h3>{messages.experience.title}</h3>
      </div>
      <div className="fn_cs_boxed_list">
        <ul>
          <li>
            <div className="item">
              <div className="item_top">
                <h5>{messages.experience.job1.company}</h5>
                <span>({messages.experience.job1.period})</span>
              </div>
              <h3>{messages.experience.job1.role}</h3>
              <p>{messages.experience.job1.description}</p>
            </div>
          </li>
          <li>
            <div className="item">
              <div className="item_top">
                <h5>{messages.experience.job2.company}</h5>
                <span>({messages.experience.job2.period})</span>
              </div>
              <h3>{messages.experience.job2.role}</h3>
              <p>{messages.experience.job2.description}</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};
