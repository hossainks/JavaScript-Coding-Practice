const fs = require("fs");
const { execSync } = require("child_process");

const THRESHOLD = 5; // minimum coverage increase %

const basePath = "coverage-base/coverage-summary.json";
const newPath = "coverage-new/coverage-summary.json";

if (!fs.existsSync(basePath)) {
  console.warn("Base coverage not found, skipping delta check.");
  process.exit(0);
}

const base = JSON.parse(fs.readFileSync(basePath));
const current = JSON.parse(fs.readFileSync(newPath));

// Get list of changed JS files compared to main
const changedFiles = execSync(
  "git fetch origin main && git diff --name-only origin/main...HEAD",
  {
    encoding: "utf8",
  }
)
  .split("\n")
  .filter((f) => f.endsWith(".js") || f.endsWith(".ts"))
  .filter(Boolean);

console.log("Changed files:", changedFiles);

let failed = false;

for (const file of changedFiles) {
  if (!base[file] || !current[file]) continue;

  const basePct = base[file].lines.pct;
  const newPct = current[file].lines.pct;
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
  console.error(
    `\n🚫 Some changed files did not increase coverage by >=${THRESHOLD}%`
  );
  process.exit(1);
} else {
  console.log(`✅ All changed files increased coverage by >=${THRESHOLD}%`);
}
