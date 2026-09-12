import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Search, ShoppingCart } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/cart";
import { categories, products } from "@/lib/site";
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
];

export const Route = createFileRoute("/products/")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Products | Hardware Catalogue — Ceylon Platinum Trading, Matara" },
      {
        name: "description",
        content:
          "Browse the Ceylon Platinum Trading hardware catalogue: power tools, hand tools, paints, door hardware, machinery and pumps. Order via WhatsApp from Matara, Sri Lanka.",
      },
      { property: "og:title", content: "Hardware Product Catalogue | Ceylon Platinum Trading" },
      {
        property: "og:description",
        content:
          "Search and filter our Matara hardware catalogue by category, add items to your cart and send the order to our WhatsApp team.",
      },
      { property: "og:url", content: "/products" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: Products,
});

function Products() {
  const search = Route.useSearch();
  const q = search.q ?? "";
  const category = search.category ?? "all";
  const brand = search.brand ?? "all";
  const navigate = Route.useNavigate();
  const { add, setOpen } = useCart();

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return products.filter((p) => {
      const inCat = category === "all" || p.category === category;
      const inBrand = brand === "all" || p.brand === brand;
      const inSearch =
        !needle || `${p.name} ${p.brand} ${p.summary}`.toLowerCase().includes(needle);
      return inCat && inBrand && inSearch;
    });
  }, [q, category, brand]);

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
            <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Catalogue</h1>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          {/* Filters */}
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <label htmlFor="product-search" className="sr-only">
              Search products
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="product-search"
                value={q}
                placeholder="Search products…"
                className="pl-9"
                onChange={(e) =>
                  navigate({ search: (prev) => ({ ...prev, q: e.target.value }), replace: true })
                }
              />
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-2 lg:hidden">
              <div>
                <label
                  htmlFor="mobile-category"
                  className="mb-1 block text-sm font-semibold text-muted-foreground"
                >
                  Category
                </label>
                <select
                  id="mobile-category"
                  value={category}
                  onChange={(e) =>
                    navigate({
                      search: (prev) => ({ ...prev, category: e.target.value }),
                      replace: true,
                    })
                  }
                  className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm font-display font-semibold"
                >
                  <option value="all">All products</option>
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="mobile-brand"
                  className="mb-1 block text-sm font-semibold text-muted-foreground"
                >
                  Brand
                </label>
                <select
                  id="mobile-brand"
                  value={brand}
                  onChange={(e) =>
                    navigate({
                      search: (prev) => ({ ...prev, brand: e.target.value }),
                      replace: true,
                    })
                  }
                  className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm font-display font-semibold"
                >
                  <option value="all">All brands</option>
                  {browseBrands.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
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
            <p className="text-sm text-muted-foreground">
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
                <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {paged.map((p, i) => (
                    <Reveal
                      key={p.slug}
                      delay={(i % 3) * 80}
                      className="flex h-full flex-col border border-border bg-card shadow-card transition-shadow hover:shadow-lift"
                    >
                      <Link
                        to="/products/$slug"
                        params={{ slug: p.slug }}
                        className="group block overflow-hidden p-5"
                      >
                        <img
                          src={p.image}
                          alt={`${p.name} — available from Ceylon Platinum Trading, Matara`}
                          loading="lazy"
                          className="aspect-square w-full object-contain transition-transform duration-700 group-hover:scale-[1.05]"
                        />
                      </Link>
                      <div className="flex min-w-0 flex-1 flex-col px-5 pb-5">
                        <p className="text-xs font-semibold tracking-wide text-primary uppercase">
                          {p.brand}
                        </p>
                        <h3 className="mt-1 break-words font-display text-lg leading-snug font-extrabold">
                          <Link to="/products/$slug" params={{ slug: p.slug }}>
                            {p.name}
                          </Link>
                        </h3>
                        <p className="mt-2 flex-1 break-words text-sm text-muted-foreground">
                          {p.summary}
                        </p>
                        <p className="mt-3 text-sm font-semibold">
                          {p.price ? `Rs. ${p.price.toLocaleString("en-LK")}` : "Price on request"}
                        </p>
                        <div className="mt-4">
                          <Button
                            className="w-full"
                            onClick={() => {
                              add(p.slug);
                              setOpen(true);
                            }}
                          >
                            <ShoppingCart className="size-4" /> Add to cart
                          </Button>
                        </div>
                      </div>
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
