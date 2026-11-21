// Prints resume/index.html (the /resume/ page) to public/Roopam_Garg_Resume.pdf with headless Chrome.
// Run after editing the resume: npm run resume:pdf
// The resume uses macOS system fonts, so build the PDF on a Mac and commit it.
import { execFileSync } from "node:child_process";
import { existsSync, rmSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "resume", "index.html");
const output = path.join(root, "public", "Roopam_Garg_Resume.pdf");

const candidates = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);
const chrome = candidates.find((candidate) => existsSync(candidate));
if (!chrome) {
  console.error("Could not find Chrome. Set CHROME_PATH to your Chrome or Edge binary.");
  process.exit(1);
}

rmSync(output, { force: true });
execFileSync(
  chrome,
  [
    "--headless",
    "--disable-gpu",
    "--no-pdf-header-footer",
    `--print-to-pdf=${output}`,
    pathToFileURL(source).href,
  ],
  // Chrome logs harmless display warnings on stderr, so check for the file instead.
  { stdio: "ignore" },
);

if (!existsSync(output)) {
  console.error("Chrome did not write the PDF.");
  process.exit(1);
}

console.log(`Wrote ${path.relative(root, output)} (${Math.round(statSync(output).size / 1024)} KB)`);
