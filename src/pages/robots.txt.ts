import type { APIRoute } from "astro";
import { siteConfig } from "@/config/site";

/**
 * Diz aos buscadores que podem ler o site, menos as pastas em `hiddenFromSearch`
 * (fotos que o cliente não quer no Google), e onde fica o sitemap.
 */
export const GET: APIRoute = () => {
  const hidden = siteConfig.hiddenFromSearch.map((path) => `Disallow: ${path}`);
  const lines = ["User-agent: *", "Allow: /", ...hidden, "", `Sitemap: ${new URL("/sitemap.xml", siteConfig.url).href}`];

  return new Response(`${lines.join("\n")}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
