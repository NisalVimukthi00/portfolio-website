import siteConfig from "../data/site.js";
import { projects } from "../data/projects.js";
import { skillGroups } from "../data/skills.js";
import Reveal from "../components/Reveal.jsx";

/**
 * Intro — a single large statement plus a small facts strip.
 * Every figure is computed from the data files, so it can never drift out of
 * sync with the rest of the site.
 */
export default function Intro() {
  const techCount = skillGroups.reduce((total, group) => total + group.items.length, 0);

  const stats = [
    { label: "Projects", value: `${projects.length} built` },
    { label: "Skill areas", value: `${skillGroups.length} domains` },
    { label: "Technologies", value: `${techCount} tools` },
    { label: "Status", value: "Open to work" },
  ];

  return (
    <section id="intro" className="section section--tight intro">
      <div className="container">
        <div className="intro__grid">
          <Reveal>
            <p className="eyebrow">Introduction</p>
          </Reveal>

          <Reveal delay={80}>
            <p className="intro__text">
              I build software that people actually use — from <em>web interfaces</em> and
              dashboards to <em>embedded systems</em> that talk to the physical world.
            </p>
            <p className="lead" style={{ marginTop: "1.5rem", maxWidth: "60ch" }}>
              {siteConfig.tagline} I care about clean architecture, honest performance and
              interfaces that feel considered rather than assembled.
            </p>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <dl className="intro__stats">
            {stats.map((stat) => (
              <div className="intro__stat" key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
