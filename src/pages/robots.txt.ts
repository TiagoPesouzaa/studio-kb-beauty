import type { APIRoute } from "astro";
import { siteConfig } from "@/config/site";

/** Diz aos buscadores que podem ler o site todo e onde fica o sitemap. */
export const GET: APIRoute = () =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL("/sitemap.xml", siteConfig.url).href}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
