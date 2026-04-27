import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
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

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
