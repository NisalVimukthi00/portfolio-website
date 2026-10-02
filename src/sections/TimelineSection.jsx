import { timeline, certifications } from "../data/timeline.js";
import Reveal from "../components/Reveal.jsx";

/** Experience & education as a vertical timeline. */
export default function TimelineSection() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <Reveal className="section-head">
          <div>
            <p className="eyebrow">Experience &amp; Education</p>
            <h2 className="section-head__title">The path so far</h2>
          </div>
          <p className="section-head__sub">
            Coursework, self-directed practice and the projects that connected the two.
          </p>
        </Reveal>

        <div className="timeline">
          {timeline.map((entry, index) => (
            <Reveal
              key={entry.id}
              as="article"
              className="tl-item"
              data-current={entry.current ? "true" : "false"}
              delay={index * 60}
            >
              <span className="tl-item__dot" aria-hidden="true" />
              <div className="tl-item__card">
                <div className="tl-item__top">
                  <span className="tl-item__period">{entry.period}</span>
                  <span className="tl-item__type">{entry.type}</span>
                </div>
                <h3 className="tl-item__title">{entry.title}</h3>
                {entry.subtitle && <p className="tl-item__subtitle">{entry.subtitle}</p>}
                {entry.description && <p className="tl-item__desc">{entry.description}</p>}
                {entry.highlights?.length > 0 && (
                  <ul className="tl-item__tags">
                    {entry.highlights.map((item) => (
                      <li className="tag" key={item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {certifications.length > 0 && (
          <Reveal className="skills__legend">
            {certifications.map((cert) => (
              <span key={cert.title}>
                {cert.title}
                <span className="muted"> — {cert.issuer}</span>
              </span>
            ))}
          </Reveal>
        )}
      </div>
    </section>
  );
}
