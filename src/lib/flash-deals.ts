import { products, type Product } from "@/lib/site";

/**
 * Products included in the Flash Deals promotion, in display order. Any surface
 * that shows one of these (homepage strip, product cards, catalogue listing)
 * should use `flashDealPrice` so the offer price is identical everywhere.
 */
export const FLASH_DEAL_SLUGS = [
  "bosch-percussion-drill-600w-gsb600",
  "humhon-jigsaw-500w-js6003",
  "giant-air-compressor-24l-24l",
  "zrm-water-pump-0-5hp-qb60",
  "wokin-heavy-duty-tile-cutter-cutt-wokin-00672",
  "humhon-rotary-hammer-800w-rh26",
  "bosch-planer-650w-gho650",
  "giant-cleaning-pressure-machine-ccm280",
  "zrm-submersible-pump-1hp-qdx750hf",
  "bosch-cordless-screwdriver-12v-gsr120",
  "humhon-electric-mixer-em168",
  "humhon-drywall-sander-ws180",
];

const flashDealSlugSet = new Set<string>(FLASH_DEAL_SLUGS);

/**
 * Manually agreed Flash Deal prices, keyed by slug. These win over the computed
 * pricing below so a specific promotion can be advertised at an exact figure.
 * The "was" price should be the product's genuine previous selling price.
 */
const flashDealOverrides: Record<string, { wasPrice: number; offerPrice: number }> = {
  "giant-cleaning-pressure-machine-ccm280": {
    wasPrice: 53900,
    offerPrice: 49900,
  },
  "zrm-water-pump-0-5hp-qb60": {
    // Selling price confirmed by the client. The struck-through figure is a
    // placeholder — replace with the genuine previous price before launch.
    wasPrice: 20900,
    offerPrice: 18900,
  },
  "humhon-electric-mixer-em168": {
    wasPrice: 17900,
    offerPrice: 16900,
  },
  "humhon-drywall-sander-ws180": {
    wasPrice: 25950,
    offerPrice: 23500,
  },
};

/**
 * Flash Deal pricing: the listed price is lifted by 10% to become the
 * struck-through "was" price, and that same 10% is then taken back off again to
 * give the offer price the customer actually pays. Both figures are rounded to
 * the nearest 10 LKR so the prices read cleanly.
 *
 * Returns null for products that are not part of the promotion, so callers can
 * fall back to the normal listed price.
 */
export function flashDealPrice(product: Product) {
  if (typeof product.price !== "number" || !flashDealSlugSet.has(product.slug)) return null;

  const override = flashDealOverrides[product.slug];
  if (override) return override;

  const wasPrice = Math.round((product.price * 1.1) / 10) * 10;
  const offerPrice = Math.round((wasPrice * 0.9) / 10) * 10;
  return { wasPrice, offerPrice };
}

/** The Flash Deals products, in promotion order. */
export function getFlashDeals(): Product[] {
  return FLASH_DEAL_SLUGS.map((slug) => products.find((p) => p.slug === slug)).filter(
    (p): p is Product => typeof p?.price === "number",
  );
}
