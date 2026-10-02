import { useMemo, useState } from "react";
import { projects, projectCategories, getProjectCategories } from "../data/projects.js";
import ProjectCard from "../components/ProjectCard.jsx";
import Reveal from "../components/Reveal.jsx";
import Seo from "../components/Seo.jsx";
import Icon from "../components/Icon.jsx";
import { useRevealGroup } from "../animations/useReveal.js";

/** /projects — the full archive with client-side filtering (no page reload). */
export default function ProjectsPage() {
  const [filter, setFilter] = useState("all");

  const counts = useMemo(() => {
    const map = { all: projects.length };
    projectCategories.forEach((category) => {
      map[category.id] = projects.filter((project) =>
        getProjectCategories(project).includes(category.id),
      ).length;
    });
    return map;
  }, []);

  const visible = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((project) => getProjectCategories(project).includes(filter));
  }, [filter]);

  const gridRef = useRevealGroup([filter]);

  return (
    <>
      <Seo
        title="Projects"
        description="The full project archive of Nisal Vimukthi — web applications, software, Android apps, embedded systems and electronics builds."
        path="/projects"
      />

      <header className="page-hero">
        <div className="container">
          <p className="eyebrow">Archive</p>
          <h1 className="page-hero__title">Projects</h1>
          <p className="page-hero__lead">
            Everything I have built and documented — from web interfaces and command-line tools
            to Android apps and microcontroller hardware. Filter by discipline, or open any
            project for the full breakdown.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="filters" role="tablist" aria-label="Filter projects by category">
              <button
                type="button"
                role="tab"
                aria-selected={filter === "all"}
                className={`filter ${filter === "all" ? "is-active" : ""}`}
                onClick={() => setFilter("all")}
              >
                All
                <span className="filter__count">{counts.all}</span>
              </button>
              {projectCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={filter === category.id}
                  className={`filter ${filter === category.id ? "is-active" : ""}`}
                  onClick={() => setFilter(category.id)}
                >
                  {category.label}
                  <span className="filter__count">{counts[category.id]}</span>
                </button>
              ))}
            </div>
          </Reveal>

          {visible.length > 0 ? (
            <div className="projects__grid" ref={gridRef}>
              {visible.map((project, index) => (
                <ProjectCard key={project.slug} project={project} delay={index * 60} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No projects in this category yet.</p>
              <button type="button" className="btn btn--ghost btn--small" onClick={() => setFilter("all")}>
                Show all projects
                <Icon name="arrowRight" className="btn__icon" />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
