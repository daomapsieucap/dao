---
title: Vietnamese uppercase text clipped in <input> fields on Chromium browsers
date: 2026-07-24
tags:
  - vietnamese-font
  - frontend
---
The font file itself declares how tall its tallest characters are ("ascent"), and that number was set too low, shorter than Vietnamese uppercase letters with stacked accents (like Ẫ, Ổ). Chromium uses that number alone to size the text box in a single-line `<input>` field, ignoring any CSS line-height, so the top of those letters got cut off and no CSS tweak could fix it. 
Multi-line `<textarea>` fields and normal page text weren't affected because they don't clip text that overflows.

### Worst-offending glyphs (yMax vs. 776 declared ascent)
| Glyph | Description | Ink top (yMax) |
|---|---|---|
| Ẳ | A + breve + hook above | 1170 |
| Ẫ | A + circumflex + tilde | 1138 |
| Ỗ | O + circumflex + tilde | 1134 |
| Ắ | A + breve + acute | 1132 |
| Ằ | A + breve + grave | 1128 |
| Ễ | E + circumflex + tilde | 1128 |
| Ẩ | A + circumflex + hook above | 1114 |
| Ẵ | A + breve + tilde | 1113 |
| Ổ | O + circumflex + hook above | 1113 |