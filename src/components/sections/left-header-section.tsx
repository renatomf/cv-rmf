import { FaFacebookF, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaInstagram, FaPinterest, FaEnvelope } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useLanguage } from "@/components/language-context";

export const LeftHeaderSection = () => {
  const { messages } = useLanguage();

  return (
    <div className="cv__header">
      <div className="in">
        <div className="avatar">
          <img src="img/header/1.jpg" alt="Foto de Renato Marques" />
        </div>
        <h3>
          <span>Renato</span> Marques
        </h3>

        <p className="quote">
          {messages.leftSide?.quotePart1 ??
            "Sou um desenvolvedor web front-end apaixonado, especialista em criar interfaces web com precisão de pixels."}{" "}
          {messages.leftSide?.quotePart2 ??
            "Estou disponível para trabalhos freelance."}{" "}
          <a
            href="#contact"
            className="anchor"
            onClick={(e) => {
              e.preventDefault();
              const target = document.querySelector("#contact");
              if (target) {
                target.scrollIntoView({ behavior: "smooth" });
              }
              // Dispara evento para iniciar animação das skills sem delay
              window.dispatchEvent(new Event("startSkillsAnimation"));
            }}
          >
            {messages.leftSide?.hireMe ?? "Me Contrate"}
          </a>
        </p>

        <ul className="contact_info">
          <li>
            <span className="icon">
              <FaLocationDot className="fn__svg" />
            </span>
            <p>{messages.leftSide?.location ?? "São Paulo / Brasil"}</p>
          </li>
          <li>
            <span className="icon">
              <IoLogoWhatsapp className="fn__svg" />
            </span>
            <p>
              <a
                href="https://wa.me/5511972550341"
                target="_blank"
                rel="noopener noreferrer"
                className="text--muted-foreground hover:underline hover:text-[#0bafac]"
              >
                {messages.leftSide?.phone ?? "55 (11) 97255-0341"}
              </a>
            </p>
          </li>
          <li>
            <span className="icon">
              <FaEnvelope className="fn__svg" />
            </span>
            <p>
              <a
                href={`mailto:${messages.leftSide?.email ?? "renatomarde@gmail.com"}`}
                className="hover:underline hover:text-[#0bafac]"
              >
                {messages.leftSide?.email ?? "renatomarde@gmail.com"}
              </a>
            </p>
          </li>
        </ul>

        <ul className="social">
          <li>
            <a
              href="https://twitter.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              title="twitter.com"
            >
              <FaXTwitter className="fn__svg" />
            </a>
          </li>
          <li>
            <a
              href="https://facebook.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              title="facebook.com"
            >
              <FaFacebookF className="fn__svg" />
            </a>
          </li>
          <li>
            <a
              href="https://instagram.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              title="instagram.com"
            >
              <FaInstagram className="fn__svg" />
            </a>
          </li>
          <li>
            <a
              href="https://pinterest.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              title="pinterest.com"
            >
              <FaPinterest className="fn__svg" />
            </a>
          </li>
          <li>
            <a
              href="https://youtube.com/yourprofile"
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
