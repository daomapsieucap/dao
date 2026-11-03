import { GOODREADS_USER_ID } from "@/data/config";

export type Shelf = "currently-reading" | "read" | "favorites";

export type Book = {
    id: number;
    title: string;
    author: string;
    coverUrl: string;
    link: string;
};

const BASE = "https://www.goodreads.com";
const HEADERS = { "User-Agent": "Mozilla/5.0 (compatible; daochau-site-build/1.0)" };

/* Goodreads retired its RSS feeds, so live data now comes from two public sources:
   the profile page (currently reading + favorites preview) and the custom widget
   script (the most recent read books, capped at 5 by Goodreads). */

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" };

function decode(value: string): string {
    return value
        .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
        .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
        .replace(/&([a-z]+);/gi, (m, name) => ENTITIES[name.toLowerCase()] ?? m)
        .trim();
}

function stripTags(value: string): string {
    return decode(value.replace(/<[^>]*>/g, ""));
}

// goodreads sometimes truncates long titles with a trailing subtitle after a colon
function primaryTitle(title: string): string {
    const [head] = title.split(":");
    return head.trim();
}

// goodreads' cover urls carry a size token (e.g. "._SY475_.") that the image CDN
// honors on request; bump it up so covers stay crisp on retina displays. the CDN
// clamps to the source image's real resolution, so this is safe even if the
// original is smaller than requested.
function upscaleCoverUrl(url: string): string {
    return url.replace(/\.(_S[XY]\d+_)\./, "._SY600_.");
}

function makeBook(id: string, title: string, author: string, cover: string): Book {
    return {
        id: Number(id),
        title: primaryTitle(decode(title)),
        author: decode(author),
        coverUrl: upscaleCoverUrl(cover),
        link: `${BASE}/book/show/${id}`,
    };
}

/* Fetches text from Goodreads; returns null (and warns) on any failure so a source problem never breaks the build. */
async function fetchText(label: string, url: string): Promise<string | null> {
    try {
        const res = await fetch(url, { headers: HEADERS, signal: AbortSignal.timeout(10_000) });
        if (!res.ok) {
            console.warn(`[goodreads] ${label} returned HTTP ${res.status}, using empty result`);
            return null;
        }
        return await res.text();
    } catch (err) {
        const reason = err instanceof Error ? err.name : "unknown error";
        console.warn(`[goodreads] ${label} failed (${reason}), using empty result`);
        return null;
    }
}

// the profile page is requested once per build and shared by the shelves that read from it
let profileHtml: Promise<string | null> | null = null;

function getProfileHtml(): Promise<string | null> {
    profileHtml ??= fetchText("profile", `${BASE}/user/show/${GOODREADS_USER_ID}`);
    return profileHtml;
}

/* Returns the part of the html between two markers (or to the end when the end marker is missing). */
function section(html: string, startMarker: string, endMarker: string): string {
    const start = html.indexOf(startMarker);
    if (start === -1) return "";
    const end = html.indexOf(endMarker, start + startMarker.length);
    return html.slice(start, end === -1 ? undefined : end);
}

function parseCurrentlyReading(html: string): Book[] {
    const block = section(html, 'id="currentlyReadingReviews"', 'id="featured_shelf"');
    const books: Book[] = [];
    for (const chunk of block.split('<div class="Updates no_border">').slice(1)) {
        const id = chunk.match(/href="\/book\/show\/(\d+)/)?.[1];
        const cover = chunk.match(/<img[^>]*\ssrc="([^"]+)"/)?.[1];
        const title = chunk.match(/class="bookTitle"[^>]*>([\s\S]*?)<\/a>/)?.[1];
        const author = chunk.match(/class="authorName"[^>]*>([\s\S]*?)<\/a>/)?.[1];
        if (id && cover && title) books.push(makeBook(id, stripTags(title), stripTags(author ?? ""), cover));
    }
    return books;
}

function parseFavorites(html: string): Book[] {
    const block = section(html, 'id="featured_shelf"', 'class="clear"');
    const books: Book[] = [];
    const re = /<a href="\/book\/show\/(\d+)[^"]*"><img[^>]*?title="([^"]*)"[^>]*?src="([^"]+)"/g;
    for (const [, id, label, cover] of block.matchAll(re)) {
        // the label reads "Title by Author"
        const sep = label.lastIndexOf(" by ");
        const title = sep === -1 ? label : label.slice(0, sep);
        const author = sep === -1 ? "" : label.slice(sep + 4);
        books.push(makeBook(id, title, author, cover));
    }
    return books;
}

async function fetchRecentlyRead(): Promise<Book[]> {
    const js = await fetchText("read widget", `${BASE}/review/custom_widget/${GOODREADS_USER_ID}?shelf=read`);
    if (!js) return [];

    // the script wraps the widget markup in a js string literal; undo its escaping
    const html = js.replace(/\\(["'\/])/g, "$1").replace(/\\n/g, "\n");
    const books: Book[] = [];
    for (const chunk of html.split("gr_custom_each_container_").slice(1)) {
        const cover = chunk.match(/<img[^>]*?\ssrc="([^"]+\/books\/[^"]+)"/)?.[1];
        const id = cover?.match(/\/books\/\d+l\/(\d+)\./)?.[1];
        const title = chunk.match(/gr_custom_title_">\s*<a[^>]*>([\s\S]*?)<\/a>/)?.[1];
        const author = chunk.match(/gr_custom_author_">\s*by\s*<a[^>]*>([\s\S]*?)<\/a>/)?.[1];
        if (id && cover && title) books.push(makeBook(id, stripTags(title), stripTags(author ?? ""), cover));
    }
    return books;
}

/* Fetches one Goodreads shelf; returns [] on any failure so a source problem never breaks the build. */
export async function fetchShelf(shelf: Shelf, limit = 12): Promise<Book[]> {
    if (!GOODREADS_USER_ID) {
        console.warn(`[goodreads] GOODREADS_USER_ID not set, skipping shelf "${shelf}"`);
        return [];
    }

    let books: Book[];
    if (shelf === "read") {
        books = await fetchRecentlyRead();
    } else {
        const html = await getProfileHtml();
        if (!html) return [];
        books = shelf === "favorites" ? parseFavorites(html) : parseCurrentlyReading(html);
    }

    if (books.length === 0) console.warn(`[goodreads] shelf "${shelf}" parsed to 0 books, has the markup changed?`);
    return books.slice(0, limit);
}
