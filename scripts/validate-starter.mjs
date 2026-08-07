import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { extname } from "node:path";

const required = [
  "AGENTS.md",
  "SECURITY.md",
  "docs/TWO_PC_SETUP.md",
  "docs/SECURITY_BOUNDARY.md",
  "src/starter-state.ts",
  "src/App.tsx",
];

for (const file of required) {
  if (!existsSync(file)) throw new Error(`Missing required starter file: ${file}`);
}

let files;
try {
  files = execFileSync("git", ["ls-files"], { encoding: "utf8" })
    .split(/\r?\n/)
    .filter(Boolean);
} catch {
  throw new Error("Run validation from an initialized Git repository.");
}

if (files.length === 0) {
  throw new Error("No tracked files found. Stage the intended repository contents before validation.");
}

const forbiddenFiles = files.filter((file) =>
  /(^|\/)(\.env($|\.)|node_modules|dist|coverage|\.codex|\.ssh)(\/|$)/i.test(file),
);
if (forbiddenFiles.length) {
  throw new Error(`Forbidden tracked paths:\n${forbiddenFiles.join("\n")}`);
}

const textExtensions = new Set([
  ".css", ".html", ".js", ".json", ".md", ".mjs", ".ts", ".tsx", ".yml", ".yaml",
]);
const sensitivePatterns = [
  [/[A-Za-z]:\\Users\\[^\\\s]+/g, "absolute Windows user path"],
  [/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/g, "private key"],
  [/\bgh[pousr]_[A-Za-z0-9]{20,}\b/g, "GitHub token"],
  [/\bAKIA[0-9A-Z]{16}\b/g, "AWS access key"],
  [/\bBearer\s+[A-Za-z0-9._~-]{20,}/gi, "bearer token"],
];

const findings = [];
for (const file of files) {
  if (!textExtensions.has(extname(file).toLowerCase())) continue;
  const content = readFileSync(file, "utf8");
  for (const [pattern, label] of sensitivePatterns) {
    pattern.lastIndex = 0;
    if (pattern.test(content)) findings.push(`${file}: ${label}`);
  }
}

if (findings.length) {
  throw new Error(`Potential sensitive content:\n${findings.join("\n")}`);
}

const state = readFileSync("src/starter-state.ts", "utf8");
if (!state.includes("Sample Workspace") || !state.includes("local_only")) {
  throw new Error("Starter state must retain fictional data and the local-only boundary.");
}

console.log(`Starter validation passed for ${files.length} tracked files.`);
