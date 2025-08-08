"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useMemo } from "react";
import { useLanguage } from "@/components/language-context";

interface Skill {
  title: string;
  percent: string;
  iconPath: string; // Caminho relativo ao /public
}

export const SkillSection = () => {
  const { messages } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [rightPositions, setRightPositions] = useState<number[]>([]);

  const skills: Skill[] = useMemo(
    () => [
      {
        title: messages.skills.react,
        percent: messages.skills.react_percent,
        iconPath: "/svg/react.svg",
      },
      {
        title: messages.skills.next,
        percent: messages.skills.next_percent,
        iconPath: "/svg/next.svg",
      },
      {
        title: messages.skills.vue,
        percent: messages.skills.vue_percent,
        iconPath: "/svg/vue.svg",
      },
      {
        title: messages.skills.angular,
        percent: messages.skills.angular_percent,
        iconPath: "/svg/angular.svg",
      },
      {
        title: messages.skills.flutter,
        percent: messages.skills.flutter_percent,
        iconPath: "/svg/flutter.svg",
      },
      {
        title: messages.skills.react_native,
        percent: messages.skills.react_native_percent,
        iconPath: "/svg/react.svg",
      },
      {
        title: messages.skills.html,
        percent: messages.skills.html_percent,
        iconPath: "/svg/html.svg",
      },
      {
        title: messages.skills.css,
        percent: messages.skills.css_percent,
        iconPath: "/svg/css.svg",
      },
      {
        title: messages.skills.javascript,
        percent: messages.skills.javascript_percent,
        iconPath: "/svg/javascript.svg",
      },
      {
        title: messages.skills.typescript,
        percent: messages.skills.typescript_percent,
        iconPath: "/svg/typescript.svg",
      },
      {
        title: messages.skills.python,
        percent: messages.skills.python_percent,
        iconPath: "/svg/python.svg",
      },
      {
        title: messages.skills.node,
        percent: messages.skills.node_percent,
        iconPath: "/svg/node.svg",
      },
      {
        title: messages.skills.figma,
        percent: messages.skills.figma_percent,
        iconPath: "/svg/figma.svg",
      },
      {
        title: messages.skills.adobe,
        percent: messages.skills.adobe_percent,
        iconPath: "/svg/adobe.svg",
      },
    ],
    [messages.skills]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    const containerWidth = containerRef.current.clientWidth;
    const offset = -10;

    const calculatedRights = skills.map((skill) => {
      const percentNum = Number(skill.percent.replace("%", ""));
      const barWidthPx = (percentNum / 100) * containerWidth;
      return Math.max(containerWidth - barWidthPx - offset, 0);
    });

    setRightPositions(calculatedRights);
  }, [isVisible, skills]);

  return (
    <section id="cv_skills">
      <div className="section_title">
        <h3>{messages.skills.title}</h3>
      </div>

      <div className="fn_cs_progress_bar" ref={containerRef}>
        {skills.map((skill, i) => (
          <div
            key={skill.title}
            className={`progress_item ${isVisible ? "open" : ""}`}
            style={{ transitionDelay: `${i * 300}ms` }}
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
                  right:
                    isVisible && rightPositions[i] !== undefined
                      ? `${rightPositions[i]}px`
                      : "100%",
                  opacity: isVisible ? 1 : 0,
                  transitionDelay: `${i * 300}ms`,
                }}
              >
                {skill.percent}
              </span>

              <div
                className="progress_bg"
                style={{
                  width: isVisible ? skill.percent : "0%",
                  transitionDelay: `${i * 300}ms`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
