"use client";

import { FaFacebookF, FaLinkedinIn, FaGithub, FaFileArrowDown } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaInstagram, FaEnvelope } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useLanguage } from "@/components/language-context";
import Image from "next/image";
import { useState } from "react";

interface LeftHeaderSectionProps {
  scrollToSection: (href: string) => void;
}

export const LeftHeaderSection = ({ scrollToSection }: LeftHeaderSectionProps) => {
  const { messages } = useLanguage();

  // estado global para tooltip (texto + posição)
  const [tooltip, setTooltip] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);

  return (
    <div id="cv_header" className="cv__header">
      <div className="in">
        <div className="avatar">
          <Image
            src="/img/header/1.jpg"
            alt="Foto de Renato Marques"
            width={200}
            height={200}
          />
        </div>
        <h3>
          <span>Renato</span> Marques
        </h3>

        <p className="quote">
          {messages.leftSide?.quotePart1 ??
            "Sou um desenvolvedor web front-end apaixonado, especialista em criar interfaces web e mobile"}{" "}
          {messages.leftSide?.quotePart2 ??
            "Estou disponível para contratação e trabalhos freelance."}{" "}
          <a
            href="#contact"
            className="anchor"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#contact");
              window.dispatchEvent(new Event("startSkillsAnimation"));
            }}
          >
            {messages.leftSide?.hireMe ?? "Contrate-me"}
          </a>
        </p>

        <ul className="contact_info">
          {/* Localização (sem tooltip dinâmico) */}
          <li className="relative flex items-center gap-1">
            <span className="icon">
              <FaLocationDot className="fn__svg" />
            </span>
            <p>{messages.leftSide?.location ?? "São Paulo / Brasil"}</p>
          </li>

          {/* WhatsApp */}
          <li className="relative flex items-center">
            <span className="icon">
              <IoLogoWhatsapp className="fn__svg" />
            </span>
            <p
              onMouseMove={(e) =>
                setTooltip({
                  text:
                    messages.leftSide?.whatsTooltip ??
                    "Enviar mensagem no WhatsApp",
                  x: e.clientX,
                  y: e.clientY,
                })
              }
              onMouseLeave={() => setTooltip(null)}
            >
              <a
                href="https://wa.me/5511972550341"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#0bafac]"
              >
                {messages.leftSide?.phone ?? "55 (11) 97255-0341"}
              </a>
            </p>
          </li>

          {/* Email */}
          <li className="relative flex items-center">
            <span className="icon">
              <FaEnvelope className="fn__svg" />
            </span>
            <p
              onMouseMove={(e) =>
                setTooltip({
                  text:
                    messages.leftSide?.emailTooltip ??
                    (messages.leftSide?.email ?? "renatomardev@gmail.com"),
                  x: e.clientX,
                  y: e.clientY,
                })
              }
              onMouseLeave={() => setTooltip(null)}
            >
              <a
                href={`mailto:${messages.leftSide?.email ?? "renatomardev@gmail.com"}`}
                className="underline hover:text-[#0bafac]"
              >
                {messages.leftSide?.email ?? "renatomardev@gmail.com"}
              </a>
            </p>
          </li>
        </ul>

        {/* Tooltip global (segue o mouse) */}
        {tooltip && (
          <div
            className="fixed z-50 bg-[#0bafac] text-white text-xs px-2 py-1 rounded-md pointer-events-none"
            style={{
              top: tooltip.y -30, // deslocado 20px para baixo
              left: tooltip.x - 80, // deslocado 20px para direita
            }}
          >
            {tooltip.text}
          </div>
        )}

        {/* Social icons */}
        <ul className="social">
          {[
            { href: "https://www.linkedin.com/in/renatomf76", label: "LinkedIn", icon: <FaLinkedinIn className="fn__svg" /> },
            { href: "https://github.com/renatomf", label: "GitHub", icon: <FaGithub className="fn__svg" /> },
            { href: "https://www.instagram.com/renatomardev/", label: "Instagram", icon: <FaInstagram className="fn__svg" /> },
            { href: "https://www.facebook.com/profile.php?id=61579726780247", label: "Facebook", icon: <FaFacebookF className="fn__svg" /> },
          ].map(({ href, label, icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} de Renato Marques`}
                onMouseMove={(e) => setTooltip({ text: label, x: e.clientX, y: e.clientY })}
                onMouseLeave={() => setTooltip(null)}
              >
                {icon}
              </a>
            </li>
          ))}
        </ul>

        {/* Download CV */}
        <a
          href="#"
          aria-label={messages.leftSide?.downloadCV ?? "Download CV"}
          className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-md border border-[#0bafac] text-[#0bafac] text-sm font-medium hover:bg-[#0bafac] hover:text-white transition-colors duration-200"
        >
          <FaFileArrowDown className="w-4 h-4" />
          {messages.leftSide?.downloadCV ?? "Download CV"}
        </a>
      </div>
    </div>
  );
};
