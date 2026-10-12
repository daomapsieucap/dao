import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const til = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/til" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).optional(),
  }),
});

const now = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/now" }),
  schema: z.object({
    updated: z.coerce.date(),
    work: z.string(),
    learning: z.string(),
    reading: z.string(),
  }),
});

export const collections = { til, now };
