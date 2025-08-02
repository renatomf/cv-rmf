import { useEffect, useState } from "react";

export const RightHeaderSection = () => {
  const words = ["Desenvolvedor", "Designer"];
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
  }, [charIndex, isDeleting, wordIndex]);

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
              data-bg-img="img/header/1.jpg"
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
            <h4>Ola! Eu sou</h4>
            <h2>
              {/* <!-- It is animation title. You can change animation variation by changing extra className to one of next classNamees: zoom, rotate-1, letters type, letters rotate-2, loading-bar, slide, clip, letters rotate-3, letters scale, push. cd-headline className can not be removed.  --> */}
              <span className="cd-headline clip">
                <span
                  className="cd-words-wrapper"
                  style={{
                    width: "127.234px",
                    overflow: "hidden",
                  }}
                >
                  {/* <b className="is-hidden">Designer</b> */}
                  {/* <b className="is-hidden"> {displayedText}</b> */}

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
                  {/* <b className="is-visible">Freelancer</b> */}
                </span>
              </span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};
