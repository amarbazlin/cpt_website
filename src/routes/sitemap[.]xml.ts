import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { SITE_URL, absoluteUrl } from "@/lib/seo";
import { categories, products } from "@/lib/site";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
  /** Optional image sitemap data (product photography). */
  image?: { loc: string; title: string };
}

/** Minimal XML text escaping for attribute/text nodes. */
const xml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/about", changefreq: "monthly", priority: "0.7" },
          { path: "/services", changefreq: "monthly", priority: "0.8" },
          { path: "/products", changefreq: "weekly", priority: "0.9" },
          // Category landing pages, using the canonical filtered URLs the
          // products route points its canonical tag at.
          ...categories.map((c) => ({
            path: `/products?category=${c.slug}`,
            changefreq: "weekly" as const,
            priority: "0.8",
            image: { loc: absoluteUrl(c.image), title: c.name },
          })),
          ...products.map((p) => ({
            path: `/products/${p.slug}`,
            changefreq: "monthly" as const,
            priority: "0.8",
            image: { loc: absoluteUrl(p.image), title: p.name },
          })),
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${xml(`${SITE_URL}${e.path}`)}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            e.image
              ? [
                  `    <image:image>`,
                  `      <image:loc>${xml(e.image.loc)}</image:loc>`,
                  `      <image:title>${xml(e.image.title)}</image:title>`,
                  `    </image:image>`,
                ].join("\n")
              : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const body = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(body, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
