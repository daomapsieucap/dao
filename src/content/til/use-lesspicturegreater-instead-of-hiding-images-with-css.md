---
title: Use <picture> instead of hiding images with CSS
date: 2026-10-01
---
Hiding a desktop/mobile `<img>` with CSS (`display: none`) doesn't stop it from downloading, so both images load, especially with `loading="eager"`. 

Use `<picture>` with `<source media>` so only one is fetched:

```html
<picture>
  <source media="(min-width: 992px)" srcset="desktop.jpg">
  <img src="mobile.jpg" alt="..." loading="eager">
</picture>
```

Must verify the animation code targeting the two separate `<img>` elements still works, since there is now only one.