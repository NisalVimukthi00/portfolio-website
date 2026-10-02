/**
 * socialLinks.js — every external profile in one place.
 * An entry with an empty `url` is skipped by the UI, so nothing breaks.
 */
export const socialLinks = [
  {
    id: "github",
    label: "GitHub",
    handle: "@nisalvimukthi00",
    url: "https://github.com/nisalvimukthi00",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "/in/nisalvimukthi",
    url: "https://www.linkedin.com/in/nisalvimukthi",
  },
  {
    id: "x",
    label: "X",
    handle: "@nisalvimukthi",
    url: "https://x.com/nisalvimukthi",
  },
  {
    id: "email",
    label: "Email",
    handle: "dev@nisalvimukthi.edu.lk",
    url: "mailto:dev@nisalvimukthi.edu.lk",
  },
];

/** Only the entries that actually have a URL. */
export const activeSocialLinks = socialLinks.filter((link) => Boolean(link.url));

export default socialLinks;
