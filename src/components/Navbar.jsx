import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import siteConfig, { navigation } from "../data/site.js";
import { scrollToTarget } from "../animations/useSmoothScroll.js";
import Icon from "./Icon.jsx";

/**
 * Navbar — sticky, minimal, with an active-section indicator.
 * Section links scroll smoothly on the home page and navigate home first when
 * you are on another route. The mobile drawer closes itself after a selection.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero");
  const location = useLocation();
  const navigate = useNavigate();
  const onHome = location.pathname === "/";

  /* background switch once the hero starts scrolling away */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* scroll-spy: highlight the section currently in view */
  useEffect(() => {
    if (!onHome) {
      setActive(location.pathname.startsWith("/projects") ? "projects" : "");
      return undefined;
    }
    if (typeof IntersectionObserver === "undefined") return undefined;

    const ids = navigation.map((item) => item.section).filter(Boolean);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!elements.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { threshold: [0.2, 0.45, 0.7], rootMargin: "-15% 0px -35% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [onHome, location.pathname]);

  /* close the drawer on route change */
  useEffect(() => setOpen(false), [location.pathname]);

  /* lock body scroll while the drawer is open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (item) => (event) => {
    event.preventDefault();
    setOpen(false);
    const target = item.section;

    if (target === "hero") {
      if (onHome) scrollToTarget("#hero", 0);
      else navigate("/");
      return;
    }

    if (onHome) {
      if (scrollToTarget(`#${target}`)) setActive(target);
      return;
    }
    /* Deep link from another route: land on home, then scroll to the section. */
    navigate("/", { state: { scrollTo: target } });
  };

  return (
    <header className={`nav ${scrolled || open ? "nav--scrolled" : ""}`}>
      <nav className="nav__inner" aria-label="Primary">
        <a className="nav__brand" href="#/" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
          <span className="nav__mark" aria-hidden="true">{siteConfig.initials}</span>
          <span>{siteConfig.name}</span>
        </a>

        <ul className="nav__links">
          {navigation.map((item) => (
            <li key={item.label}>
              <a
                href={`#${item.section}`}
                className={`nav__link ${active === item.section ? "is-active" : ""}`}
                aria-current={active === item.section ? "true" : undefined}
                onClick={go(item)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="btn btn--primary btn--small nav__cta"
          onClick={() => {
            if (onHome && scrollToTarget("#contact")) {
              setActive("contact");
              return;
            }
            navigate("/", { state: { scrollTo: "contact" } });
          }}
        >
          <Icon name="mail" className="btn__icon" />
          Get in touch
        </button>

        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? "close" : "menu"} size={20} />
        </button>
      </nav>

      {open && (
        <div className="nav__drawer" id="mobile-menu">
          {navigation.map((item) => (
            <a
              key={item.label}
              href={`#${item.section}`}
              className={active === item.section ? "is-active" : ""}
              onClick={go(item)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
