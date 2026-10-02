import { useEffect, useRef, useState } from "react";

/**
 * Cursor — optional subtle custom cursor.
 * Desktop pointer devices only: it never initialises on touch/coarse pointers
 * and it is removed entirely under prefers-reduced-motion (see global.css).
 */
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(fine && !reduced);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...pos };
    let raf = 0;
    let visible = false;

    const onMove = (event) => {
      pos.x = event.clientX;
      pos.y = event.clientY;
      if (!visible) {
        visible = true;
        dot.current?.classList.remove("cursor--hidden");
        ring.current?.classList.remove("cursor__ring--hidden");
      }
      const interactive = event.target.closest?.("a, button, input, textarea, .pcard, .skill-card");
      dot.current?.classList.toggle("is-active", Boolean(interactive));
      ring.current?.classList.toggle("is-active", Boolean(interactive));
    };

    const onLeave = () => {
      visible = false;
      dot.current?.classList.add("cursor--hidden");
      ring.current?.classList.add("cursor__ring--hidden");
    };

    const loop = () => {
      /* the ring trails the dot slightly for a soft, non-distracting feel */
      ringPos.x += (pos.x - ringPos.x) * 0.16;
      ringPos.y += (pos.y - ringPos.y) * 0.16;
      if (dot.current) dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      if (ring.current) ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div className="cursor cursor--hidden" ref={dot} aria-hidden="true" />
      <div className="cursor__ring cursor__ring--hidden" ref={ring} aria-hidden="true" />
    </>
  );
}
