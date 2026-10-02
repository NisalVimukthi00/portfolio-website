import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * GitHub Pages configuration — one single place to change.
 *
 * Local dev  : base = "/"
 * Project site (username.github.io/portfolio-website) : base = "/portfolio-website/"
 * User site    (username.github.io)                   : base = "/"
 *
 * The deploy workflow sets VITE_BASE automatically from the repository name,
 * so you normally never have to edit this file.
 */
const BASE = "/"; // Custom domains ALWAYS use root

export default defineConfig({
  base: BASE,
  plugins: [react()],
  build: {
    outDir: "dist",
    /* keep generated bundles separate from the public/assets folder */
    assetsDir: "bundle",
    sourcemap: false,
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          motion: ["gsap", "lenis"],
        },
      },
    },
  },
  server: {
    port: 5173,
    host: true,
    open: false,
  },
  preview: {
    port: 4173,
    host: true,
  },
});
