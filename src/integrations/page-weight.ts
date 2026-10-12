import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";
import type { AstroIntegration } from "astro";

const TOKEN = "__PAGE_WEIGHT__";

/* Lists every .html file under a directory, recursively. */
function htmlFiles(dir: string): string[] {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) return htmlFiles(full);
        return entry.name.endsWith(".html") ? [full] : [];
    });
}

/* Returns the /_astro/ assets a page loads: stylesheets, scripts and preloaded fonts, each once. */
function pageAssets(html: string): string[] {
    const found = new Set<string>();
    for (const [tag] of html.matchAll(/<(?:link|script)\b[^>]*>/g)) {
        const url = (tag.match(/\b(?:href|src)="([^"]+)"/) ?? [])[1];
        if (!url || !url.startsWith("/_astro/")) continue;
        const isCss = /rel="stylesheet"/.test(tag);
        const isScript = tag.startsWith("<script");
        const isFont = /rel="preload"/.test(tag) && /\.woff2$/.test(url);
        if (isCss || isScript || isFont) found.add(url);
    }
    return [...found];
}

/* Gzip size (level 9) for text assets, raw size for woff2. */
function weightOf(buf: Buffer, file: string): number {
    return file.endsWith(".woff2") ? buf.length : zlib.gzipSync(buf, { level: 9 }).length;
}

/* Measures what each built page loads, writes dist/page-weight.json and fills the weight token in the HTML. */
export default function pageWeight(): AstroIntegration {
    return {
        name: "page-weight",
        hooks: {
            "astro:build:done": ({ dir }) => {
                const outDir = fileURLToPath(dir);
                const pages = [];

                for (const file of htmlFiles(outDir)) {
                    const raw = fs.readFileSync(file, "utf8");
                    // measure with a same-width stand-in so the final replacement does not change the size
                    const html = Buffer.from(raw.replaceAll(TOKEN, "000kB"));
                    const files = [{ file: "html", bytes: weightOf(html, ".html") }];
                    for (const asset of pageAssets(raw)) {
                        const assetPath = path.join(outDir, asset);
                        if (!fs.existsSync(assetPath)) continue;
                        files.push({ file: asset, bytes: weightOf(fs.readFileSync(assetPath), asset) });
                    }

                    const total = files.reduce((sum, f) => sum + f.bytes, 0);
                    const nonFont = files.filter((f) => !f.file.endsWith(".woff2")).reduce((sum, f) => sum + f.bytes, 0);
                    const rel = path.relative(outDir, file).split(path.sep).join("/");
                    const pagePath = "/" + rel.replace(/index\.html$/, "");

                    pages.push({ path: pagePath, total, nonFont, files });
                    fs.writeFileSync(file, raw.replaceAll(TOKEN, `${Math.round(total / 1000)}kB`));
                }

                fs.writeFileSync(path.join(outDir, "page-weight.json"), JSON.stringify(pages, null, 2));
            },
        },
    };
}
