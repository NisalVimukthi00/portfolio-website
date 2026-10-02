import { useEffect, useState } from "react";
import siteConfig, { asset } from "../data/site.js";
import Icon from "./Icon.jsx";

/**
 * ResumeButton — a "Download Resume" action that only appears when the file
 * actually exists.
 *
 * Requirement: if public/assets/resume/resume.pdf is missing, the UI must hide
 * (or disable) the button instead of offering a dead link. So the component
 * probes the file with a HEAD request on mount and renders nothing until it is
 * confirmed. The content-type check also guards against SPA fallbacks, which
 * answer 200 with HTML for unknown paths in some dev servers.
 */
export default function ResumeButton({ variant = "ghost", size = "", className = "" }) {
  const [state, setState] = useState("checking"); // checking | ready | missing
  const href = asset(siteConfig.resume.path);

  useEffect(() => {
    let cancelled = false;

    fetch(href, { method: "HEAD" })
      .then((response) => {
        const type = response.headers.get("content-type") || "";
        const usable = response.ok && !type.includes("text/html");
        if (!cancelled) setState(usable ? "ready" : "missing");
      })
      .catch(() => {
        if (!cancelled) setState("missing");
      });

    return () => {
      cancelled = true;
    };
  }, [href]);

  /* Nothing to show, and nothing broken: the button simply is not rendered. */
  if (state !== "ready") return null;

  return (
    <a
      className={`btn btn--${variant} ${size ? `btn--${size}` : ""} ${className}`.trim()}
      href={href}
      download
      title={siteConfig.resume.label}
    >
      <Icon name="download" className="btn__icon" />
      {siteConfig.resume.label}
    </a>
  );
}
