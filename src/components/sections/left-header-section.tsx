import { FaFacebookF, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaInstagram, FaPinterest, FaEnvelope, FaWhatsapp  } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useLanguage } from "@/components/language-context";

export const LeftHeaderSection = () => {
  const { messages } = useLanguage();

  return (
    <div className="cv__header">
      <div className="in">
        <div className="avatar">
          <img src="img/header/1.jpg" alt="" />
        </div>
        <h3>
          <span>Renato</span> Marques
        </h3>

        <p className="quote">
          {messages.leftSide?.quotePart1 ??
            "Sou um desenvolvedor web front-end apaixonado, especialista em criar interfaces web com precisão de pixels."}{" "}
          {messages.leftSide?.quotePart2 ??
            "Estou disponível para trabalhos freelance."}{" "}
          <a href="#contact" className="anchor">
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
                className="text--muted-foreground hover:underline"
              >
                {messages.leftSide?.phone ?? "55 (11) 97255-0341"}
              </a>
            </p>
          </li>
          <li>
            <span className="icon">
              <FaEnvelope className="fn__svg" />
            </span>
            <p>{messages.leftSide?.email ?? "renatomarde@gmail.com"}</p>
          </li>
        </ul>
        <ul className="social">
          <li>
            <a href="#" target="_blank" title="twitter.com">
              <FaXTwitter className="fn__svg" />
            </a>
          </li>
          <li>
            <a href="#" target="_blank" title="facebook.com">
              <FaFacebookF className="fn__svg" />
            </a>
          </li>
          <li>
            <a href="#" target="_blank" title="instagram.com">
              <FaInstagram className="fn__svg" />
            </a>
          </li>
          <li>
            <a href="#" target="_blank" title="pinterest.com">
              <FaPinterest className="fn__svg" />
            </a>
          </li>
          <li>
            <a href="#" target="_blank" title="youtube.com">
              <FaYoutube className="fn__svg" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
