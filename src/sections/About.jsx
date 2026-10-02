import { Link } from "react-router-dom";
import siteConfig, { asset } from "../data/site.js";
import Reveal from "../components/Reveal.jsx";
import Icon from "../components/Icon.jsx";
import ResumeButton from "../components/ResumeButton.jsx";

const { about } = siteConfig;

export default function About() {
  return (
    <section id="about" className="section section--alt">
      <div className="container">
        <Reveal className="section-head">
          <div>
            <p className="eyebrow">{about.heading}</p>
            <h2 className="section-head__title">{about.title}</h2>
          </div>
        </Reveal>

        <div className="about__grid">
          <Reveal variant="scale">
            <figure className="about__portrait">
              <img
                src={asset("assets/images/about-image.jpg")}
                alt={`Portrait of ${siteConfig.name}`}
                loading="lazy"
                decoding="async"
              />
              <figcaption className="about__badge">
                <span className="hero__dot" aria-hidden="true" />
                {siteConfig.role}
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={100}>
            <div className="about__body">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="lead">
                  {paragraph}
                </p>
              ))}

              <dl className="about__facts">
                {about.facts.map((fact) => (
                  <div className="about__fact" key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="about__actions">
                {/* Hidden automatically while public/assets/resume/resume.pdf is absent */}
                <ResumeButton variant="primary" />
                <Link className="btn btn--ghost" to="/projects">
                  View projects
                  <Icon name="arrowRight" className="btn__icon" />
                </Link>
              </div>

              <div className="about__lists">
                <div className="about__list">
                  <h3>
                    <Icon name="compass" size={13} style={{ display: "inline", verticalAlign: "-2px" }} />{" "}
                    Areas of interest
                  </h3>
                  <ul>
                    {about.interests.map((interest) => (
                      <li key={interest}>
                        <span className="chip">{interest}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="about__list">
                  <h3>
                    <Icon name="layers" size={13} style={{ display: "inline", verticalAlign: "-2px" }} />{" "}
                    Currently learning
                  </h3>
                  <ul>
                    {about.currentlyLearning.map((item) => (
                      <li key={item}>
                        <span className="chip chip--accent">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
