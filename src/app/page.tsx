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
      <div className="rmf_fn_main max-w-[1024px] mx-auto px-4">
        <div className="rmf_fn_cv">
          <div className="rmf_cv">
            <div className="cv__bg"></div>
            <div className="cv__bg2"></div>
            <Navbar />
            <div className="">
              <LeftHeaderSection />
              <div className="cv__content relative z-10">
                <div className="hidden xl:flex">
                  <RightHeaderSection />
                </div>
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
