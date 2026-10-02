import Reveal from "./Reveal.jsx";

/** Consistent section heading: eyebrow, title and an optional lead paragraph. */
export default function SectionHeading({ eyebrow, title, subtitle, action }) {
  return (
    <Reveal className="section-head">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        {title && <h2 className="section-head__title">{title}</h2>}
      </div>
      {(subtitle || action) && (
        <div style={{ display: "grid", gap: "1rem", justifyItems: "start" }}>
          {subtitle && <p className="section-head__sub">{subtitle}</p>}
          {action}
        </div>
      )}
    </Reveal>
  );
}
