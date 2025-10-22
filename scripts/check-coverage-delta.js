// scripts/check-coverage-delta.js
const fs = require("fs");

const basePath = "coverage-base/coverage-summary.json";
const newPath = "coverage-new/coverage-summary.json";

if (!fs.existsSync(basePath)) {
  console.warn("Base coverage not found, skipping delta check.");
  process.exit(0);
}

const base = JSON.parse(fs.readFileSync(basePath));
const current = JSON.parse(fs.readFileSync(newPath));

let failed = false;

for (const file in current) {
  if (!base[file]) continue;

  const basePct = base[file].lines.pct;
  const newPct = current[file].lines.pct;
  const delta = newPct - basePct;

  if (delta < 5) {
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
  console.log("All modified files increased coverage by >=5%.");
}

// const fs = require("fs");
// const { execSync } = require("child_process");
// const path = require("path");

// const THRESHOLD = 5; // percentage increase required

// function readCoverage(file) {
//   if (!fs.existsSync(file)) {
//     console.error(`Coverage file not found: ${file}`);
//     process.exit(1);
//   }
//   const data = JSON.parse(fs.readFileSync(file, "utf8"));
//   return data;
// }

// function getLineCoverage(coverageData, filePath) {
//   const key = Object.keys(coverageData).find((k) => k.endsWith(filePath));
//   if (!key) return null;
//   const { total, covered } = coverageData[key].lines;
//   return (covered / total) * 100;
// }

// function getChangedFiles(base, head) {
//   const diff = execSync(`git diff --name-only ${base} ${head}`, {
//     encoding: "utf8",
//   });
//   return diff
//     .split("\n")
//     .filter((f) => f.endsWith(".js") || f.endsWith(".ts"))
//     .filter(Boolean);
// }

// function main() {
//   const baseCoverage = readCoverage("coverage-base/coverage-final.json");
//   const newCoverage = readCoverage("coverage-new/coverage-final.json");

//   // Compare base vs head commit SHAs
//   const baseCommit = execSync("git merge-base HEAD origin/main", {
//     encoding: "utf8",
//   }).trim();
//   const headCommit = execSync("git rev-parse HEAD", {
//     encoding: "utf8",
//   }).trim();

//   const changedFiles = getChangedFiles(baseCommit, headCommit);
//   console.log("Changed files:", changedFiles);

//   let failed = false;

//   for (const file of changedFiles) {
//     const basePct = getLineCoverage(baseCoverage, file) ?? 0;
//     const newPct = getLineCoverage(newCoverage, file) ?? 0;
//     const delta = Math.round((newPct - basePct) * 100) / 100;

//     console.log(
//       `${file}: base=${basePct.toFixed(2)}%, new=${newPct.toFixed(
//         2
//       )}%, Δ=${delta}%`
//     );

//     if (delta < THRESHOLD) {
//       console.error(`❌ Coverage increase < ${THRESHOLD}% for ${file}`);
//       failed = true;
//     }
//   }

//   if (failed) {
//     console.error(
//       `\n🚫 Coverage enforcement failed: not all modified files increased by ${THRESHOLD}%`
//     );
//     process.exit(1);
//   } else {
//     console.log(
//       `✅ All modified files increased coverage by at least ${THRESHOLD}%`
//     );
//   }
// }

// main();
