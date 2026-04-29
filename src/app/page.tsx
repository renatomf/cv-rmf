"use client";

import { useState, useEffect } from "react";

import { Navbar } from "@/components/navbar";
import { LeftHeaderSection } from "@/components/sections/left-header-section";
import { RightHeaderSection } from "@/components/sections/right-header-section";
import { BiographySection } from "@/components/sections/biography-section";
import { EducationSection } from "@/components/sections/education-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { SkillSection } from "@/components/sections/skills-section";
import { ContactSection } from "@/components/sections/contact-section";
import { ScrollDownIndicator } from "@/components/scroll-down-indicator";
import { ScrollToTopButton } from "@/components/scroll-to-top-button";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Home() {
  const [bgAnimateOpen, setBgAnimateOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#cv_header");
  const [loading, setLoading] = useState(true);
  const [barStarted, setBarStarted] = useState(false);
  const [fading, setFading] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const raf = requestAnimationFrame(() => setBarStarted(true));
    const t1 = setTimeout(() => setFading(true), 800);
    const t2 = setTimeout(() => {
      setLoading(false);
      setBgAnimateOpen(true);
    }, 1100);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const scrollToSection = (href: string) => {
    const c1 = document.querySelector(".cv__content") as HTMLElement | null;
    const c2 = document.querySelector(".rmf_cv") as HTMLElement | null;
    let container: HTMLElement | Window = window;

    const canScroll = (el: HTMLElement) => el.scrollHeight > el.clientHeight;
    if (c1 && canScroll(c1)) container = c1;
    else if (c2 && canScroll(c2)) container = c2;

    if (href === "#cv_header") {
      if (container instanceof Window)
        window.scrollTo({ top: 0, behavior: "smooth" });
      else container.scrollTo({ top: 0, behavior: "smooth" });
      setActiveSection("#cv_header");
      return;
    }

    const element = document.getElementById(href.replace("#", ""));
    if (!element) return;

    const rectTop = element.getBoundingClientRect().top;
    const scrollOffset =
      container instanceof Window ? window.scrollY : container.scrollTop;
    const top = rectTop + scrollOffset - 80;

    if (container instanceof Window)
      window.scrollTo({ top, behavior: "smooth" });
    else container.scrollTo({ top, behavior: "smooth" });

    setActiveSection(href);
  };

  return (
    <main className={bgAnimateOpen ? "resume-opened" : "resume-open"}>
      {/* Logo fixa superior esquerda */}
      <div className="fixed top-6 left-6 z-[60] pointer-events-none select-none flex items-center gap-2">
        <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 28V12C30 10.8954 29.1046 10 28 10H27.8994C27.369 10 26.8604 10.2109 26.4854 10.5859L10.5859 26.4854C10.2109 26.8604 10 27.369 10 27.8994V40H0V27.8994C2.15312e-05 24.7168 1.26423 21.6645 3.51465 19.4141L19.4141 3.51465C21.6645 1.26423 24.7168 2.1373e-05 27.8994 0H28C34.6274 0 40 5.37258 40 12V28C40 34.6274 34.6274 40 28 40H14V30H28C29.1046 30 30 29.1046 30 28Z M0 0H17L7 10H0V0Z" fill="white"/>
        </svg>
        <span className="text-white text-md font-bold uppercase tracking-tight">CV | RMF</span>
      </div>

      {loading && (
        <>
          {isMobile ? (
            <div
              className="fixed inset-0 flex flex-col items-center justify-center bg-[#0bafac] z-50 transition-opacity duration-300"
              style={{ opacity: fading ? 0 : 1 }}
            >
              <div className="w-25 h-25 border-4 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div
              className="fixed inset-0 z-50 overflow-hidden transition-opacity duration-300"
              style={{ opacity: fading ? 0 : 1 }}
            >
              <div
                className="h-screen bg-[#0bafac] relative"
                style={{
                  width: barStarted ? "100%" : "0%",
                  transition: "width 800ms ease-out",
                }}
              />
            </div>
          )}
        </>
      )}

      <Navbar
        scrollToSection={scrollToSection}
        activeSection={activeSection}
        show={!loading}
      />

      <div className="rmf_fn_main">
        <div className="rmf_fn_cv">
          <div className="rmf_cv">
            <LeftHeaderSection scrollToSection={scrollToSection} />
            <div className="cv__content relative z-10 mt-0">
              <div className="hidden md:flex mb-8">
                <RightHeaderSection loading={loading} />
              </div>
              <BiographySection />
              <EducationSection />
              <ExperienceSection />
              <SkillSection />
              <ContactSection />
            </div>
            <div className="cv__bg" />
            <div className="cv__bg2" />
          </div>
        </div>
      </div>

      <ScrollDownIndicator loading={loading} />
      <ScrollToTopButton scrollToSection={scrollToSection} />
    </main>
  );
}
