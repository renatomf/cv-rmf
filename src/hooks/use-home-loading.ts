import { useState, useEffect } from "react";

type Phase = "loading" | "fading" | "done";

export function useHomeLoading() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [barStarted, setBarStarted] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setBarStarted(true));
    const t1 = setTimeout(() => setPhase("fading"), 800);
    const t2 = setTimeout(() => setPhase("done"), 1100);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return {
    loading: phase !== "done",
    barStarted,
    fading: phase !== "loading",
    bgAnimateOpen: phase === "done",
  };
}
