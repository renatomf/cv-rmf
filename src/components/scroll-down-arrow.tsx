import { Mouse } from "lucide-react";
import { useEffect, useState } from "react";

export function ScrollDownArrow() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    function handleScroll() {
      const scrollPosition =
        document.documentElement.scrollTop || document.body.scrollTop;
      setVisible(scrollPosition < 100);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @keyframes blink-animation {
          0%, 50%, 100% { opacity: 1; }
          25%, 75% { opacity: 0; }
        }
        .blink {
          animation: blink-animation 2.5s infinite;
        }
      `}</style>

      <div
        className={`
          fixed bottom-13 w-[75vw] bg-yellow-200 flex flex-col items-center cursor-default select-none z-[9999] text-black dark:text-white transition-opacity duration-700 ease-in-out
          ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        aria-hidden="true"
      >
        <Mouse className="blink" size={24} />
      </div>
    </>
  );
}