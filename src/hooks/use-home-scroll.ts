import { useCallback } from "react";

export function useHomeScroll(setActiveSection: (href: string) => void) {
  const scrollToSection = useCallback((href: string) => {
    const c1 = document.querySelector(".cv__content") as HTMLElement | null;
    const c2 = document.querySelector(".rmf_cv") as HTMLElement | null;
    let container: HTMLElement | Window = window;

    const canScroll = (el: HTMLElement) => el.scrollHeight > el.clientHeight;
    if (c1 && canScroll(c1)) container = c1;
    else if (c2 && canScroll(c2)) container = c2;

    if (href === "#cv_header") {
      if (container instanceof Window)
        window.scrollTo({ top: 0, behavior: "smooth" });
      else container.scrollTo({ top: 0, behavior: "smooth" });
      setActiveSection("#cv_header");
      return;
    }

    const element = document.getElementById(href.replace("#", ""));
    if (!element) return;

    const rectTop = element.getBoundingClientRect().top;
    const scrollOffset =
      container instanceof Window ? window.scrollY : container.scrollTop;
    const top = rectTop + scrollOffset - 80;

    if (container instanceof Window)
      window.scrollTo({ top, behavior: "smooth" });
    else container.scrollTo({ top, behavior: "smooth" });

    setActiveSection(href);
  }, [setActiveSection]);

  return { scrollToSection };
}
