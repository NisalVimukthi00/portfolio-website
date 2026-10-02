import { projects } from "../data/projects.js";
import { skillGroups } from "../data/skills.js";
import { timeline } from "../data/timeline.js";
import Reveal from "../components/Reveal.jsx";

/**
 * Achievements — every figure is derived from the data files, so nothing here
 * is a decorative invented number.
 */
export default function Achievements() {
  const techCount = skillGroups.reduce((total, group) => total + group.items.length, 0);
  const shipped = projects.filter((p) => p.status === "Completed" || p.status === "Live").length;
  const categories = new Set(projects.map((p) => p.category)).size;

  const items = [
    {
      value: `${projects.length}`,
      label: "Projects in the archive",
      note: `${shipped} shipped · ${projects.length - shipped} in progress`,
    },
    {
      value: `${techCount}`,
      label: "Technologies in use",
      note: `across ${skillGroups.length} skill areas`,
    },
    {
      value: `${categories}`,
      label: "Project categories",
      note: "web, software, Android, embedded, electronics",
    },
    {
      value: `${timeline.length}`,
      label: "Milestones logged",
      note: "education, self-study and hardware work",
    },
  ];

  return (
    <section id="achievements" className="section section--alt">
      <div className="container">
        <Reveal className="section-head">
          <div>
            <p className="eyebrow">Achievements</p>
            <h2 className="section-head__title">By the numbers</h2>
          </div>
          <p className="section-head__sub">
            Counted directly from the project and skills data on this site — no inflated
            metrics.
          </p>
        </Reveal>

        <div className="ach__grid">
          {items.map((item, index) => (
            <Reveal key={item.label} className="ach" delay={index * 60}>
              <p className="ach__value">{item.value}</p>
              <p className="ach__label">{item.label}</p>
              <p className="ach__note">{item.note}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
