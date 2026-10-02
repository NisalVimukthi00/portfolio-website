/**
 * site.js — the single source of truth for everything personal.
 * Edit this file to change your name, bio, contact details and SEO metadata.
 * No component hard-codes any of this content.
 */

/**
 * Vite injects the correct base path at build time, so every asset reference
 * built with `asset()` keeps working on GitHub Pages
 * (https://username.github.io/portfolio-website/) as well as locally.
 */
export const BASE = import.meta.env.BASE_URL || "/";

/** Turn a project-relative path into a deployment-safe URL. */
export const asset = (path) => `${BASE}${String(path).replace(/^\/+/, "")}`;

export const siteConfig = {
  name: "Nisal Vimukthi",
  /* Rendered as two stacked lines in the hero. */
  nameLines: ["NISAL", "VIMUKTHI"],
  initials: "NV",
  role: "Computer Science Student & Developer",
  tagline:
    "Building digital experiences, software, and technology-driven projects.",
  location: "Sri Lanka",
  availability: "Open to internships & collaborations",
  email: "dev@nisalvimukthi.edu.lk",
  phone: "", // optional — leave empty to hide everywhere

  /* Drop your file at public/assets/resume/resume.pdf
     If it is missing, the button hides itself automatically. */
  resume: {
    path: "assets/resume/resume.pdf",
    label: "Download Resume",
  },

  hero: {
    eyebrow: "Portfolio — 2026",
    primaryCta: { label: "View Projects", to: "/projects" },
    secondaryCta: { label: "About Me", to: "/#about" },
    scrollHint: "Scroll to explore",
  },

  about: {
    heading: "About",
    title: "Curious by default, building by habit.",
    paragraphs: [
      "I am Nisal Vimukthi, a Computer Science student interested in software development, web technologies, electronics, automation, and modern digital experiences.",
      "Most of what I know came from breaking things, reading documentation, and rebuilding them properly. I like the point where software stops being abstract and starts controlling something real — a browser, a server, or a board with a few wires attached.",
      "Right now I am going deeper into frontend engineering, data structures and algorithms, and embedded systems with ESP32 — while shipping small, complete projects instead of half-finished big ones.",
    ],
    /* Short, scannable identity markers shown beside the portrait. */
    facts: [
      { label: "Focus", value: "Software & Web Development" },
      { label: "Studying", value: "Computer Science" },
      { label: "Exploring", value: "Embedded Systems & IoT" },
      { label: "Based in", value: "Sri Lanka" },
    ],
    interests: [
      "Software Engineering",
      "Web Technologies",
      "Electronics",
      "Automation",
      "Embedded Systems",
      "Human-friendly Interfaces",
      "Algorithms",
      "Open Source",
    ],
    currentlyLearning: [
      "Advanced React patterns",
      "Data Structures & Algorithms",
      "ESP32 & sensor networks",
      "Linux tooling & DevOps basics",
    ],
  },

  contact: {
    heading: "Contact",
    title: "Have a project, idea, or collaboration in mind?",
    subtitle: "Let's build something meaningful.",
    note: "The fastest way to reach me is email. I usually reply within a couple of days.",
    /* Optional mailto form — there is no backend, by design. */
    form: {
      enabled: true,
      submitLabel: "Send message",
    },
  },

  seo: {
    title: "Nisal Vimukthi — Developer Portfolio",
    description:
      "Portfolio of Nisal Vimukthi — Computer Science student and developer building software, web experiences, and technology projects.",
    keywords:
      "Nisal Vimukthi, developer portfolio, computer science student, web developer, React, ESP32, embedded systems, Sri Lanka",
    /* Set this to your final GitHub Pages URL after the first deploy. */
    canonical: "",
    ogImage: "assets/images/og-image.jpg",
  },

  footer: {
    tagline: "Designed & built with code.",
    note: "Computer Science Student & Developer",
  },
};

/** Primary navigation — used by the navbar, the footer and the scroll-spy. */
export const navigation = [
  { label: "Home", to: "/", section: "hero" },
  { label: "About", to: "/#about", section: "about" },
  { label: "Skills", to: "/#skills", section: "skills" },
  { label: "Projects", to: "/#projects", section: "projects" },
  { label: "Contact", to: "/#contact", section: "contact" },
];

export default siteConfig;
