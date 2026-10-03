/**
 * SEO / AEO helpers — canonical URLs, Open Graph tags and Schema.org JSON-LD.
 *
 * Everything in this file is additive metadata. It never rewrites the copy that
 * pages render: product names, product descriptions and FAQ answers are reused
 * verbatim from `src/lib/site.ts`, and any new supporting text (alt text, image
 * descriptions) is written here rather than edited into the on-page content.
 */
import { flashDealPrice } from "@/lib/flash-deals";
import { imageManifest } from "@/lib/image-manifest";
import { business, categories, faqs, type Product } from "@/lib/site";

/** Canonical production origin. Every absolute URL on the site is built from it. */
export const SITE_URL = "https://www.ceylonplatinum.shop";
export const SITE_NAME = business.name;

/** Kotuwegoda (Matara) coordinates for the Old Tangalle Road showroom. */
export const GEO = { latitude: 5.95, longitude: 80.55 };

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export type JsonLd = Record<string, unknown>;

/** Absolute URL for a site-relative path (canonical, og:url, og:image, …). */
export function absoluteUrl(pathname: string): string {
  if (/^https?:\/\//i.test(pathname)) return pathname;
  return `${SITE_URL}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

/** og:image mime type, derived from the file extension (meta tags only). */
function mimeType(url: string): string {
  if (/\.avif$/i.test(url)) return "image/avif";
  if (/\.webp$/i.test(url)) return "image/webp";
  if (/\.png$/i.test(url)) return "image/png";
  return "image/jpeg";
}

export type MetaTag = { property: string; content: string } | { name: string; content: string };

/**
 * Open Graph + Twitter image tags for an image under `public/`.
 *
 * Facebook/WhatsApp ignore preview images larger than 600KB, and the catalogue
 * sources are far bigger than that, so the pipeline's ≤1200px flattened JPEG is
 * preferred when it exists. `alt` is metadata (the same string the page already
 * uses for the visible image), never new on-page copy.
 */
export function socialImageMeta(src: string, alt: string): MetaTag[] {
  const meta = imageManifest[src];
  const image = meta?.og
    ? { url: absoluteUrl(meta.og.url), width: meta.og.width, height: meta.og.height }
    : meta
      ? { url: absoluteUrl(src), width: meta.width, height: meta.height }
      : undefined;
  if (!image) return [];
  return [
    { property: "og:image", content: image.url },
    { property: "og:image:secure_url", content: image.url },
    { property: "og:image:type", content: mimeType(image.url) },
    { property: "og:image:width", content: String(image.width) },
    { property: "og:image:height", content: String(image.height) },
    { property: "og:image:alt", content: alt },
    { name: "twitter:image", content: image.url },
    { name: "twitter:image:alt", content: alt },
  ];
}

/* ------------------------------------------------------------------------- */
/* Schema.org JSON-LD                                                        */
/* ------------------------------------------------------------------------- */

/**
 * HardwareStore + LocalBusiness + Organization. Emitted from `__root.tsx` so
 * every page carries the same name / address / phone, opening hours, geo
 * coordinates and Southern Province service area.
 */
export const organizationSchema: JsonLd = {
  "@context": "https://schema.org",
  "@type": ["HardwareStore", "LocalBusiness", "Organization"],
  "@id": ORGANIZATION_ID,
  name: business.name,
  legalName: business.name,
  alternateName: ["CPT Matara", business.shortName, business.initials],
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    "@id": `${SITE_URL}/#logo`,
    url: absoluteUrl("/brands/company-logo.png"),
    contentUrl: absoluteUrl("/brands/company-logo.png"),
    caption: `${business.name} logo`,
  },
  image: absoluteUrl("/brands/company-logo.png"),
  slogan: business.tagline,
  description:
    "Ceylon Platinum Trading (PVT) Ltd is a hardware distribution company in Matara, Sri Lanka, supplying power tools, hand tools, paints and coatings, door and window hardware, machinery, compressors, motors and pumps to homeowners, contractors, builders and hardware retailers island-wide.",
  telephone: business.phoneIntl,
  email: business.email,
  foundingDate: "2026",
  address: {
    "@type": "PostalAddress",
    streetAddress: business.street,
    addressLocality: business.city,
    postalCode: business.postalCode,
    addressRegion: "Southern Province",
    addressCountry: "LK",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: GEO.latitude,
    longitude: GEO.longitude,
  },
  hasMap: business.mapsUrl,
  // Serves the Southern Province first, then ships island-wide.
  areaServed: [
    { "@type": "AdministrativeArea", name: "Southern Province, Sri Lanka" },
    { "@type": "Country", name: "Sri Lanka" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "17:00",
    },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: business.phoneIntl,
      email: business.email,
      areaServed: "LK",
      availableLanguage: ["en"],
    },
  ],
  currenciesAccepted: "LKR",
  paymentAccepted: "Cash on Delivery (COD)",
  priceRange: "Rs.",
  brand: [
    "Bosch",
    "Tolsen",
    "Humhon",
    "Asian Paints",
    "Causeway",
    "Bellucci",
    "OMAC",
    "Giant",
    "Wipro",
    "Multibond",
    "As-Ron",
  ].map((name) => ({ "@type": "Brand", name })),
  // Category names and blurbs are reused verbatim from the catalogue data.
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Hardware categories",
    itemListElement: categories.map((c) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Product",
        name: c.name,
        description: c.blurb,
        url: absoluteUrl(`/products?category=${c.slug}`),
      },
    })),
  },
};

/** WebSite + SearchAction pointing at the catalogue's `?q=` product search. */
export const websiteSchema: JsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: business.name,
  alternateName: business.shortName,
  inLanguage: "en-LK",
  publisher: { "@id": ORGANIZATION_ID },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/products?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

/**
 * FAQPage marking up the FAQ accordion exactly as the site already writes it —
 * questions and answers are copied straight from `faqs` with no rewording.
 */
export const faqSchema: JsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}/#faq`,
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

/** Wraps JSON-LD objects in the shape TanStack Start expects for head scripts. */
export function jsonLdScripts(schemas: (JsonLd | null | undefined)[]) {
  return schemas
    .filter((schema): schema is JsonLd => Boolean(schema))
    .map((schema) => ({ type: "application/ld+json", children: JSON.stringify(schema) }));
}

export type Crumb = { name: string; path?: string };

/** BreadcrumbList built from existing page labels/titles (no new copy). */
export function breadcrumbSchema(crumbs: Crumb[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      ...(crumb.path ? { item: absoluteUrl(crumb.path) } : {}),
    })),
  };
}

/** Home → Products → (Category) → Product, using the labels shown on the page. */
export function productCrumbs(product: Product): Crumb[] {
  const category = categories.find((c) => c.slug === product.category);
  return [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    ...(category ? [{ name: category.name, path: `/products?category=${category.slug}` }] : []),
    { name: product.name, path: `/products/${product.slug}` },
  ];
}

/**
 * Product schema. `description` is the product's own description text, reused
 * verbatim — the same sentence the page already renders under its title.
 */
export function productSchema(product: Product): JsonLd {
  const meta = imageManifest[product.image];
  const url = absoluteUrl(`/products/${product.slug}`);
  const category = categories.find((c) => c.slug === product.category);
  const model = product.specs.find((s) => s.label === "Model")?.value;
  // Advertise the price actually shown on the page: Flash Deal items sell at
  // their offer price, everything else at the listed price.
  const deal = flashDealPrice(product);
  const price = deal ? deal.offerPrice : product.price;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: product.name,
    image: [absoluteUrl(meta?.og?.url ?? product.image)],
    description: product.description,
    sku: product.slug,
    ...(model ? { mpn: model } : {}),
    brand: { "@type": "Brand", name: product.brand },
    ...(category ? { category: category.name } : {}),
    url,
    offers: {
      "@type": "Offer",
      "@id": `${url}#offer`,
      url,
      priceCurrency: "LKR",
      ...(price ? { price } : {}),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "HardwareStore",
        "@id": ORGANIZATION_ID,
        name: business.name,
        telephone: business.phoneIntl,
        address: {
          "@type": "PostalAddress",
          streetAddress: business.street,
          addressLocality: business.city,
          postalCode: business.postalCode,
          addressRegion: "Southern Province",
          addressCountry: "LK",
        },
      },
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Southern Province, Sri Lanka",
      },
    },
  };
}
