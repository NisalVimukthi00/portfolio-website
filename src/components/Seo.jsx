import { useEffect } from "react";
import siteConfig, { asset } from "../data/site.js";

/**
 * Seo — keeps document metadata in sync with the current route.
 * Values come from src/data/site.js so nothing is hard-coded in the markup.
 */
const setMeta = (selector, attr, value) => {
  if (!value) return;
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement("meta");
    const [key, val] = selector.replace(/[[\]]/g, " ").trim().split(/[="]/).filter(Boolean);
    tag.setAttribute(key === "meta" ? val.split("=")[0] || "name" : key, "");
    document.head.appendChild(tag);
  }
  tag.setAttribute(attr, value);
};

export default function Seo({ title, description, path = "/" }) {
  useEffect(() => {
    const pageTitle = title ? `${title} — ${siteConfig.name}` : siteConfig.seo.title;
    const desc = description || siteConfig.seo.description;
    document.title = pageTitle;

    const upsert = (attr, key, content) => {
      if (!content) return;
      let tag = document.head.querySelector(`meta[${attr}="${key}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    upsert("name", "description", desc);
    upsert("property", "og:title", pageTitle);
    upsert("property", "og:description", desc);
    upsert("name", "twitter:title", pageTitle);
    upsert("name", "twitter:description", desc);
    upsert("property", "og:image", asset(siteConfig.seo.ogImage));

    /* Canonical is only written when a real URL is configured. */
    if (siteConfig.seo.canonical) {
      const url = `${siteConfig.seo.canonical.replace(/\/$/, "")}/#${path}`;
      let link = document.head.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", url);
    }
  }, [title, description, path]);

  return null;
}
