"use client";

import Image from "next/image";
import { useLanguage } from "@/i18n";

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
                <span>{messages.education.period}</span>
              </div>
              <h3>{messages.education.degree}</h3>
              <p>{messages.education.description}</p>
            </div>
          </li>
          <li>
            <div className="item">
              <div className="item_top" style={{ alignItems: "center" }}>
                <h5 className="flex items-center gap-2">
                  {messages.education.certIssuer ?? "Amazon Web Services"}
                  <Image src="/svg/aws.svg" alt="AWS" width={36} height={22} className="mt-2 ml-1" />
                </h5>
              </div>
              <h3>{messages.education.certName ?? "AWS Certified Developer – Associate"}</h3>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

