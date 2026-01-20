"use client";

import { FaFacebookF, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaInstagram, FaPinterest, FaEnvelope } from "react-icons/fa";
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
                    (messages.leftSide?.email ?? "renatomarde@gmail.com"),
                  x: e.clientX,
                  y: e.clientY,
                })
              }
              onMouseLeave={() => setTooltip(null)}
            >
              <a
                href={`mailto:${messages.leftSide?.email ?? "renatomarde@gmail.com"}`}
                className="underline hover:text-[#0bafac]"
              >
                {messages.leftSide?.email ?? "renatomarde@gmail.com"}
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
          <li>
            <a
              href="https://twitter.com/renatomardev"
              target="_blank"
              rel="noopener noreferrer"
              title="twitter.com"
            >
              <FaXTwitter className="fn__svg" />
            </a>
          </li>
          <li>
            <a
              href="https://www.facebook.com/profile.php?id=61579726780247"
              target="_blank"
              rel="noopener noreferrer"
              title="facebook.com"
            >
              <FaFacebookF className="fn__svg" />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/renatomardev/"
              target="_blank"
              rel="noopener noreferrer"
              title="instagram.com"
            >
              <FaInstagram className="fn__svg" />
            </a>
          </li>
          <li>
            <a
              href="https://br.pinterest.com/renatomardev/"
              target="_blank"
              rel="noopener noreferrer"
              title="pinterest.com"
            >
              <FaPinterest className="fn__svg" />
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/@renatomardev"
              target="_blank"
              rel="noopener noreferrer"
              title="youtube.com"
            >
              <FaYoutube className="fn__svg" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
