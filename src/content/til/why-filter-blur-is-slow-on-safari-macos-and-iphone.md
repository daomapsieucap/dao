---
title: "Why `filter: blur()` is slow on Safari (macOS and iPhone)"
date: 2026-11-13
---
Safari draws a blur by building an extra image that is much larger than the element: roughly 3 times the blur radius on every side. With `blur(200px)`, a 650px glow becomes an image about 1,800px wide. Safari often does this work on the CPU instead of the GPU, especially on iPhone. If the blurred element moves, fades or sits inside a scrolling or animated parent, Safari redraws the whole blur on every frame, and that causes the lag.


```text
blur(200px) on a 650px glow

+------------------------------------------+
|               extra 600px                |
|       +--------------------------+       |
|       |                          |       |
| 600px |      element  650px      | 600px |
|       |                          |       |
|       +--------------------------+       |
|               extra 600px                |
+------------------------------------------+
     Safari has to draw: ~1,850px wide

Every scroll or fade frame:
element moves --> redraw ~1,850px blur on CPU --> frame dropped --> lag
```

**Fix:** to make a soft glow, use a `radial-gradient` background instead of `filter: blur()`. It looks almost the same and costs almost nothing to draw. If you really need a blur, keep the radius small (under 20px) and don't animate the element.