const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const THRESHOLD = 5;
const basePath = "coverage-base/coverage-summary.json";
const newPath = "coverage-new/coverage-summary.json";

if (!fs.existsSync(basePath)) {
  console.warn("Base coverage not found, skipping delta check.");
  process.exit(0);
}

const base = JSON.parse(fs.readFileSync(basePath), "utf-8");
const current = JSON.parse(fs.readFileSync(newPath), "utf-8");

// Get changed files
let changedFiles = [];
try {
  const diffOutput = execSync(
    "git fetch origin main && git diff --name-only origin/main...HEAD",
    { encoding: "utf8" }
  );
  changedFiles = diffOutput
    .split("\n")
    .filter((f) => f.endsWith(".js") || f.endsWith(".ts"))
    .filter(Boolean);
} catch (err) {
  console.warn("⚠️ Could not determine changed files, comparing all instead.");
  changedFiles = Object.keys(current);
}

console.log("Changed files:", changedFiles);

let failed = false;

// Normalize coverage file keys
const normalize = (p) => p.split(path.sep).join("/"); // ensure consistent slashes
const baseKeys = Object.keys(base);
const currentKeys = Object.keys(current);

for (const file of changedFiles) {
  // Try to find matching coverage key
  const matchedKey = currentKeys.find((k) => k.endsWith(file));
  if (!matchedKey || !baseKeys.find((k) => k.endsWith(file))) continue;

  const basePct = base[baseKeys.find((k) => k.endsWith(file))].lines.pct;
  const newPct = current[matchedKey].lines.pct;
  const delta = newPct - basePct;

  if (delta < THRESHOLD) {
    console.error(
      `❌ ${file}: coverage increased by only ${delta.toFixed(2)}%`
    );
    failed = true;
  } else {
    console.log(`✅ ${file}: coverage increased by ${delta.toFixed(2)}%`);
  }
}

if (failed) {
  process.exit(1);
} else {
  console.log("✅ All changed files increased coverage by >=5%.");
}
