import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import pageWeight from "./src/integrations/page-weight";
import { SITE_URL } from "./src/data/config";

export default defineConfig({
  integrations: [sitemap({ filter: (page) => new URL(page).pathname !== "/sudo/" }), robotsTxt({
      transform: (content) => `# Disallow: /banana-stand (not really. but you looked.)

${content}`,
    }), pageWeight()],
  site: SITE_URL,
  markdown: {
    shikiConfig: {
      theme: "css-variables",
    },
  },
});
