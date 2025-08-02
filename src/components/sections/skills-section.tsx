"use client";

import { useEffect, useRef, useState } from "react";

export const SkillSection = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // só anima uma vez
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="cv_skills">
      <div className="section_title">
        <h3>Professionality</h3>
      </div>
      <div className="fn_cs_progress_bar">
        <div
          ref={sectionRef}
          className={`progress_item ${isVisible ? "open" : ""}`}
          data-value="90"
        >
          <div className="item_in">
            <h3 className="progress_title">Adobe Photoshop</h3>
            <span
              className="progress_percent"
              style={{
                right: isVisible ? "10%" : "",
                opacity: isVisible ? 1 : 0,
                transition: "right 0.1 ease-out 0.2 opacity 0.1 ease-out 0.1",
              }}
            >
              90%
            </span>
            <div
              className="progress_bg"
              style={{
                width: "90%",
              }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};
