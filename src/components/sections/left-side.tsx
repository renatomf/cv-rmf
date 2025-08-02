import { FaFacebookF, FaXTwitter, FaYoutube, FaPhone } from "react-icons/fa6";
import { FaInstagram, FaPinterest, FaEnvelope } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

export const LeftSide = () => {
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
          Sou um desenvolvedor web front-end apaixonado, especialista em criar
          interfaces web com precisão de pixels. Estou disponível para trabalhos
          freelance.{" "}
          <a href="#contact" className="anchor">
            Me Contrate
          </a>
        </p>
        <ul className="contact_info">
          <li>
            <span className="icon">
              <FaLocationDot className="fn__svg" />
            </span>
            <p>Sao Paulo / Brasil</p>
          </li>
          <li>
            <span className="icon">
              <FaPhone className="fn__svg" />
            </span>
            <p>(11) 97255-0341</p>
          </li>
          <li>
            <span className="icon">
              <FaEnvelope className="fn__svg"/>
            </span>
            <p>renatomar76@gmail.com</p>
          </li>
        </ul>
        <ul className="social">
          <li>
            <a href="#" target="_blank" title="twitter.com">
              <FaXTwitter
                className="fn__svg"
              />
            </a>
          </li>
          <li>
            <a href="#" target="_blank" title="facebook.com">
              <FaFacebookF className='fn__svg' />
            </a>
          </li>
          <li>
            <a href="#" target="_blank" title="instagram.com">
              <FaInstagram
                className="fn__svg"
              />
            </a>
          </li>
          <li>
            <a href="#" target="_blank" title="printerest.com">
              <FaPinterest
                className="fn__svg"
              />
            </a>
          </li>
          <li>
            <a href="#" target="_blank" title="youtube.com">
              <FaYoutube
                className="fn__svg"
              />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
