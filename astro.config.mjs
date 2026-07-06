import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import { SITE_URL } from "./src/data/config";

export default defineConfig({
  integrations: [sitemap(), robotsTxt()],
  site: SITE_URL,
});
