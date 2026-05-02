"use client";

import { useState } from "react";
import { useHomeLoading } from "../../hooks/use-home-loading";
import { useHomeScroll } from "../../hooks/use-home-scroll";
import { LoadingScreen } from "../../components/shared/loading-screen";
import { HeroSection, ProfileSection } from "../../components/sections/hero";
import { CvLayout } from "../../components/layout/cv-layout";
import { Navbar } from "../../components/layout/navbar";
import { ScrollDownIndicator, ScrollToTopButton } from "@/components/shared/scroll";
import { useIsMobile } from "@/hooks/use-mobile";
import { BiographySection } from "../../components/sections/biography-section";
import { EducationSection } from "../../components/sections/education-section";
import { ExperienceSection } from "../../components/sections/experience-section";

import { ContactSection } from "../../components/sections/contact-section";
import { SkillsSection } from "@/components/sections/skills/skills-sections";
import { Logo } from "@/components/shared/logo";

export function HomePage() {
  const { loading, barStarted, fading, bgAnimateOpen } = useHomeLoading();
  const [activeSection, setActiveSection] = useState("#cv_header");
  const [triggerSkillsAnimation, setTriggerSkillsAnimation] = useState(false);
  const { scrollToSection } = useHomeScroll(setActiveSection);
  const isMobile = useIsMobile();

  return (
    <main className={bgAnimateOpen ? "resume-opened" : "resume-open"}>
      <Logo loading={loading} />

      {loading && (
        <LoadingScreen
          isMobile={isMobile}
          fading={fading}
          barStarted={barStarted}
        />
      )}

      <Navbar
        scrollToSection={scrollToSection}
        activeSection={activeSection}
        show={!loading}
      />

      <CvLayout left={<ProfileSection scrollToSection={scrollToSection} onHireMeClick={() => setTriggerSkillsAnimation(true)} />}>
        <div className="hidden md:flex mb-8">
          <HeroSection loading={loading} />
        </div>
        <BiographySection />
        <EducationSection />
        <ExperienceSection />
        <SkillsSection triggerAnimation={triggerSkillsAnimation} />
        <ContactSection />
      </CvLayout>

      <ScrollDownIndicator loading={loading} />
      <ScrollToTopButton scrollToSection={scrollToSection} />
    </main>
  );
}
