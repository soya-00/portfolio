import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  // Project site: served from https://soya-00.github.io/portfolio/
  base: "/portfolio/",
  plugins: [react()],
  build: {
    // Real static pages rather than client-side routes. GitHub Pages serves
    // these directly, so a deep link cannot 404 the way a router would
    // without a 404.html fallback.
    rollupOptions: {
      input: {
        main: path.resolve(import.meta.dirname, "index.html"),
        tilt: path.resolve(import.meta.dirname, "tilt/index.html"),
        gals: path.resolve(import.meta.dirname, "gals/index.html"),
        bloc: path.resolve(import.meta.dirname, "bloc/index.html"),
        cvr: path.resolve(import.meta.dirname, "cvr/index.html"),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
});
