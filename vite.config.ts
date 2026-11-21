import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import type { IncomingMessage, ServerResponse } from "node:http";
import path from "node:path";

const hasCustomDomainCname = fs.existsSync(
  path.resolve(__dirname, "public/CNAME"),
);
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isUserSiteRepo = repoName?.toLowerCase().endsWith(".github.io");
const shouldUseRepoBase =
  process.env.GITHUB_ACTIONS === "true" &&
  repoName &&
  !isUserSiteRepo &&
  !hasCustomDomainCname;
const base =
  shouldUseRepoBase ? `/${repoName}/` : "/";

/**
 * Vite serves /resume/ from resume/index.html but sends /resume (no slash) to the home page.
 * Redirect it, like GitHub Pages does in production.
 */
const resumeTrailingSlash: Plugin = {
  name: "resume-trailing-slash",
  configureServer(server) {
    server.middlewares.use(redirectResume);
  },
  configurePreviewServer(server) {
    server.middlewares.use(redirectResume);
  },
};

function redirectResume(req: IncomingMessage, res: ServerResponse, next: () => void) {
  const [pathname, query] = (req.url ?? "").split("?");
  if (pathname === `${base}resume`) {
    res.statusCode = 301;
    res.setHeader("Location", `${base}resume/${query ? `?${query}` : ""}`);
    res.end();
    return;
  }
  next();
}

export default defineConfig({
  base,
  plugins: [react(), resumeTrailingSlash],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      // The portfolio and the /resume/ page. (versions/ stays dev-only.)
      input: {
        main: path.resolve(__dirname, "index.html"),
        resume: path.resolve(__dirname, "resume/index.html"),
      },
    },
  },
});
