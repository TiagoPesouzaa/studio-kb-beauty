import type { APIRoute } from "astro";
import { siteConfig } from "@/config/site";

/** Páginas do site. Página única: só a raiz. Se o template ganhar páginas, liste aqui. */
const paths = ["/"];

/** Lista as páginas para o Google (gerado no build, com a data do deploy). */
export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = paths
    .map((path) => `  <url><loc>${new URL(path, siteConfig.url).href}</loc><lastmod>${lastmod}</lastmod></url>`)
    .join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
};
