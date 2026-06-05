# dao chau · personal site

Personal portfolio site at [daochau.com](https://daochau.com), built with Astro.

Two-column layout: sticky identity rail on the left, content sections on the right. Pure CSS, no framework.

## Stack

- [Astro](https://astro.build) — static site generator
- CSS custom properties — no utility framework
- JetBrains Mono + Newsreader — typography
- GitHub Pages — hosting, deployed on push to `master`

## Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Start local dev server at `localhost:4321`   |
| `npm run build`   | Build to `./dist/`                           |
| `npm run preview` | Preview the production build locally         |
| `npm run check`   | Run Astro type check                         |

## Content

- `src/pages/index.astro` — page content (description, now, notes sections)
- `src/data/projects.ts` — featured projects list
- `src/styles/main.css` — all styles and CSS variables
- `src/components/seo/SEOTags.astro` — meta tags, fonts, GA
- `public/favicon.svg` — goggle mark favicon
