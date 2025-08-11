"use client";

import { useEffect, useState } from "react";

import { Navbar } from "@/components/navbar";
import { LeftHeaderSection } from "@/components/sections/left-header-section";
import { SkillSection } from "@/components/sections/skills-section";
import { BiographySection } from "@/components/sections/biography-section";
import { ContactSection } from "@/components/sections/contact-section";
import { EducationSection } from "@/components/sections/education-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { RightHeaderSection } from "@/components/sections/right-header-section";

export default function Home() {
  const [bgAnimateOpen, setBgAnimateOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBgAnimateOpen(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className={bgAnimateOpen ? "resume-opened" : "resume-open"}>
      <div className="rmf_fn_main">
        <div className="rmf_fn_cv">
          <div className="rmf_cv">
            <div className="cv__bg"></div>
            <div className="cv__bg2"></div>
            <Navbar />
            <div className="grid grid-cols-1 md:grid-cols-2">
              <LeftHeaderSection />
              <div className="cv__content relative z-10">
                <RightHeaderSection />
                <BiographySection />
                <EducationSection />
                <ExperienceSection />
                <SkillSection />
                <ContactSection />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
