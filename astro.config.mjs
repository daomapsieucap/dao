import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import { SITE_URL } from "./src/data/config";

export default defineConfig({
  integrations: [sitemap(), robotsTxt({
      transform: (content) => `# Disallow: /banana-stand (not really. but you looked.)

${content}`,
    })],
  site: SITE_URL,
  markdown: {
    shikiConfig: {
      theme: "css-variables",
    },
  },
});
