import { XMLParser } from "fast-xml-parser";
import { GOODREADS_USER_ID, GOODREADS_RSS_KEY } from "@/data/config";

export type Shelf = "currently-reading" | "read" | "favorites";

export type Book = {
    id: number;
    title: string;
    author: string;
    coverUrl: string;
    link: string;
    publishedYear: number | null;
    dateAdded: Date | null;
    dateRead: Date | null;
    pages: number | null;
};

const parser = new XMLParser({ ignoreAttributes: false });

function toDate(value: unknown): Date | null {
    if (typeof value !== "string" || value.trim() === "") return null;
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
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

/* Requests one page of a Goodreads shelf at build time; returns null (and warns) on any failure so a feed problem never breaks the build. */
async function requestShelf(shelf: Shelf, perPage: number, page: number): Promise<Book[] | null> {
    if (!GOODREADS_USER_ID) {
        console.warn(`[goodreads] GOODREADS_USER_ID not set, skipping shelf "${shelf}"`);
        return null;
    }

    let url = `https://www.goodreads.com/review/list_rss/${GOODREADS_USER_ID}?shelf=${shelf}&per_page=${perPage}&page=${page}&sort=date_updated`;
    if (GOODREADS_RSS_KEY) url += `&key=${encodeURIComponent(GOODREADS_RSS_KEY)}`;

    try {
        const res = await fetch(url, {
            headers: { "User-Agent": "Mozilla/5.0 (compatible; daochau-site-build/1.0)" },
            signal: AbortSignal.timeout(10_000),
        });
        if (!res.ok) {
            console.warn(`[goodreads] shelf "${shelf}" returned HTTP ${res.status}, using empty result`);
            return null;
        }

        const xml = await res.text();
        const parsed = parser.parse(xml);
        const rawItems = parsed?.rss?.channel?.item;
        if (!rawItems) return [];

        const items = Array.isArray(rawItems) ? rawItems : [rawItems];

        return items.map((item): Book => ({
            id: Number(item.book_id),
            title: primaryTitle(String(item.title ?? "")),
            author: String(item.author_name ?? ""),
            coverUrl: upscaleCoverUrl(
                String(item.book_large_image_url ?? item.book_medium_image_url ?? item.book_image_url ?? ""),
            ),
            link: String(item.link ?? ""),
            publishedYear: item.book_published ? Number(item.book_published) : null,
            dateAdded: toDate(item.user_date_added),
            dateRead: toDate(item.user_read_at),
            pages: Number(item.book?.num_pages) > 0 ? Number(item.book.num_pages) : null,
        }));
    } catch (err) {
        const reason = err instanceof Error ? err.name : "unknown error";
        console.warn(`[goodreads] shelf "${shelf}" failed (${reason}), using empty result`);
        return null;
    }
}

/* Fetches one Goodreads shelf; returns [] on any failure so a feed problem never breaks the build. */
export async function fetchShelf(shelf: Shelf, perPage = 12, page = 1): Promise<Book[]> {
    return (await requestShelf(shelf, perPage, page)) ?? [];
}

const READ_TZ = "Asia/Ho_Chi_Minh";
const PAGE_SIZE = 100;
const MAX_PAGES = 5;

/* Returns the calendar year of a date in Saigon time. */
function yearInSaigon(d: Date): number {
    return Number(new Intl.DateTimeFormat("en-US", { timeZone: READ_TZ, year: "numeric" }).format(d));
}

/* Fetches the read shelf page by page (capped) and keeps books read this year; null when the feed is unavailable. */
export async function fetchReadThisYear(): Promise<{ year: number; books: Book[] } | null> {
    const year = yearInSaigon(new Date());
    const all: Book[] = [];
    for (let page = 1; page <= MAX_PAGES; page++) {
        const batch = await requestShelf("read", PAGE_SIZE, page);
        if (batch === null) {
            if (page === 1) return null;
            break;
        }
        all.push(...batch);
        if (batch.length < PAGE_SIZE) break;
    }
    return { year, books: all.filter((b) => b.dateRead && yearInSaigon(b.dateRead) === year) };
}

/* Counts books, known pages and average pages per book (only books with a page count). */
export function readStats(books: Book[]) {
    const withPages = books.filter((b) => b.pages !== null);
    const pages = withPages.reduce((sum, b) => sum + (b.pages ?? 0), 0);
    return {
        books: books.length,
        pages,
        withoutPages: books.length - withPages.length,
        avg: withPages.length ? Math.round(pages / withPages.length) : 0,
    };
}
