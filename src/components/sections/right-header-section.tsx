import { useEffect, useState } from "react";
import { useLanguage } from "@/components/language-context";

export const RightHeaderSection = () => {
  const { messages } = useLanguage();
  const words = messages.header.titles;
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 120;
    const delayBetweenWords = 1000;
    const currentWord = words[wordIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
        if (charIndex + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), delayBetweenWords);
        }
      } else {
        setText(currentWord.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex, words]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <section id="hero-header" className="section_header !rounded-tr-none">
      <div className="content">
        <div className="left_hero_header">
          <div className="circle">
            <div
              className="bg_img"
              style={{
                backgroundImage: 'url("/img/header/1.jpg")',
              }}
            ></div>
            <img src="img/thumb/square.jpg" alt="" />
            <div className="circle_holder_blue">
              <span></span>
            </div>
            <div className="circle_holder_orange">
              <span></span>
            </div>
            <div className="lines">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        <div className="right_hero_header">
          <div className="my_self">
            <h4>{messages.header.hello}</h4>
            <h2>
              <span className="cd-headline clip">
                <span
                  className="cd-words-wrapper"
                  style={{ width: "127.234px", overflow: "hidden" }}
                >
                  <div className="max-w-1">
                    <b className="is-hidden" style={{ whiteSpace: "nowrap" }}>
                      {text}
                      <span
                        className={`ml-1 inline-block align-bottom bg-black transition-opacity duration-100 ${
                          showCursor ? "opacity-100" : "opacity-0"
                        }`}
                        style={{ width: "2px", height: "1.2em" }}
                      />
                    </b>
                  </div>
                </span>
              </span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};
