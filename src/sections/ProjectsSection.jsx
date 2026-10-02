import { Link } from "react-router-dom";
import { featuredProjects } from "../data/projects.js";
import ProjectCard from "../components/ProjectCard.jsx";
import Reveal from "../components/Reveal.jsx";
import Icon from "../components/Icon.jsx";
import { useRevealGroup } from "../animations/useReveal.js";

/** Selected projects on the home page, with a route to the full archive. */
export default function ProjectsSection() {
  const gridRef = useRevealGroup([featuredProjects.length]);

  return (
    <section id="projects" className="section section--alt">
      <div className="container">
        <Reveal className="section-head">
          <div>
            <p className="eyebrow">Selected Work</p>
            <h2 className="section-head__title">Projects</h2>
          </div>
          <div className="section-head__side">
            <p className="section-head__sub">
              A few things I have designed, built and shipped — web, software, Android and
              hardware.
            </p>
            <Link className="btn btn--ghost btn--small" to="/projects">
              View All Projects
              <Icon name="arrowRight" className="btn__icon" />
            </Link>
          </div>
        </Reveal>

        <div className="projects__grid" ref={gridRef}>
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} delay={index * 70} />
          ))}
        </div>
      </div>
    </section>
  );
}
