#!/usr/bin/env node
/**
 * security-check.mjs — reproduksi temuan audit A1 (OWASP A03:2025 Software Supply Chain Failures).
 *
 * Aturan: setiap script eksternal (tag <script src> maupun injeksi dinamis var.src="https://...")
 * WAJIB punya `integrity="sha256|384|512-..."` dan `crossOrigin="anonymous"`, dan tidak boleh HTTP.
 *
 * Jalankan: node tests/security-check.mjs
 * Exit 1 jika ada pelanggaran.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const html = readFileSync(join(root, "index.html"), "utf8");

const violations = [];
const checked = [];

// 1) Tag <script src="https://...">
for (const m of html.matchAll(/<script\b[^>]*\bsrc="(https?:\/\/[^"]+)"[^>]*>/g)) {
  const [tag, url] = m;
  checked.push({ kind: "tag", url });
  if (!/\bintegrity="sha(256|384|512)-/.test(tag)) violations.push(`<script src> tanpa integrity: ${url}`);
  if (!/\bcrossorigin\b/i.test(tag)) violations.push(`<script src> tanpa crossorigin: ${url}`);
}

// 2) Injeksi dinamis: var.src = "https://..."
for (const m of html.matchAll(/([A-Za-z_$][\w$]*)\.src="(https?:\/\/[^"]+)"/g)) {
  const [, variable, url] = m;
  checked.push({ kind: "dynamic", url, variable });
  const sri = new RegExp(`${variable.replace(/\$/g, "\\$")}\\.integrity="sha(256|384|512)-`);
  const cors = new RegExp(`${variable.replace(/\$/g, "\\$")}\\.crossOrigin="anonymous"`);
  if (!sri.test(html)) violations.push(`${variable}.src tanpa integrity (SRI): ${url}`);
  if (!cors.test(html)) violations.push(`${variable} tanpa crossOrigin="anonymous": ${url}`);
}

// 3) Transport tidak aman
for (const { url } of checked) {
  if (url.startsWith("http://")) violations.push(`script dimuat lewat HTTP: ${url}`);
}

console.log(`security-check: ${checked.length} script eksternal diperiksa`);
for (const s of checked) console.log(`  - [${s.kind}] ${s.url}`);

if (checked.length === 0) {
  console.log("PASS - tidak ada script eksternal yang dimuat.");
  process.exit(0);
}

if (violations.length > 0) {
  console.error("\nFAIL - temuan:");
  for (const v of violations) console.error(`  x ${v}`);
  process.exit(1);
}

console.log('\nPASS - semua script eksternal memakai SRI + crossOrigin="anonymous", tanpa HTTP.');
