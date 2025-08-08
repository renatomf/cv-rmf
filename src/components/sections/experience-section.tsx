"use client";

import { useLanguage } from "@/components/language-context";

interface Job {
  company: string;
  period: string;
  role: string;
  description: string;
};

export const ExperienceSection = () => {
  const { messages } = useLanguage();

  const jobs: Job[] = [
    messages.experience.job1,
    messages.experience.job2,
    messages.experience.job3,
    messages.experience.job4,
    messages.experience.job5,
    messages.experience.job6,
    messages.experience.job7
  ];

  return (
    <section id="cv_experience">
      <div className="section_title">
        <h3>{messages.experience.title}</h3>
      </div>
      <div className="fn_cs_boxed_list">
        <ul>
          {jobs.map((job, index) => (
            <li key={index}>
              <div className="item">
                <div className="item_top">
                  <h5>{job.company}</h5>
                  <span>({job.period})</span>
                </div>
                <h3>{job.role}</h3>
                <p>{job.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
