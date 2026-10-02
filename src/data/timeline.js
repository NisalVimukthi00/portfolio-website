/**
 * timeline.js — education, milestones and certifications.
 * Rendered as a vertical timeline on every screen size.
 */

export const timeline = [
  {
    id: "bsc",
    type: "education",
    period: "2025 — Present",
    title: "BSc (Hons) Computer Science",
    subtitle: "Anglia Ruskin University (ARU), UK | CINEC Campus, Malabe",
    description:
      "Pursuing a comprehensive degree focusing on core computer science disciplines, including advanced programming, data structures, algorithm design, operating systems, and software engineering.",
    highlights: [
      "Data Structures & Algorithms",
      "Database Systems",
      "Operating Systems",
      "Software Engineering",
    ],
    current: true,
  },
  {
    id: "self-taught",
    type: "milestone",
    period: "2022 — Present",
    title: "Self-directed Development Practice",
    subtitle: "Independent projects",
    description:
      "Learned modern web development end to end — from semantic HTML and layout systems to component architecture, build tooling and deployment pipelines.",
    highlights: ["JavaScript & React", "Git workflow", "Deployment automation"],
  },
  {
    id: "embedded",
    type: "milestone",
    period: "2023 — Present",
    title: "Embedded Systems & IoT Exploration",
    subtitle: "ESP32 / ESP8266",
    description:
      "Building connected devices: sensor pipelines, Wi-Fi enabled controllers and small automation systems that bridge hardware and the web.",
    highlights: ["ESP32 firmware", "Sensor integration", "Home automation"],
  },
  {
    id: "school",
    type: "education",
    period: "Present",
    title: "Secondary Education — Biological Science Stream",
    subtitle: "G.C.E. Advanced Level",
    description:
      "Biology, Physics and Chemistry — building a strong foundation in biological and physical sciences.",
    highlights: ["Biology", "Physics", "Chemistry"],
    current: true,
  },
];

/** Optional certifications block — an empty array hides the section. */
export const certifications = [];

export default timeline;
