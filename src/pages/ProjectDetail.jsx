import { Link, useParams } from "react-router-dom";
import { getProjectBySlug, getRelatedProjects } from "../data/projects.js";
import ProjectImage from "../components/ProjectImage.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import Reveal from "../components/Reveal.jsx";
import Seo from "../components/Seo.jsx";
import Icon from "../components/Icon.jsx";
import NotFound from "./NotFound.jsx";
import { useRevealGroup } from "../animations/useReveal.js";

/**
 * /projects/:slug — one reusable detail layout.
 * Every block is optional: if a project has no overview, problem/solution,
 * features or screenshots, that block is simply omitted instead of rendering
 * an empty shell.
 */
export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  const related = getRelatedProjects(project, 3);
  const relatedRef = useRevealGroup([slug]);

  if (!project) return <NotFound />;

  const hasStory = project.problem || project.solution;

  return (
    <>
      <Seo
        title={project.title}
        description={project.description}
        path={`/projects/${project.slug}`}
      />

      <header className="page-hero">
        <div className="container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <Icon name="chevronRight" size={12} />
            <Link to="/projects">Projects</Link>
            <Icon name="chevronRight" size={12} />
            <span>{project.category}</span>
          </nav>

          <h1 className="page-hero__title">{project.title}</h1>
          <p className="page-hero__lead">{project.description}</p>

          <div className="detail__hero">
            <ProjectImage
              src={project.image}
              alt={`${project.title} hero image`}
              width="1200"
              height="675"
              loading="eager"
            />
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container detail__grid">
          <div>
            {project.overview && (
              <Reveal className="detail__block">
                <h2>Overview</h2>
                <p>{project.overview}</p>
              </Reveal>
            )}

            {hasStory && (
              <Reveal className="detail__block">
                <h2>Problem &amp; solution</h2>
                {project.problem && (
                  <p>
                    <strong style={{ color: "var(--fg)" }}>Problem — </strong>
                    {project.problem}
                  </p>
                )}
                {project.solution && (
                  <p>
                    <strong style={{ color: "var(--fg)" }}>Solution — </strong>
                    {project.solution}
                  </p>
                )}
              </Reveal>
            )}

            {project.features?.length > 0 && (
              <Reveal className="detail__block">
                <h2>Key features</h2>
                <ul className="detail__list">
                  {project.features.map((feature) => (
                    <li key={feature}>
                      <Icon name="check" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {project.process?.length > 0 && (
              <Reveal className="detail__block">
                <h2>Development process</h2>
                <ol className="detail__steps">
                  {project.process.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </Reveal>
            )}

            {project.screenshots?.length > 0 && (
              <Reveal className="detail__block">
                <h2>Screenshots</h2>
                <div className="screenshots">
                  {project.screenshots.map((shot) => (
                    <img
                      key={shot}
                      src={shot}
                      alt={`${project.title} screenshot`}
                      loading="lazy"
                      decoding="async"
                    />
                  ))}
                </div>
              </Reveal>
            )}

            {!project.overview && !hasStory && !project.features?.length && (
              <Reveal className="detail__block">
                <h2>Overview</h2>
                <p>
                  A detailed write-up for this project is on the way. In the meantime, the
                  technology stack and links on the right are the fastest way to see how it was
                  built.
                </p>
              </Reveal>
            )}
          </div>

          <aside className="side-panel">
            <div className="side-panel__row">
              <dt>Category</dt>
              <dd>{project.category}</dd>
            </div>
            <div className="side-panel__row">
              <dt>Status</dt>
              <dd>{project.status || "—"}</dd>
            </div>
            {project.year && (
              <div className="side-panel__row">
                <dt>Year</dt>
                <dd>{project.year}</dd>
              </div>
            )}
            {project.stack?.length > 0 && (
              <div className="side-panel__row">
                <dt>Technologies</dt>
                <dd>
                  <span className="pcard__stack" style={{ marginTop: 0 }}>
                    {project.stack.map((tech) => (
                      <span className="tag" key={tech}>
                        {tech}
                      </span>
                    ))}
                  </span>
                </dd>
              </div>
            )}

            <div className="side-panel__actions">
              {project.links?.github && (
                <a
                  className="btn btn--primary btn--small"
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <Icon name="github" className="btn__icon" />
                  View source
                </a>
              )}
              {project.links?.demo && (
                <a
                  className="btn btn--ghost btn--small"
                  href={project.links.demo}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <Icon name="external" className="btn__icon" />
                  Live demo
                </a>
              )}
              <Link className="btn btn--ghost btn--small" to="/projects">
                <Icon name="arrowRight" className="btn__icon" />
                All projects
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section--alt">
          <div className="container">
            <Reveal className="section-head">
              <div>
                <p className="eyebrow">Keep exploring</p>
                <h2 className="section-head__title">Related projects</h2>
              </div>
            </Reveal>
            <div className="projects__grid" ref={relatedRef}>
              {related.map((item, index) => (
                <ProjectCard key={item.slug} project={item} delay={index * 60} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
