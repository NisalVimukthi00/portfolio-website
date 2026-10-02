import { useState } from "react";
import { asset } from "../data/site.js";

/**
 * ProjectImage — never breaks the layout.
 * If a project has no image, or the file is missing at runtime, it falls back
 * to a generated placeholder cover instead of showing a broken image icon.
 */
export default function ProjectImage({ src, alt, className = "", ...rest }) {
  const [failed, setFailed] = useState(false);
  const fallback = asset("assets/images/projects/fallback.webp");
  const resolved = !src || failed ? fallback : src.startsWith("http") ? src : asset(src);

  return (
    <img
      className={className}
      src={resolved}
      alt={alt || ""}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      {...rest}
    />
  );
}
