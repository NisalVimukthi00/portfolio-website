import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * Smooth scrolling, shared with the rest of the app.
 * The instance is stored in a module variable so the navbar can route its
 * section links through the same scroller (native smooth scroll would fight
 * Lenis' own animation loop).
 */
let lenis = null;

export const getLenis = () => lenis;

/** Scroll to a CSS selector or element, honouring reduced-motion. */
export const scrollToTarget = (target, offset = -1) => {
  const el = typeof target === "string" ? document.querySelector(target) : target;
  if (!el) return false;

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  if (lenis && !prefersReduced) {
    lenis.scrollTo(el, { offset, duration: 1.15 });
    return true;
  }

  const top = el.getBoundingClientRect().top + window.scrollY + (offset || 0);
  window.scrollTo({ top, behavior: prefersReduced ? "auto" : "smooth" });
  return true;
};

export function useSmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    /* Never hijack scrolling for users who asked for reduced motion. */
    if (prefersReduced) return undefined;

    lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      lerp: 0.1,
    });

    let frame = 0;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis?.destroy();
      lenis = null;
    };
  }, []);
}

export default useSmoothScroll;
