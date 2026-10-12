import fs from "node:fs";

// bytes, gzip for text assets and raw for fonts (see src/integrations/page-weight.ts)
const TOTAL_BUDGET = 187_000;
const NON_FONT_BUDGET = 22_000;

const kb = (n) => (n / 1000).toFixed(1) + "kB";

let pages;
try {
    pages = JSON.parse(fs.readFileSync("dist/page-weight.json", "utf8"));
} catch {
    console.error("dist/page-weight.json not found. run `npm run build` first.");
    process.exit(1);
}

const rows = pages
    .map((p) => {
        const totalOk = p.total <= TOTAL_BUDGET;
        const nonFontOk = p.nonFont <= NON_FONT_BUDGET;
        return {
            page: p.path,
            total: `${kb(p.total)} / ${kb(TOTAL_BUDGET)}`,
            nonFont: `${kb(p.nonFont)} / ${kb(NON_FONT_BUDGET)}`,
            status: totalOk && nonFontOk ? "ok" : "OVER",
        };
    })
    .sort((a, b) => a.page.localeCompare(b.page));

const width = (key, label) => Math.max(label.length, ...rows.map((r) => r[key].length));
const cols = [
    ["page", "page"],
    ["total", "total / budget"],
    ["nonFont", "non-font / budget"],
    ["status", "status"],
].map(([key, label]) => ({ key, label, w: width(key, label) }));

const line = (cells) => cells.map((c, i) => c.padEnd(cols[i].w)).join("  ");
console.log(line(cols.map((c) => c.label)));
console.log(line(cols.map((c) => "-".repeat(c.w))));
for (const r of rows) console.log(line(cols.map((c) => r[c.key])));

const over = rows.filter((r) => r.status === "OVER");
if (over.length) {
    console.error(`\n${over.length} page(s) over budget`);
    process.exit(1);
}
console.log("\nall pages within budget");
