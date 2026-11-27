// DealHound — Black Friday Deal Finder: entry program.
//
// Copies app/ and screenshots/ from this repository into the output
// directory and writes the dossier buildDossier produces from them.
// Run: mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)));
const outDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");

const appDir = join(repoRoot, "app");
const shotsDir = join(repoRoot, "screenshots");

if (!existsSync(appDir)) throw new Error("app/ is missing from the repository");
if (!existsSync(shotsDir)) throw new Error("screenshots/ is missing from the repository");

mkdirSync(outDir, { recursive: true });
cpSync(appDir, join(outDir, "app"), { recursive: true });
cpSync(shotsDir, join(outDir, "screenshots"), { recursive: true });

const dossier = buildDossier(outDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
  app_path_max_bytes: 1000,
});

writeFileSync(join(outDir, "dossier.json"), dossier);
console.log(`dossier.json written: ${dossier.length} bytes`);
