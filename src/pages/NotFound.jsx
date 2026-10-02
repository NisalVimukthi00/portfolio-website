import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import Icon from "../components/Icon.jsx";

export default function NotFound() {
  return (
    <section className="nf">
      <Seo title="Page not found" description="The page you were looking for does not exist." path="/404" />
      <div>
        <p className="eyebrow eyebrow--muted" style={{ justifyContent: "center" }}>
          Error
        </p>
        <p className="nf__code" aria-hidden="true">
          404
        </p>
        <h1 className="nf__title">Page not found.</h1>
        <p className="nf__text">
          The page you were looking for has moved, been renamed, or never existed. The good news
          is that everything worth seeing is one click away.
        </p>
        <div className="nf__actions">
          <Link className="btn btn--primary" to="/">
            <Icon name="home" className="btn__icon" />
            Return Home
          </Link>
          <Link className="btn btn--ghost" to="/projects">
            Browse projects
            <Icon name="arrowRight" className="btn__icon" />
          </Link>
        </div>
      </div>
    </section>
  );
}
