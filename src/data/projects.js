/**
 * projects.js — every project lives here.
 *
 * Adding a project = adding one object to this array. The grid, the filters,
 * the detail page and the related-projects list all derive from it.
 *
 * Fields marked (optional) can be omitted or left empty — the UI degrades
 * gracefully instead of breaking.
 */

export const projectCategories = [
  { id: "web", label: "Web", match: ["Web Development"] },
  { id: "android", label: "Android", match: ["Android"] },
  { id: "software", label: "Software", match: ["Software"] },
  { id: "embedded", label: "Embedded", match: ["Embedded Systems"] },
  { id: "electronics", label: "Electronics", match: ["Electronics"] },
  { id: "other", label: "Other", match: ["Other"] },
];

export const projects = [
  {
    slug: "nebula-analytics-dashboard",
    title: "Nebula Analytics Dashboard",
    tagline: "A dark, data-dense analytics interface built for speed.",
    description:
      "A responsive analytics dashboard that visualises large datasets with interactive charts, saved views and keyboard-first navigation.",
    category: "Web Development",
    stack: ["React", "Vite", "Chart.js", "CSS3", "REST API"],
    status: "Completed",
    year: "2025",
    featured: true,
    image: "assets/images/projects/p1.webp",
    links: {
      github: "https://github.com/nisalvimukthi",
      demo: "",
    },
    overview:
      "Nebula is a front-end analytics workspace: a single page that renders thousands of data points without dropping frames, keeps state shareable through the URL, and stays readable on a phone.",
    problem:
      "Most dashboards either look good and feel slow, or are fast and unusable on small screens. Chart re-renders on every filter change made the interface stutter badly.",
    solution:
      "I moved filtering into a memoised selector layer, throttled chart updates with requestAnimationFrame, and virtualised the data table so only visible rows are in the DOM.",
    features: [
      "Interactive charts with hover crosshair and range brushing",
      "URL-encoded filter state — every view is shareable",
      "Virtualised data table for tens of thousands of rows",
      "Full keyboard navigation and visible focus states",
      "Light/dark themes driven by CSS custom properties",
    ],
    process: [
      "Mapped the data model and defined the selector layer first",
      "Built a static layout with real data before adding interaction",
      "Profiled re-renders and replaced expensive updates with rAF batching",
      "Hardened the responsive layout from 320px up to 1920px",
    ],
    screenshots: [],
  },
  {
    slug: "smart-campus-mobile-app",
    title: "Smart Campus Mobile App",
    tagline: "Campus services, timetables and notices in one Android app.",
    description:
      "An Android application that centralises timetables, notices, and campus services with offline caching and a clean Material interface.",
    category: "Android",
    stack: ["Java", "Android SDK", "SQLite", "Material Design", "REST API"],
    status: "In Progress",
    year: "2025",
    featured: true,
    image: "assets/images/projects/p2.webp",
    links: {
      github: "https://github.com/nisalvimukthi",
      demo: "",
    },
    overview:
      "A student-first Android app: what is happening today, where it is happening, and what changed since the last time you looked — available even without a connection.",
    problem:
      "Campus information is scattered across notice boards, group chats and PDFs, and it disappears the moment the connection drops.",
    solution:
      "A single Room/SQLite cache behind a repository layer, with a delta sync on launch and a UI that always renders from local data first.",
    features: [
      "Offline-first data layer with local cache",
      "Timetable view with day and week modes",
      "Notice feed with read/unread state",
      "Material 3 theming with dynamic colour support",
    ],
    process: [
      "Modelled entities and relations before writing any UI",
      "Built the repository + sync layer with fake endpoints",
      "Designed screens from wireframes up, then applied theming",
    ],
    screenshots: [],
  },
  {
    slug: "iot-home-automation-hub",
    title: "IoT Home Automation Hub",
    tagline: "ESP32 devices, a local broker, and a web control room.",
    description:
      "An end-to-end home automation system: ESP32 nodes publish sensor data over MQTT to a local broker, and a web dashboard controls and monitors every room.",
    category: "Embedded Systems",
    stack: ["ESP32", "C++", "MQTT", "Node.js", "React"],
    status: "In Progress",
    year: "2025",
    featured: true,
    image: "assets/images/projects/p3.webp",
    links: {
      github: "https://github.com/nisalvimukthi",
      demo: "",
    },
    overview:
      "The project that connects both halves of what I enjoy: firmware on a microcontroller and a real interface on top of it. Everything runs on the local network — no cloud account required.",
    problem:
      "Consumer smart-home gear is cloud-dependent, so it stops working when the internet does, and it exposes household data to third parties.",
    solution:
      "A local-first architecture: ESP32 nodes talk MQTT to a broker on a small always-on machine, and the dashboard subscribes to the same topics, so control keeps working offline.",
    features: [
      "ESP32 firmware with Wi-Fi reconnection and watchdog handling",
      "MQTT topic schema for rooms, devices and telemetry",
      "Live dashboard with device state and history",
      "Scheduled rules (time, sensor threshold, or manual override)",
    ],
    process: [
      "Prototyped a single node and validated the topic schema",
      "Added persistence so state survives a broker restart",
      "Built the dashboard last, against real telemetry",
    ],
    screenshots: [],
  },
  {
    slug: "algorithm-visualizer",
    title: "Algorithm Visualizer",
    tagline: "See sorting and pathfinding actually happen, step by step.",
    description:
      "An interactive visualiser for sorting and pathfinding algorithms, built on the Canvas API with step-through controls and complexity notes.",
    category: "Software",
    stack: ["JavaScript", "Canvas API", "Vite", "CSS3"],
    status: "Completed",
    year: "2024",
    featured: false,
    image: "assets/images/projects/p4.webp",
    links: {
      github: "https://github.com/nisalvimukthi",
      demo: "",
    },
    overview:
      "I built this while studying algorithms, because watching a bar chart rearrange itself made the complexity tables finally mean something.",
    problem:
      "Algorithm animations online are either fixed videos or toy demos with no control — you cannot slow down, step through, or compare two algorithms on the same input.",
    solution:
      "A generator-based execution model: each algorithm yields its state, so playback, stepping and comparison all share one engine and stay perfectly in sync.",
    features: [
      "Sorting: bubble, insertion, selection, merge, quick",
      "Pathfinding on a grid: BFS, DFS, Dijkstra, A*",
      "Play / pause / step / speed controls",
      "Side-by-side comparison on identical input",
    ],
    process: [
      "Rewrote each algorithm as a generator of visual states",
      "Separated the render loop from the algorithm engine",
      "Added an input generator so comparisons are fair",
    ],
    screenshots: [],
  },
  {
    slug: "esp32-weather-station",
    title: "ESP32 Weather Station",
    tagline: "Local sensor readings, published to a live web page.",
    description:
      "A compact weather station that reads temperature, humidity and pressure, then serves the data to a browser dashboard over the local network.",
    category: "Electronics",
    stack: ["ESP32", "C++", "Sensors", "Wi-Fi", "HTML/CSS"],
    status: "Completed",
    year: "2024",
    featured: false,
    image: "assets/images/projects/p5.webp",
    links: {
      github: "https://github.com/nisalvimukthi",
      demo: "",
    },
    overview:
      "My first project where a circuit, firmware and a web interface all had to work together. It reads the room and shows it on any browser on the network.",
    problem:
      "Cheap weather stations either need a proprietary app or a cloud service, and the readings are hard to log over time.",
    solution:
      "The ESP32 runs a small web server and a JSON endpoint, with readings sampled on a fixed interval and stored in a ring buffer so history survives a page reload.",
    features: [
      "Temperature, humidity and pressure sampling",
      "Built-in web dashboard served from the device",
      "JSON API endpoint for external consumers",
      "Configurable sample interval and Wi-Fi credentials portal",
    ],
    process: [
      "Wired and validated each sensor on a breadboard",
      "Wrote the sampling loop with non-blocking timing",
      "Added the embedded web page and JSON endpoint",
    ],
    screenshots: [],
  },
  {
    slug: "taskflow-cli",
    title: "TaskFlow CLI",
    tagline: "A terminal task manager that stays out of your way.",
    description:
      "A command-line task manager with projects, tags, due dates and a fast fuzzy-search interface, backed by a single local SQLite file.",
    category: "Software",
    stack: ["Python", "SQLite", "CLI", "Linux"],
    status: "Completed",
    year: "2024",
    featured: false,
    image: "assets/images/projects/p6.webp",
    links: {
      github: "https://github.com/nisalvimukthi",
      demo: "",
    },
    overview:
      "Built because every task app I tried was slower than typing the task itself. TaskFlow is one command and one keystroke away from done.",
    problem:
      "GUI task managers interrupt flow — switching windows to add a three-word task costs more attention than the task is worth.",
    solution:
      "A single-file SQLite store with a sub-100ms command path, natural-language date parsing, and fuzzy search that ranks by recency and usage.",
    features: [
      "Projects, tags and due dates",
      "Natural date input (\"tomorrow\", \"fri 5pm\")",
      "Fuzzy search across all tasks",
      "Plain-text export and import",
    ],
    process: [
      "Designed the schema and the command surface together",
      "Built the parser layer with unit tests",
      "Profiled startup time and removed heavy imports",
    ],
    screenshots: [],
  },
  {
    slug: "line-following-robot",
    title: "Line Following Robot",
    tagline: "PID-tuned autonomous navigation on a custom chassis.",
    description:
      "An autonomous robot that tracks a line using an IR sensor array, with a PID controller tuned for smooth, stable movement at speed.",
    category: "Electronics",
    stack: ["Arduino", "C++", "IR Sensors", "Motor Driver", "PID"],
    status: "Completed",
    year: "2023",
    featured: false,
    image: "assets/images/projects/p7.webp",
    links: {
      github: "https://github.com/nisalvimukthi",
      demo: "",
    },
    overview:
      "A university competition build: hardware, control theory and a lot of test runs on a taped floor.",
    problem:
      "A simple on/off line follower oscillates and loses the line at speed — the correction has to be proportional, not binary.",
    solution:
      "A weighted error value from the sensor array feeds a PID loop, so the steering correction scales with how far off-centre the robot actually is.",
    features: [
      "Weighted error from a multi-sensor array",
      "PID control with tunable constants",
      "Motor driver with PWM speed control",
      "Calibration routine for different floor surfaces",
    ],
    process: [
      "Validated the sensor array readings on real surfaces",
      "Tuned P, then I, then D, logging each run",
      "Reinforced the chassis to stop vibration at speed",
    ],
    screenshots: [],
  },
  {
    slug: "portfolio-website",
    title: "Portfolio Website",
    tagline: "This site — a scroll-driven cinematic React build.",
    description:
      "A futuristic personal portfolio with a scroll-controlled image sequence, hash routing, a data-driven content layer and automated GitHub Pages deployment.",
    category: "Web Development",
    stack: ["React", "Vite", "GSAP", "Canvas API", "GitHub Actions"],
    status: "Live",
    year: "2026",
    featured: true,
    image: "assets/images/projects/p8.webp",
    links: {
      github: "https://github.com/nisalvimukthi",
      demo: "",
    },
    overview:
      "The site you are reading. Its goal was simple: prove that a static portfolio can feel like a product, not a template — and stay deployable on GitHub Pages with zero backend.",
    problem:
      "Template portfolios look identical, load heavy animation libraries they barely use, and become unmaintainable the moment you want to change a paragraph.",
    solution:
      "A pre-rendered WebP frame sequence drawn to canvas from scroll progress, a single data layer for all content, and a static build that deploys through GitHub Actions.",
    features: [
      "Scroll-controlled image sequence rendered on canvas",
      "Separate mobile frame set with its own crop",
      "All content editable from src/data/*",
      "Reduced-motion and low-bandwidth fallbacks",
      "Automated deployment to GitHub Pages",
    ],
    process: [
      "Generated a graded frame sequence from a single source image",
      "Built the frame engine with batched preloading and rAF smoothing",
      "Separated content from presentation into the data layer",
      "Verified the production build and responsive behaviour",
    ],
    screenshots: [],
  },
];

/** Look up one project by its slug. */
export const getProjectBySlug = (slug) =>
  projects.find((project) => project.slug === slug);

/** Which filter buckets a project belongs to. */
export const getProjectCategories = (project) =>
  projectCategories
    .filter((category) => category.match.includes(project.category))
    .map((category) => category.id);

/** Related projects: same category first, then most recent. */
export const getRelatedProjects = (project, limit = 3) => {
  if (!project) return [];
  const sameCategory = projects.filter(
    (p) => p.slug !== project.slug && p.category === project.category,
  );
  const others = projects.filter(
    (p) => p.slug !== project.slug && p.category !== project.category,
  );
  return [...sameCategory, ...others].slice(0, limit);
};

export const featuredProjects = projects.filter((project) => project.featured);

export default projects;
