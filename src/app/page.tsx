"use client";

import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/toggle-mode-button";
import { LeftSide } from "@/components/sections/left-side";
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
    <div className={bgAnimateOpen ? "resume-opened" : "resume-open"}>
      <div className="rmf_fn_main">
        <div className="rmf_fn_cv">
          <div className="rmf_cv">
            <div className="cv__bg"></div>
            <div className="cv__bg2"></div>
            <nav className="w-full h-[50px] pr-[60px] flex flex-col items-end justify-end transition-colors duration-300 z-1000 relative">
              <ThemeToggle />
            </nav>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <LeftSide />
              <div className="cv__content">
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
    </div>
  );
}
