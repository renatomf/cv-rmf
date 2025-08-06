"use client";

import { useEffect, useRef } from "react";
import "../app/bg-animated.css"; // ajuste se mover o CSS

const BgAnimated = () => {
  const interBubble = useRef<HTMLDivElement | null>(null);
  const curX = useRef(0);
  const curY = useRef(0);
  const tgX = useRef(0);
  const tgY = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    function move() {
      curX.current += (tgX.current - curX.current) / 20;
      curY.current += (tgY.current - curY.current) / 20;

      if (interBubble.current) {
        interBubble.current.style.transform = `translate(${Math.round(
          curX.current
        )}px, ${Math.round(curY.current)}px)`;
      }

      animationFrameId.current = requestAnimationFrame(move);
    }

    function onMouseMove(event: MouseEvent) {
      tgX.current = event.clientX;
      tgY.current = event.clientY;
    }

    window.addEventListener("mousemove", onMouseMove);
    move();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <div className="gradient-bg w-screen h-screen fixed top-0 left-0 -z-10 pointer-events-none">
      <svg xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className="gradients-container">
        <div className="g1"></div>
        <div className="g2"></div>
        <div className="g3"></div>
        <div className="g4"></div>
        <div className="g5"></div>
        <div className="interactive" ref={interBubble}></div>
      </div>
    </div>
  );
};

export default BgAnimated;