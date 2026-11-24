#!/usr/bin/env node
/**
 * regression-check.mjs — menjaga hasil pembersihan filter layanan dan kesehatan struktur index.html.
 *
 * Jalankan: node tests/regression-check.mjs
 * Exit 1 jika ada yang gagal.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import vm from "node:vm";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const html = readFileSync(join(root, "index.html"), "utf8");

const failures = [];
const check = (name, ok, detail = "") => {
  if (!ok) failures.push(`${name}${detail ? ` — ${detail}` : ""}`);
  console.log(`${ok ? "ok  " : "FAIL"} ${name}${detail ? ` (${detail})` : ""}`);
};

// A. Sisa filter layanan yang sudah dihapus
for (const token of ["service-tabs", "data-service-tab", "data-service-card", "role=\"tablist\""]) {
  check(`tidak ada sisa "${token}"`, !html.includes(token));
}

// B. Struktur CSS tetap utuh
const style = html.match(/<style>([\s\S]*?)<\/style>/)?.[1] ?? "";
check("blok <style> ada", style.length > 0);
check("brace CSS seimbang", style.split("{").length === style.split("}").length,
  `${style.split("{").length - 1} blok`);
check("jumlah @media tetap 9", (style.match(/@media/g) || []).length === 9,
  String((style.match(/@media/g) || []).length));
check(".service-tabs tidak tersisa di CSS", !style.includes("service-tabs"));

// C. Inline script masih valid secara sintaks
const inline = html.match(/<script>([\s\S]*)<\/script>/)?.[1] ?? "";
check("inline <script> ada", inline.length > 0);
try {
  new vm.Script(inline, { filename: "index.html:inline" });
  check("sintaks inline script valid", true);
} catch (e) {
  check("sintaks inline script valid", false, e.message);
}

// D. Fitur layanan & harga tetap lengkap (bukan filter, melainkan kartu/tabel)
const services = [...inline.matchAll(/name:"(Fast Clean|Deep Clean|Premium Clean)"/g)].map((m) => m[1]);
check("3 kartu layanan terdefinisi di CONFIG.services", services.length === 3, services.join(", "));
check("tabel estimasi tetap 3 kolom layanan",
  /<th>Kategori sepatu<\/th><th>Fast Clean<\/th><th>Deep Clean<\/th><th>Premium Clean<\/th>/.test(html));
check("section #layanan & #estimasi tetap ada", html.includes('id="layanan"') && html.includes('id="estimasi"'));
check("grid kartu layanan tetap ada", html.includes('class="cards" id="serviceCards"'));

if (failures.length > 0) {
  console.error(`\nFAIL - ${failures.length} pemeriksaan gagal:`);
  for (const f of failures) console.error(`  x ${f}`);
  process.exit(1);
}
console.log("\nPASS - semua pemeriksaan regresi lulus.");
