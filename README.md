# dao chau · personal site

> behind the curtain, keeping things running.

The source of [daochau.com](https://daochau.com), a small terminal-flavored
corner of the web for a PHP backend developer who writes the half of the web
you never see. Built with Astro, styled with plain CSS, and small on purpose,
much like the rest of my life.

Two-column layout: sticky identity rail on the left, content on the right.
No utility framework, no client-side JS beyond analytics.

## $ ls /pages

- `/`: description, echo (featured projects), now, notes
- `/til`: things I learned, one markdown file at a time
- `/uses`: the hardware & software I keep around
- `/reading`: currently reading + recently finished, pulled from goodreads at build time

## $ cat stack

- [Astro](https://astro.build): static site generator
- CSS custom properties: one stylesheet, light/dark theming
- JetBrains Mono + Newsreader: self-hosted via Fontsource
- `@astrojs/sitemap`, `astro-robots-txt`, `astro-seo`: SEO plumbing
- `fast-xml-parser`: parses the Goodreads RSS feed at build time for `/reading`
- Google Analytics: plain async `gtag.js` snippet, no extra tooling
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
| Featured projects      | `src/data/projects.ts`                     |
| Site config / URL      | `src/data/config.ts`                       |
| Styles & CSS variables | `src/styles/main.css`                      |
| Meta tags, fonts, GA   | `src/components/seo/SEOTags.astro`         |
| Goodreads feed parsing | `src/utils/goodreads.ts`                   |
| Favicon (goggle mark)  | `public/favicon.svg`                       |
| Goodreads user id      | `.env` (`GOODREADS_USER_ID`, gitignored)   |

New TIL post: drop a markdown file in `src/content/til/` with `title`,
`date`, and optional `tags` frontmatter (schema in `src/content.config.ts`).

`/reading` needs `GOODREADS_USER_ID` set (copy `.env.example` to `.env`
locally; set the same as a repo secret for the deploy workflow). The id
stays out of source since the repo is public.

---

`dao@chau:~$ cat mantra` → */You become what you feed your mind./*
