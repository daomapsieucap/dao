import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import partytown from "@astrojs/partytown";
import { SITE_URL } from "./src/data/config";

export default defineConfig({
  integrations: [
    sitemap(),
    robotsTxt({
      sitemap: `${SITE_URL}/sitemap.xml`,
    }),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
  site: SITE_URL,
});
