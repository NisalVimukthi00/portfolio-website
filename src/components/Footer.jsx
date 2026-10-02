import { useNavigate } from "react-router-dom";
import siteConfig, { navigation } from "../data/site.js";
import { activeSocialLinks } from "../data/socialLinks.js";
import { scrollToTarget } from "../animations/useSmoothScroll.js";
import Icon from "./Icon.jsx";

export default function Footer() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();
  const github = activeSocialLinks.find((link) => link.id === "github");

  const handleSection = (item) => (event) => {
    event.preventDefault();
    if (item.section === "hero") {
      navigate("/");
      window.scrollTo({ top: 0 });
      return;
    }
    if (window.location.hash === "#/" || window.location.hash === "") {
      if (scrollToTarget(`#${item.section}`)) return;
    }
    navigate("/", { state: { scrollTo: item.section } });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div>
            <p className="footer__name">{siteConfig.name}</p>
            <p className="footer__tagline">{siteConfig.footer.tagline}</p>
          </div>

          <nav className="footer__nav" aria-label="Footer">
            {navigation.map((item) => (
              <a key={item.label} href={`#${item.section}`} className="link" onClick={handleSection(item)}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="footer__socials">
            {activeSocialLinks.map((link) => (
              <a
                key={link.id}
                className="icon-btn"
                href={link.url}
                target={link.url.startsWith("http") ? "_blank" : undefined}
                rel={link.url.startsWith("http") ? "noreferrer noopener" : undefined}
                aria-label={link.label}
                title={link.label}
              >
                <Icon name={link.id === "email" ? "mail" : link.id} />
              </a>
            ))}
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            © {year} {siteConfig.name}. {siteConfig.footer.note}.
          </p>
          <p>
            {github?.url ? (
              <a href={github.url} target="_blank" rel="noreferrer noopener">
                Repository
              </a>
            ) : (
              <span>Built with React &amp; Vite</span>
            )}
            <span aria-hidden="true"> · </span>
            <span>Deployed on GitHub Pages</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
