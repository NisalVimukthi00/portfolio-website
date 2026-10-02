import siteConfig from "../data/site.js";
import Icon from "../components/Icon.jsx";
import { scrollToTarget } from "../animations/useSmoothScroll.js";

export default function Hero() {
  return (
    <section
      id="hero"
      className="hero hero--static"
      style={{ minHeight: "100svh", height: "100vh" }}
      aria-label="Introduction"
    >
      <div className="hero__pin">
        <div className="container hero__content">
          <p className="eyebrow hero__rise">{siteConfig.hero.eyebrow}</p>

          <h1 className="hero__name hero__rise hero__rise--2">
            {siteConfig.nameLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>

          <p className="hero__role hero__rise hero__rise--3">{siteConfig.role}</p>
          <p className="hero__tagline hero__rise hero__rise--4">{siteConfig.tagline}</p>

          <div className="hero__actions hero__rise hero__rise--4">
            <a
              className="btn btn--primary"
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget("#projects");
              }}
            >
              {siteConfig.hero.primaryCta.label}
              <Icon name="arrowRight" className="btn__icon" />
            </a>
            <a
              className="btn btn--ghost"
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget("#about");
              }}
            >
              {siteConfig.hero.secondaryCta.label}
            </a>
          </div>

          <div className="hero__meta hero__rise hero__rise--5">
            <span>
              <i className="hero__dot" aria-hidden="true" />
              {siteConfig.availability}
            </span>
            <span>{siteConfig.location}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
