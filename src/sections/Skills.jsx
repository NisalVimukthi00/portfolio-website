import { skillGroups, skillLevels } from "../data/skills.js";
import Reveal from "../components/Reveal.jsx";
import Icon from "../components/Icon.jsx";

/**
 * Skills — grouped technologies with an honest emphasis system.
 * No percentage bars: each item carries a level (core / working / learning)
 * that only changes visual weight.
 */
export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <Reveal className="section-head">
          <div>
            <p className="eyebrow">Skills</p>
            <h2 className="section-head__title">Tools I reach for</h2>
          </div>
          <p className="section-head__sub">
            Only technologies I have actually worked with are listed — grouped by area, with
            honest emphasis instead of invented percentages.
          </p>
        </Reveal>

        <div className="skills__grid">
          {skillGroups.map((group, index) => (
            <Reveal key={group.id} delay={index * 60} className="skill-card">
              <div className="skill-card__head">
                <span className="skill-card__icon" aria-hidden="true">
                  <Icon name={group.icon} />
                </span>
                <h3 className="skill-card__title">{group.title}</h3>
              </div>
              <p className="skill-card__desc">{group.description}</p>
              <ul className="skill-card__items">
                {group.items.map((item) => (
                  <li key={`${group.id}-${item.name}`}>
                    <span className="skill-pill" data-level={item.level}>
                      <i className="skill-pill__dot" aria-hidden="true" />
                      {item.name}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal className="skills__legend">
          {skillLevels.map((level) => (
            <span key={level.id}>
              <i className="skill-pill__dot" data-level={level.id} aria-hidden="true" />
              <strong style={{ fontWeight: 600, color: "var(--fg)" }}>{level.label}</strong>
              <span className="muted">— {level.description}</span>
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
