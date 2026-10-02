/**
 * skills.js — technology groups.
 *
 * Deliberately NO percentage scores: misleading numeric ratings are avoided.
 * Each technology carries a `level` of "core" | "working" | "learning", which
 * only changes visual emphasis, never a fake number.
 */

export const skillGroups = [
  {
    id: "frontend",
    title: "Frontend",
    description: "Interfaces, layout systems and interaction.",
    icon: "layout",
    items: [
      { name: "HTML5", level: "core" },
      { name: "CSS3", level: "core" },
      { name: "JavaScript", level: "core" },
      { name: "React", level: "working" },
      { name: "Responsive Design", level: "core" },
      { name: "Accessibility", level: "working" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    description: "APIs, data and server-side logic.",
    icon: "server",
    items: [
      { name: "Node.js", level: "working" },
      { name: "Express", level: "working" },
      { name: "REST APIs", level: "working" },
      { name: "MySQL", level: "working" },
      { name: "SQLite", level: "working" },
    ],
  },
  {
    id: "programming",
    title: "Programming",
    description: "Languages I think and build in.",
    icon: "code",
    items: [
      { name: "Python", level: "core" },
      { name: "Java", level: "working" },
      { name: "C", level: "working" },
      { name: "C++", level: "working" },
      { name: "JavaScript", level: "core" },
      { name: "SQL", level: "working" },
    ],
  },
  {
    id: "tools",
    title: "Tools & Workflow",
    description: "How the work actually gets shipped.",
    icon: "terminal",
    items: [
      { name: "Git", level: "core" },
      { name: "GitHub", level: "core" },
      { name: "GitHub Actions", level: "learning" },
      { name: "Linux", level: "working" },
      { name: "VS Code", level: "core" },
      { name: "Vite", level: "working" },
      { name: "Figma", level: "working" },
    ],
  },
  {
    id: "electronics",
    title: "Electronics & Embedded",
    description: "Where software meets hardware.",
    icon: "cpu",
    items: [
      { name: "ESP32", level: "working" },
      { name: "ESP8266", level: "working" },
      { name: "Arduino", level: "working" },
      { name: "Sensors & Actuators", level: "working" },
      { name: "MQTT", level: "learning" },
      { name: "Circuit Design", level: "learning" },
    ],
  },
  {
    id: "other",
    title: "Other Technologies",
    description: "Adjacent skills I keep sharpening.",
    icon: "sparkles",
    items: [
      { name: "Android Development", level: "working" },
      { name: "Automation", level: "working" },
      { name: "Networking Basics", level: "learning" },
      { name: "UI / UX Fundamentals", level: "working" },
      { name: "Technical Writing", level: "working" },
    ],
  },
];

/** Legend shown under the skills grid. */
export const skillLevels = [
  { id: "core", label: "Core", description: "Used regularly, comfortable going deep" },
  { id: "working", label: "Working", description: "Shipped real projects with it" },
  { id: "learning", label: "Learning", description: "Actively studying right now" },
];

export default skillGroups;
