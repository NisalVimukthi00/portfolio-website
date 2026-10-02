# Nisal Vimukthi — Portfolio

A futuristic, dark-mode-first personal portfolio for **Nisal Vimukthi** — Computer Science
student and developer. Built as a real production project: a scroll-controlled cinematic
image sequence, hash-based routing, a fully data-driven content layer and automated
GitHub Pages deployment with **no backend of any kind**.

---

## Features

- **Cinematic hero** — a scroll-driven image sequence rendered to `<canvas>` with smooth
  interpolation, concurrency-limited preloading and a separate mobile frame set.
- **Pinned scroll stage** — the hero stays sticky while the sequence plays, then releases
  into the page.
- **Graceful degradation** — a poster image renders underneath the canvas, so a slow
  network, a missing frame or `prefers-reduced-motion` never leaves an empty screen.
- **Data-driven content** — name, bio, skills, projects, timeline and links all live in
  `src/data/`. No component hard-codes personal content.
- **Multi-route SPA** — Home, `/projects` with live filtering, `/projects/:slug` detail
  pages with a clean fallback layout, and a custom 404.
- **Honest skills display** — grouped technologies with `core` / `working` / `learning`
  emphasis instead of invented percentage scores.
- **Contact without a backend** — a mailto-composed form plus direct social links.
- **Accessibility** — semantic landmarks, a skip link, visible focus states, ARIA only
  where it adds meaning, and full `prefers-reduced-motion` support.
- **Performance** — lazy-loaded images, code splitting into vendor/motion chunks, batched
  `requestAnimationFrame` work, and a canvas that only redraws on frame change.

## Technology stack

| Layer | Choice |
| --- | --- |
| Framework | React 18 |
| Build tool | Vite 5 |
| Routing | React Router 6 (`HashRouter`) |
| Animation | GSAP + Lenis (smooth scroll), custom canvas sequence engine |
| Styling | Hand-written CSS with custom-property design tokens |
| Icons | Inline SVG set (no icon dependency) |
| Deployment | GitHub Actions → GitHub Pages |

> GSAP is included as a dependency for optional timeline work; the hero sequence itself
> runs on a dependency-free `requestAnimationFrame` loop so the critical animation never
> depends on a third-party library loading.

## Project structure

```
portfolio-website/
├── public/
│   ├── assets/
│   │   ├── frames/
│   │   │   ├── desktop/        # 001.webp … 084.webp  (16:9)
│   │   │   └── mobile/         # 001.webp … 060.webp  (9:16)
│   │   ├── images/
│   │   │   ├── hero-poster.jpg
│   │   │   ├── portrait.webp
│   │   │   ├── og-image.jpg
│   │   │   └── projects/       # p1–p8.webp + fallback.webp
│   │   ├── icons/
│   │   └── resume/             # put resume.pdf here
│   ├── favicon/favicon.svg
│   └── 404.html                # GitHub Pages SPA safety net
├── src/
│   ├── animations/
│   │   ├── frameSequence.js    # frame set config + URL builder
│   │   ├── useHeroSequence.js  # preloading + canvas engine
│   │   ├── useReveal.js        # IntersectionObserver reveals
│   │   ├── useSmoothScroll.js  # Lenis wrapper
│   │   └── useReducedMotion.js
│   ├── components/             # Navbar, Footer, ProjectCard, Icon, Seo, …
│   ├── data/                   # site.js, projects.js, skills.js, timeline.js, socialLinks.js
│   ├── pages/                  # Home, ProjectsPage, ProjectDetail, NotFound
│   ├── sections/               # Hero, Intro, About, Skills, Projects, Timeline, Achievements, Contact
│   ├── styles/global.css
│   ├── App.jsx
│   └── main.jsx
├── .github/workflows/deploy.yml
├── index.html
├── vite.config.js
└── package.json
```

## Development setup

```bash
npm install
npm run dev          # http://localhost:5173
```

## Production build

```bash
npm run build        # outputs to dist/
npm run preview      # serve the production build locally
```

## GitHub Pages deployment

1. Create a repository named **`portfolio-website`** (or any name — see below).
2. Push the project:

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio-website.git
git push -u origin main
```

3. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
4. The included workflow (`.github/workflows/deploy.yml`) builds and deploys on every push
   to `main`. It derives the Vite base path from the repository name automatically:

   ```yaml
   env:
     VITE_BASE: /${{ github.event.repository.name }}/
   ```

Your site appears at:

```
https://YOUR_USERNAME.github.io/REPOSITORY_NAME/
```

**Using a different repository name?** Nothing to change — the workflow reads it from the
push event. Running a build locally against a sub-path? Pass it explicitly:

```bash
VITE_BASE=/my-repo/ npm run build
```

**Using a user/organisation site** (`YOUR_USERNAME.github.io`)? Build with `VITE_BASE=/`.

### Why hash routing

GitHub Pages serves static files with no server-side rewrites. With `HashRouter` every
route works on the deployed site without configuration:

```
https://YOUR_USERNAME.github.io/portfolio-website/#/projects
https://YOUR_USERNAME.github.io/portfolio-website/#/projects/nebula-analytics-dashboard
```

`public/404.html` is included as a safety net in case you later switch to `BrowserRouter`.

## Customization

### Everything personal lives in `src/data/`

| File | Controls |
| --- | --- |
| `src/data/site.js` | Name, role, tagline, bio, email, location, hero copy, SEO metadata, resume path |
| `src/data/projects.js` | Every project, plus the filter categories |
| `src/data/skills.js` | Skill groups, technologies and their emphasis level |
| `src/data/timeline.js` | Education, milestones, certifications |
| `src/data/socialLinks.js` | GitHub, LinkedIn, X, email — empty `url` hides the entry |

The UI reads these arrays directly, so adding a project or a skill is a one-object edit.

### Add or edit a project

Append an object to the `projects` array in `src/data/projects.js`:

```js
{
  slug: "my-new-project",          // becomes /projects/my-new-project
  title: "My New Project",
  tagline: "One line for the card.",
  description: "Longer description used on the detail page.",
  category: "Web Development",     // must match a value in projectCategories[].match
  stack: ["React", "Node.js"],
  status: "Completed",             // Completed | In Progress | Live
  year: "2026",
  featured: true,                  // show on the home page
  image: "assets/images/projects/p9.webp",
  links: { github: "https://…", demo: "" },   // empty strings are hidden
  overview: "…", problem: "…", solution: "…",
  features: ["…"], process: ["…"], screenshots: [],
}
```

Every optional field is genuinely optional — a missing `overview`, `features` or
`screenshots` block is skipped rather than rendering an empty section.

### Replace the hero frames

1. Drop your frames into `public/assets/frames/desktop/` named `001.webp`, `002.webp`, …
   (a matching set for mobile goes in `public/assets/frames/mobile/`).
2. Update the counts in `src/animations/frameSequence.js`:

```js
export const frameSequenceConfig = {
  desktop: { dir: "assets/frames/desktop", count: 84, digits: 3, ext: "webp" },
  mobile:  { dir: "assets/frames/mobile",  count: 60, digits: 3, ext: "webp" },
  scrollLengthVh: 260,   // how long the pinned animation lasts
  concurrency: 8,        // parallel preloads
};
```

If you have a video instead of frames, export a sequence with ffmpeg:

```bash
ffmpeg -i source.mp4 -vf "fps=30,scale=1280:-2" -q:v 70 public/assets/frames/desktop/%03d.webp
```

### Add your resume

Drop the file at `public/assets/resume/resume.pdf`. It is referenced from
`siteConfig.resume.path` in `src/data/site.js`. If the file is absent the UI never links to
it, so the site cannot break.

### Change social links

Edit `src/data/socialLinks.js`. Any entry with an empty `url` is skipped everywhere
(footer, contact section, structured metadata).

### Change SEO metadata

Edit `siteConfig.seo` in `src/data/site.js`. The static tags in `index.html` mirror the same
values for crawlers; `src/components/Seo.jsx` keeps them in sync per route. Set
`seo.canonical` to your deployed URL to emit a canonical link.

## Deployment checklist

- [ ] `npm run build` completes without errors
- [ ] Settings → Pages → Source = **GitHub Actions**
- [ ] `siteConfig.email`, `socialLinks` and `seo.canonical` updated
- [ ] `public/assets/resume/resume.pdf` added (optional)
- [ ] First push to `main` finished, workflow green

## Credits

- Design and development: Nisal Vimukthi.
- Hero imagery and the frame sequence are derived from a supplied portrait; the grade,
  crops and sequence were generated for this project.
- Interaction concept inspired by modern cinematic developer portfolios. No third-party
  design, code, text or assets were copied.

## License

Released under the **MIT License** — the code is free to learn from and adapt. Personal
content (name, biography, photographs, project descriptions) belongs to Nisal Vimukthi and
should be replaced if you reuse this project.
