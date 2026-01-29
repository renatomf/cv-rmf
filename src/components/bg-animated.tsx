"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "./ui/button";
import "@/app/globals.css";

export const BgAnimated = () => {
  const interBubble = useRef<HTMLDivElement | null>(null);
  const curX = useRef(0);
  const curY = useRef(0);
  const tgX = useRef(0);
  const tgY = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  // vídeos
  const videos = [
    "/videos/video-3.mp4",
    "/videos/video-5.mp4",
    "/videos/video-9.mp4",
    // "/videos-2/video-4.mp4",
    // "/videos-2/video-6.mp4",
    // "/videos/video-4.mp4",
    // "/videos/video-6.mp4",
    // "/videos/video-7.mp4",
    // "/videos/video-2.mp4",
    // "/videos/video-3.mp4",
    // "/videos/video-4.mp4",
    // "/videos/video-6.mp4",
  ];

  // estado para armazenar o vídeo atual
  const [currentVideo, setCurrentVideo] = useState(0);

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
    <div className="relative inset-0 w-full h-full">
      <div className="gradient-bg w-full h-full absolute top-0 left-0">
        {/* Vídeo em background */}
        <video
          key={currentVideo}
          className="absolute inset-0 w-full h-full object-cover !bg-blend-screen opacity-25 z-0"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={videos[currentVideo]} type="video/mp4" />
        </video>

        {/* SVG + Gradientes */}
        <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
          <defs>
            <filter id="goo" colorInterpolationFilters="sRGB">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  
                        0 1 0 0 0  
                        0 0 1 0 0  
                        0 0 0 18 -8"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>

        <div className="gradients-container relative z-10">
          <div className="g1"></div>
          <div className="g2"></div>
          <div className="g3"></div>
          <div className="g4"></div>
          <div className="g5"></div>
          <div className="interactive" ref={interBubble}></div>
        </div>

        {/* Botões de troca de vídeo */}
        <div className="absolute lg:bottom-10 md:bottom-19 right-10 z-20 hidden md:flex gap-2">
          {videos.map((_, index) => (
            <Button
              key={index}
              className={`w-3 h-3 p-0 rounded-[3px] opacity-80 cursor-pointer ${
                currentVideo === index ? "bg-white" : "bg-gray-400"
              }`}
              onClick={() => setCurrentVideo(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
