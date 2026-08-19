/**
 * Static prerender.
 *
 * The charter requires that with JavaScript disabled the body text is
 * readable, the citations are visible and the textual equivalents are
 * reachable. A client-rendered React page delivers an empty div instead, so
 * every page that carries corpus material is rendered to HTML here and the
 * client hydrates on top of it. It also satisfies "text renders first on slow
 * connections" for free.
 *
 * Deliberately boring: one extra Vite SSR build, a string replace, and no
 * framework. The piece is declared unmaintained, so nothing here should need
 * feeding.
 */

import { build } from "vite";
import { readFileSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { pathToFileURL } from "node:url";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SSR_DIR = path.join(ROOT, ".ssr-tmp");

/** Every page to prerender: its server entry, and the HTML it writes into. */
const PAGES = [
  { name: "cvr", entry: "src/entries/cvr-server.tsx", html: "dist/cvr/index.html" },
];

const MOUNT = '<div id="root"></div>';

let failed = false;

try {
  for (const page of PAGES) {
    const htmlPath = path.join(ROOT, page.html);
    if (!existsSync(htmlPath)) {
      console.error(`  ✗ ${page.name}: ${page.html} not found — did vite build run?`);
      failed = true;
      continue;
    }

    await build({
      root: ROOT,
      logLevel: "error",
      build: {
        ssr: page.entry,
        outDir: path.relative(ROOT, path.join(SSR_DIR, page.name)),
        emptyOutDir: true,
        copyPublicDir: false,
      },
    });

    const built = path.join(SSR_DIR, page.name, "cvr-server.js");
    const { render } = await import(pathToFileURL(built).href);
    const markup = render();

    const html = readFileSync(htmlPath, "utf8");
    if (!html.includes(MOUNT)) {
      console.error(`  ✗ ${page.name}: mount point ${MOUNT} not found in ${page.html}`);
      failed = true;
      continue;
    }

    writeFileSync(htmlPath, html.replace(MOUNT, `<div id="root">${markup}</div>`));

    const words = markup.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    console.log(`  ✓ ${page.name}: ${words} words of static markup into ${page.html}`);
  }
} finally {
  rmSync(SSR_DIR, { recursive: true, force: true });
}

if (failed) {
  console.error("\n  PRERENDER FAILED — pages would ship with an empty root\n");
  process.exit(1);
}
console.log("");
