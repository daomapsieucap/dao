---
title: "Cloudflare is a solid escape hatch when GitHub Pages forces you public"
date: 2026-06-19
tags: ["cloudflare", "deployment", "devops"]
---

GitHub Pages requires a public repo on the free plan. Two Cloudflare alternatives depending on how private you need to go:

- **Cloudflare Pages** — deploy from a private repo, site is still publicly accessible
- **Cloudflare Pages + Zero Trust** — add an Access policy to gate the site behind a login (email OTP, Google, GitHub, etc.)

Zero Trust free tier covers up to 50 users, which is plenty for personal or small-team projects.
