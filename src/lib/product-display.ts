import type { Product } from "@/lib/site";

export function formatProductPrice(price: number | undefined) {
  return price ? `Rs. ${price.toLocaleString("en-LK")}` : "Price on request";
}

export function productModelFromSpecs(product: Product) {
  return product.specs.find((s) => s.label === "Model")?.value;
}

function productCodeFromSpecs(product: Product) {
  return product.specs.find((s) => /^(model|sku|product code|code)$/i.test(s.label))?.value;
}

/** Search haystack: name, brand, summary, model, product code, slug. */
export function productMatchesSearch(product: Product, query: string) {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  const model = productModelFromSpecs(product);
  const code = productCodeFromSpecs(product);
  const haystack = `${product.name} ${product.brand} ${product.summary} ${model ?? ""} ${code ?? ""} ${product.slug}`.toLowerCase();
  return haystack.includes(needle);
}

export function productHasWarranty(product: Product) {
  const warranty = product.specs.find((s) => s.label === "Warranty");
  if (!warranty?.value) return false;
  return !warranty.value.toLowerCase().includes("to be confirmed");
}

export function descriptionParagraphs(description: string) {
  return description.split(/(?<=\.)\s+/).filter((p) => p.trim().length > 0);
}

export function getRelatedProducts(current: Product, catalogue: Product[], max = 6) {
  const others = catalogue.filter((p) => p.slug !== current.slug);
  const sameCategory = others.filter((p) => p.category === current.category);
  const sameBrand = others.filter((p) => p.brand === current.brand && p.category !== current.category);

  const picked: Product[] = [];
  const seen = new Set<string>();

  for (const p of [...sameCategory, ...sameBrand, ...others]) {
    if (seen.has(p.slug)) continue;
    seen.add(p.slug);
    picked.push(p);
    if (picked.length >= max) break;
  }

  return picked;
}
