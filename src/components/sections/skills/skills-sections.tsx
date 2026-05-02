"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/i18n";
import { SKILLS } from "./skills-data";

interface SkillsSectionProps {
  triggerAnimation?: boolean;
}

export const SkillsSection = ({ triggerAnimation = false }: SkillsSectionProps) => {
  const { messages } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [instant, setInstant] = useState(false);
  const [rightPositions, setRightPositions] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!instant) setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [instant]);

  useEffect(() => {
    if (triggerAnimation) {
      setInstant(true);
      setIsVisible(true);
    }
  }, [triggerAnimation]);

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    const updatePositions = () => {
      const containerWidth = containerRef.current?.clientWidth ?? 0;
      const calculated = SKILLS.map((skill) => {
        const barWidthPx = (skill.percent / 100) * containerWidth;
        return Math.max(containerWidth - barWidthPx + 10, 0);
      });
      setRightPositions(calculated);
    };

    updatePositions();
    window.addEventListener("resize", updatePositions);
    return () => window.removeEventListener("resize", updatePositions);
  }, [isVisible]);

  return (
    <section id="cv_skills" aria-label="Seção de habilidades">
      <div className="section_title">
        <h3>{messages.skills.title}</h3>
      </div>

      <div className="fn_cs_progress_bar" ref={containerRef}>
        {SKILLS.map((skill, i) => (
          <div
            key={skill.key}
            className={`progress_item ${isVisible ? "open" : ""}`}
            style={{ transitionDelay: instant ? "0ms" : `${i * 100}ms` }}
            role="progressbar"
            aria-valuenow={skill.percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={skill.title}
          >
            <div className="item_in">
              <h3 className="progress_title flex items-center gap-2">
                <Image
                  src={skill.iconPath}
                  alt={`${skill.title} icon`}
                  className="w-5 h-5 object-contain"
                  width={20}
                  height={20}
                />
                {skill.title}
              </h3>

              <span
                className="progress_percent"
                style={{
                  right: isVisible && rightPositions[i] !== undefined ? `${rightPositions[i]}px` : "100%",
                  opacity: isVisible ? 1 : 0,
                  transitionDelay: instant ? "0ms" : `${i * 100}ms`,
                }}
              >
                {skill.percent}%
              </span>

              <div
                className="progress_bg"
                style={{
                  width: isVisible ? `${skill.percent}%` : "0%",
                  transitionDelay: instant ? "0ms" : `${i * 100}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

