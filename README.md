# dao chau · personal site

> behind the curtain, keeping things running.

[daochau.com](https://daochau.com), a small e-reader-flavored personal site, black ink on paper.
Built with Astro and plain CSS; no utility framework, and only small inline
client-side JS (theme toggle, shortcuts, shelf filter, a few easter eggs).

Small on purpose, much like the rest of my life.

## $ ls /pages

- `/`: description, echo (featured projects), now, notes
- `/til`: things I learned, one markdown file at a time
- `/uses`: the hardware & software I keep around
- `/reading`: currently reading + recently finished, pulled live from goodreads at build time (profile page + read widget), covers sized per screen via the goodreads CDN
- `/now`: every snapshot of the home page's now section, one markdown file each
- `/404`: banana not found, the goggle stands in for the 0

## $ cat stack

- [Astro](https://astro.build): static site generator
- CSS custom properties: one stylesheet, light/dark theming, inlined into each page so nothing blocks render
- Literata + Inter + JetBrains Mono: self-hosted via Fontsource, latin subsets preloaded
- `@astrojs/sitemap`, static `robots.txt`, `astro-seo`: SEO plumbing
- Google Analytics: plain `gtag.js` snippet, loaded at idle after page load
- `npm run budget`: per-page weight check (runs in CI after the build)
- GitHub Pages: every push to `master` type-checks and deploys itself

## $ dao --help

| Command           | Action                                     |
| :---------------- | :----------------------------------------- |
| `npm install`     | Install dependencies                       |
| `npm run dev`     | Start local dev server at `localhost:4321` |
| `npm run build`   | Build to `./dist/`                         |
| `npm run preview` | Preview the production build locally       |
| `npm run check`   | Run Astro type check                       |

## $ vim content

| What                   | Where                                      |
| :--------------------- | :----------------------------------------- |
| Page copy              | `src/pages/index.astro`, `uses.astro`      |
| TIL posts              | `src/content/til/*.md` (title, date, tags) |
| Now snapshots          | `src/content/now/*.md` (updated, work, learning, reading) |
| Featured projects      | `src/data/projects.ts`                     |
| Site config / URL      | `src/data/config.ts`                       |
| Styles & CSS variables | `src/styles/main.css`                      |
| Meta tags, fonts, GA   | `src/components/seo/SEOTags.astro`         |
| Goodreads fetching     | `src/utils/goodreads.ts`                   |
| Favicon (goggle mark)  | `public/favicon.svg`                       |
| Goodreads user id      | `.env` (`GOODREADS_USER_ID`, gitignored)   |

New TIL post: drop a markdown file in `src/content/til/` with `title`,
`date`, and optional `tags` frontmatter (schema in `src/content.config.ts`).
Or edit TIL posts from anywhere, phone included, via
[app.pagescms.org](https://app.pagescms.org) (config in `.pages.yml`).

`/reading` needs `GOODREADS_USER_ID` set (copy `.env.example` to `.env`
locally; set the same as a repo secret for the deploy workflow). The id
stays out of source since the repo is public.

Started from [astro-portfolio-template](https://github.com/MaeWolff/astro-portfolio-template) by Maxence WOLFF (MIT).

---

`dao@chau:~$ cat mantra` → */You become what you feed your mind./*
