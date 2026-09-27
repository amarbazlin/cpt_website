import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownUp, ChevronLeft, ChevronRight, Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { MobileProductFilters } from "@/components/MobileProductFilters";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { productMatchesSearch } from "@/lib/product-display";
import { absoluteUrl, breadcrumbSchema, jsonLdScripts, socialImageMeta } from "@/lib/seo";
import { categories, photos, products } from "@/lib/site";
import { cn } from "@/lib/utils";

const searchSchema = z.object({
  q: z.string().optional().catch(undefined),
  category: z.string().optional().catch(undefined),
  brand: z.string().optional().catch(undefined),
});

/** Brands shown in the "Browse by brand" list on the products page. */
const browseBrands = [
  "Asian Paints",
  "Bosch",
  "Giant",
  "Hasky",
  "Humhon",
  "Tolsen",
  "Wokin",
  "Wipro",
  "ZRM",
] as const;

type SortKey = "featured" | "name-asc" | "name-desc" | "price-asc" | "price-desc" | "brand-asc";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "name-asc", label: "Name (A–Z)" },
  { key: "name-desc", label: "Name (Z–A)" },
  { key: "price-asc", label: "Price (low to high)" },
  { key: "price-desc", label: "Price (high to low)" },
  { key: "brand-asc", label: "Brand (A–Z)" },
];

function sortProducts(list: typeof products, sort: SortKey) {
  const copy = [...list];
  switch (sort) {
    case "name-asc":
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return copy.sort((a, b) => b.name.localeCompare(a.name));
    case "price-asc":
      return copy.sort((a, b) => (a.price ?? Number.MAX_SAFE_INTEGER) - (b.price ?? Number.MAX_SAFE_INTEGER));
    case "price-desc":
      return copy.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    case "brand-asc":
      return copy.sort((a, b) => a.brand.localeCompare(b.brand) || a.name.localeCompare(b.name));
    default:
      return copy;
  }
}

export const Route = createFileRoute("/products/")({
  validateSearch: searchSchema,
  head: ({ match }) => {
    const search = match.search;
    const category =
      search.category && search.category !== "all"
        ? categories.find((c) => c.slug === search.category)
        : undefined;
    const searching = Boolean(search.q?.trim());

    // Category views canonicalise to their own clean URL so they can rank;
    // brand- and search-filtered views canonicalise back to the catalogue so
    // faceted URLs never look like separate duplicate pages.
    const canonical = category ? `/products?category=${category.slug}` : "/products";

    const title = category
      ? `${category.name} | Hardware Catalogue — Ceylon Platinum Trading, Matara`
      : "Products | Hardware Catalogue — Ceylon Platinum Trading, Matara";
    const description = category
      ? `${category.blurb} Order via WhatsApp from Matara, Sri Lanka.`
      : "Browse the Ceylon Platinum Trading hardware catalogue: power tools, hand tools, paints, door hardware, machinery and pumps. Order via WhatsApp from Matara, Sri Lanka.";

    const previewImage = category?.image ?? photos.powerTools;
    const previewAlt = category
      ? `${category.name} available at Ceylon Platinum Trading, Matara`
      : "Power Tools available at Ceylon Platinum Trading, Matara";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: absoluteUrl(canonical) },
        { property: "og:type", content: "website" },
        ...socialImageMeta(previewImage, previewAlt),
        // Search-result URLs stay indexable-but-excluded: they are thin,
        // user-specific views of the same catalogue.
        ...(searching ? [{ name: "robots", content: "noindex, follow" } as const] : []),
      ],
      links: [{ rel: "canonical", href: absoluteUrl(canonical) }],
      scripts: jsonLdScripts([
        breadcrumbSchema(
          category
            ? [
                { name: "Home", path: "/" },
                { name: "Products", path: "/products" },
                { name: category.name, path: `/products?category=${category.slug}` },
              ]
            : [
                { name: "Home", path: "/" },
                { name: "Products", path: "/products" },
              ],
        ),
      ]),
    };
  },
  component: Products,
});

function Products() {
  const search = Route.useSearch();
  const q = search.q ?? "";
  const category = search.category ?? "all";
  const brand = search.brand ?? "all";
  const navigate = Route.useNavigate();

  const [sort, setSort] = useState<SortKey>("featured");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const filtered = useMemo(() => {
    const needle = q.trim();
    const matched = products.filter((p) => {
      const inCat = category === "all" || p.category === category;
      const inBrand = brand === "all" || p.brand === brand;
      const inSearch = productMatchesSearch(p, needle);
      return inCat && inBrand && inSearch;
    });
    return sortProducts(matched, sort);
  }, [q, category, brand, sort]);

  const activeCategory = categories.find((c) => c.slug === category);
  const activeBrand = brand !== "all" ? brand : null;

  const [page, setPage] = useState(1);
  const PAGE_SIZE = 50;
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  useEffect(() => {
    setPage(1);
  }, [q, category, brand]);

  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:py-5">
          <Reveal className="max-w-3xl">
            <h1 className="font-display text-2xl font-extrabold sm:text-4xl">Catalogue</h1>
            <p className="mt-1 text-xs font-bold tracking-wide text-primary uppercase sm:mt-2 sm:text-sm">
              Free islandwide delivery on all products
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-3 py-6 sm:px-4 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          {/* Filters */}
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <label htmlFor="product-search" className="sr-only">
              Search products
            </label>
            <div className="relative hidden lg:block">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="product-search"
                value={q}
                placeholder="Search products, brands or models..."
                className="min-h-10 pl-9"
                onChange={(e) =>
                  navigate({ search: (prev) => ({ ...prev, q: e.target.value }), replace: true })
                }
              />
            </div>

            <h2 className="mt-6 hidden lg:block font-display text-sm font-bold tracking-widest uppercase">
              Categories
            </h2>
            <div className="mt-3 hidden flex-wrap gap-2 lg:flex lg:flex-col lg:gap-2">
              {[{ slug: "all", name: "All products" }, ...categories].map((c) => (
                <button
                  key={c.slug}
                  onClick={() =>
                    navigate({ search: (prev) => ({ ...prev, category: c.slug }), replace: true })
                  }
                  className={cn(
                    "border px-3 py-2 text-left font-display text-sm font-semibold transition-colors",
                    category === c.slug
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground hover:border-primary hover:text-primary",
                  )}
                >
                  {c.name}
                </button>
              ))}
            </div>

            <h2 className="mt-6 hidden lg:block font-display text-sm font-bold tracking-widest uppercase">
              Brands
            </h2>
            <select
              aria-label="Filter by brand"
              value={brand}
              onChange={(e) =>
                navigate({
                  search: (prev) => ({ ...prev, brand: e.target.value }),
                  replace: true,
                })
              }
              className="mt-3 hidden w-full rounded-md border border-input bg-card px-3 py-2 text-sm font-display font-semibold lg:block"
            >
              <option value="all">All brands</option>
              {browseBrands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </aside>

          {/* Grid */}
          <div>
            <div className="flex gap-2 lg:hidden">
              <Button
                type="button"
                variant="outline"
                className="min-h-11 flex-1 font-display font-bold"
                onClick={() => setFilterOpen(true)}
              >
                <SlidersHorizontal className="size-4" aria-hidden />
                Filter
              </Button>
              <Button
                type="button"
                variant="outline"
                className="min-h-11 flex-1 font-display font-bold"
                onClick={() => setSortOpen(true)}
              >
                <ArrowDownUp className="size-4" aria-hidden />
                Sort
              </Button>
            </div>

            <MobileProductFilters
              open={filterOpen}
              onOpenChange={setFilterOpen}
              category={category}
              brand={brand}
              browseBrands={browseBrands}
              onCategory={(slug) =>
                navigate({ search: (prev) => ({ ...prev, category: slug }), replace: true })
              }
              onBrand={(value) =>
                navigate({ search: (prev) => ({ ...prev, brand: value }), replace: true })
              }
              onClear={() =>
                navigate({
                  search: (prev) => ({ ...prev, category: "all", brand: "all" }),
                  replace: true,
                })
              }
            />

            <Drawer open={sortOpen} onOpenChange={setSortOpen}>
              <DrawerContent className="pb-[max(1rem,env(safe-area-inset-bottom))]">
                <DrawerTitle className="px-4 pt-2 font-display text-lg font-extrabold">Sort by</DrawerTitle>
                <div className="flex flex-col gap-1 p-4 pt-2">
                  {sortOptions.map((opt) => (
                    <DrawerClose asChild key={opt.key}>
                      <button
                        type="button"
                        className={cn(
                          "min-h-12 rounded-md px-3 text-left font-display text-sm font-semibold transition-colors",
                          sort === opt.key
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-surface",
                        )}
                        onClick={() => setSort(opt.key)}
                      >
                        {opt.label}
                      </button>
                    </DrawerClose>
                  ))}
                </div>
              </DrawerContent>
            </Drawer>

            <p className="mt-3 text-sm text-muted-foreground lg:mt-0">
              Showing {filtered.length} product{filtered.length === 1 ? "" : "s"}
              {activeCategory ? ` in ${activeCategory.name}` : ""}
              {activeBrand ? ` · ${activeBrand}` : ""}
              {q.trim() ? ` for “${q.trim()}”` : ""}.
            </p>

            {filtered.length === 0 ? (
              <div className="mt-6 border border-dashed border-border bg-surface p-10 text-center">
                <p className="font-display text-lg font-bold">No products listed yet</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  We stock more than what is listed online. Call 041-222-3298 or message our
                  WhatsApp team and we will confirm availability.
                </p>
              </div>
            ) : (
              <>
                <div className="mt-4 grid grid-cols-2 gap-2.5 min-[375px]:gap-3 sm:mt-6 sm:gap-6 xl:grid-cols-3">
                  {paged.map((p, i) => (
                    <Reveal key={p.slug} delay={(i % 3) * 80} className="h-full">
                      <ProductCard product={p} />
                    </Reveal>
                  ))}
                </div>
                {pageCount > 1 && (
                  <nav
                    aria-label="Product pages"
                    className="mt-8 flex items-center justify-center gap-3"
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      disabled={safePage <= 1}
                      aria-label="Previous page"
                      onClick={() => {
                        setPage(safePage - 1);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      <ChevronLeft className="size-4" />
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      Page {safePage} of {pageCount}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      disabled={safePage >= pageCount}
                      aria-label="Next page"
                      onClick={() => {
                        setPage(safePage + 1);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      <ChevronRight className="size-4" />
                    </Button>
                  </nav>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
