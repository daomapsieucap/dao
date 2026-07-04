import { XMLParser } from "fast-xml-parser";
import { GOODREADS_USER_ID } from "@/data/config";

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

export async function fetchShelf(shelf: Shelf, perPage = 12): Promise<Book[]> {
    if (!GOODREADS_USER_ID) return [];

    const url = `https://www.goodreads.com/review/list_rss/${GOODREADS_USER_ID}?shelf=${shelf}&per_page=${perPage}&sort=date_updated`;

    try {
        const res = await fetch(url, {
            headers: { "User-Agent": "Mozilla/5.0 (compatible; daochau-site-build/1.0)" },
        });
        if (!res.ok) return [];

        const xml = await res.text();
        const parsed = parser.parse(xml);
        const rawItems = parsed?.rss?.channel?.item;
        if (!rawItems) return [];

        const items = Array.isArray(rawItems) ? rawItems : [rawItems];

        return items.map((item): Book => ({
            id: Number(item.book_id),
            title: primaryTitle(String(item.title ?? "")),
            author: String(item.author_name ?? ""),
            coverUrl: String(item.book_medium_image_url ?? item.book_image_url ?? ""),
            link: String(item.link ?? ""),
            publishedYear: item.book_published ? Number(item.book_published) : null,
            dateAdded: toDate(item.user_date_added),
            dateRead: toDate(item.user_read_at),
        }));
    } catch {
        return [];
    }
}
