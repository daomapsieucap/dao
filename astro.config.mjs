import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import pageWeight from "./src/integrations/page-weight";
import { SITE_URL } from "./src/data/config";

export default defineConfig({
  integrations: [sitemap({ filter: (page) => new URL(page).pathname !== "/sudo/" }), pageWeight()],
  site: SITE_URL,
  markdown: {
    shikiConfig: {
      theme: "css-variables",
    },
  },
});
