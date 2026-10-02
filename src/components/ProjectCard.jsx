import { Link } from "react-router-dom";
import ProjectImage from "./ProjectImage.jsx";
import Icon from "./Icon.jsx";

/** One project card. The whole card is clickable; the icon links stay on top. */
export default function ProjectCard({ project, delay = 0 }) {
  const github = project.links?.github;
  const demo = project.links?.demo;

  return (
    <article className="pcard reveal" style={{ "--reveal-delay": `${delay}ms` }}>
      <div className="pcard__media">
        <ProjectImage
          src={project.image}
          alt={`${project.title} preview`}
          width="1200"
          height="750"
        />
        {project.status && (
          <span className="pcard__status" data-status={project.status}>
            {project.status}
          </span>
        )}
        {project.year && <span className="pcard__year">{project.year}</span>}
      </div>

      <div className="pcard__body">
        <p className="pcard__cat">{project.category}</p>
        <h3 className="pcard__title">
          <Link to={`/projects/${project.slug}`}>{project.title}</Link>
        </h3>
        <p className="pcard__desc">{project.tagline || project.description}</p>

        {project.stack?.length > 0 && (
          <ul className="pcard__stack">
            {project.stack.slice(0, 4).map((tech) => (
              <li className="tag" key={tech}>
                {tech}
              </li>
            ))}
            {project.stack.length > 4 && <li className="tag">+{project.stack.length - 4}</li>}
          </ul>
        )}

        <div className="pcard__foot">
          <div className="pcard__links">
            {github && (
              <a
                className="icon-btn"
                href={github}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${project.title} on GitHub`}
                title="View source on GitHub"
              >
                <Icon name="github" />
              </a>
            )}
            {demo && (
              <a
                className="icon-btn"
                href={demo}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${project.title} live demo`}
                title="Open live demo"
              >
                <Icon name="external" />
              </a>
            )}
          </div>

          <span className="pcard__more">
            View project
            <Icon name="arrowRight" />
          </span>
        </div>
      </div>
    </article>
  );
}
