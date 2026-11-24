// The Robot Vacuum's Best Excuse
// make.fun competition: u-golden-heron-44-the-robot-vacuum-s-best-excuse-53412214
//
// One line, at most 140 characters: the excuse a robot vacuum gives for
// missing a spot. The program writes that line to /output/entry.txt,
// where the sealed scorer gates it (UTF-8, 1..140 chars, not whitespace)
// and a judge playing a tired homeowner compares it pairwise.
//
// The joke, in the vacuum's own deadpan voice: the spot lives under the
// sofa, the vacuum's contract ends at the sofa, and sub-sofa work belongs
// to the upright. Three beats, one clean turn at the end.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "The spot is under the sofa, and my contract ends at the sofa. I do not do sub-sofa. That is a job for the upright.";

const MAX_CHARS = 140;

// Gate check, mirroring the sealed scorer: 1..140 characters, not only
// whitespace, a single line. Code-point count: the entry is plain ASCII,
// so code points and bytes agree.
const chars = [...ENTRY];
if (chars.length < 1 || chars.length > MAX_CHARS) {
  throw new Error(`entry is ${chars.length} chars, must be 1..${MAX_CHARS}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry is only whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Read-back check: the file on disk must be byte-identical to ENTRY, so
// two runs of this program always produce the same output.
const written = readFileSync(outPath, "utf8");
if (written !== ENTRY) {
  throw new Error("entry.txt on disk differs from ENTRY");
}
console.log(`wrote ${chars.length} chars to ${outPath}`);
