import type { APIRoute } from "astro";

export const GET: APIRoute = () => {
  const buildDate = new Date().toISOString().slice(0, 10);
  const body = `/* TEAM */
maker: dao chau
site: https://daochau.com
from: behind the curtain, keeping things running

/* SITE */
last build: ${buildDate}
stack: astro, plain css, jetbrains mono, newsreader
hosting: github pages
no client-side js beyond analytics and a banana
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
