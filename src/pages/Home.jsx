import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../sections/Hero.jsx";
import Intro from "../sections/Intro.jsx";
import About from "../sections/About.jsx";
import Skills from "../sections/Skills.jsx";
import ProjectsSection from "../sections/ProjectsSection.jsx";
import TimelineSection from "../sections/TimelineSection.jsx";
import Achievements from "../sections/Achievements.jsx";
import Contact from "../sections/Contact.jsx";
import Seo from "../components/Seo.jsx";
import { scrollToTarget } from "../animations/useSmoothScroll.js";

export default function Home() {
  const location = useLocation();

  /* Arriving from another route with a section in mind (e.g. footer links). */
  useEffect(() => {
    const target = location.state?.scrollTo;
    if (!target) return undefined;
    const timer = window.setTimeout(() => scrollToTarget(`#${target}`, -68), 120);
    return () => window.clearTimeout(timer);
  }, [location.state]);

  return (
    <>
      <Seo path="/" />
      <Hero />
      <Intro />
      <About />
      <Skills />
      <ProjectsSection />
      <TimelineSection />
      <Achievements />
      <Contact />
    </>
  );
}
