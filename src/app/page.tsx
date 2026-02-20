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

import "./globals.css";
import { FileText } from "lucide-react";

export default function Home() {
  const [bgAnimateOpen, setBgAnimateOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#cv_header");
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadedClass, setLoadedClass] = useState("");
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        if (next >= 100) {
          clearInterval(interval);
          setLoadedClass("loaded");

          setTimeout(() => {
            setLoading(false);
            setBgAnimateOpen(true);
          }, 1000);
          return 100;
        }
        return next;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [loading]);

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
      <div className="fixed top-6 left-6 z-[60] pointer-events-none select-none">
        <h4 className="flex items-center gap-1 text-sm md:text-md font-bold uppercase tracking-tight">
          <FileText className="w-6 h-6 text-white" />
          <span className="text-white">CV</span>
          <span className="text-black">- RMF</span>
        </h4>
      </div>

      {loading && (
        <>
          {isMobile ? (
            <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#0bafac] z-50">
              <div className="relative w-25 h-25">
                <div className="w-full h-full border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
                  {Math.floor(progress)}%
                </span>
              </div>
            </div>
          ) : (
            <div className="fixed inset-0 z-50 overflow-hidden">
              <div
                className="h-screen bg-[#0bafac] transition-all duration-300 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute bottom-0 right-0 text-white text-6xl font-bold p-4">
                  {Math.floor(progress)}%
                </div>
              </div>
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
