import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isUserSiteRepo = repoName?.toLowerCase().endsWith(".github.io");
const base =
  process.env.GITHUB_ACTIONS === "true" && repoName && !isUserSiteRepo
    ? `/${repoName}/`
    : "/";

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
