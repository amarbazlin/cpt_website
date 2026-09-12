import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown, Search, ShoppingCart } from "lucide-react";
import { useMemo, useState } from "react";
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
const browseBrands = ["Asian Paints", "Bosch", "Giant", "Hasky", "Humhon", "Tolsen", "Wokin", "Wipro", "ZRM"];

export const Route = createFileRoute("/products/")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Products | Hardware Catalogue — Ceylon Platinum Trading, Matara" },
      {
        name: "description",
        content:
          "Browse the Ceylon Platinum Trading hardware catalogue: power tools, hand tools, paints, door hardware, machinery and sealants. Order via WhatsApp from Matara, Sri Lanka.",
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
  const [brandOpen, setBrandOpen] = useState(false);
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

  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
          <Reveal className="max-w-3xl">
            <h1 className="rule-red font-display text-4xl font-extrabold sm:text-5xl">
              Catalogue
            </h1>
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

            <h2 className="mt-6 font-display text-sm font-bold tracking-widest uppercase">
              Categories
            </h2>
            <div className="mt-3 flex flex-wrap gap-2 lg:flex-col">
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

            <h2 className="mt-6 font-display text-sm font-bold tracking-widest uppercase">
              Brands
            </h2>
            <button
              type="button"
              aria-expanded={brandOpen}
              onClick={() => setBrandOpen((v) => !v)}
              className={cn(
                "mt-3 flex w-full items-center justify-between gap-2 border px-3 py-2 text-left font-display text-sm font-semibold transition-colors",
                activeBrand
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:border-primary hover:text-primary",
              )}
            >
              {activeBrand ? `Browse by brand · ${activeBrand}` : "Browse by brand"}
              <ChevronDown
                className={cn("size-4 shrink-0 transition-transform", brandOpen && "rotate-180")}
              />
            </button>
            {brandOpen && (
              <div className="mt-2 flex max-h-80 flex-wrap gap-2 overflow-y-auto lg:flex-col lg:pr-1">
                {[
                  { slug: "all", name: "All brands" },
                  ...browseBrands.map((b) => ({ slug: b, name: b })),
                ].map((b) => (
                  <button
                    key={b.slug}
                    onClick={() =>
                      navigate({
                        search: (prev) => ({ ...prev, brand: b.slug }),
                        replace: true,
                      })
                    }
                    className={cn(
                      "border px-3 py-2 text-left font-display text-sm font-semibold transition-colors",
                      brand === b.slug
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-foreground hover:border-primary hover:text-primary",
                    )}
                  >
                    {b.name}
                  </button>
                ))}
              </div>
            )}
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
              <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((p, i) => (
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
                    <div className="flex flex-1 flex-col px-5 pb-5">
                      <p className="text-xs font-semibold tracking-wide text-primary uppercase">
                        {p.brand}
                      </p>
                      <h3 className="mt-1 font-display text-lg leading-snug font-extrabold">
                        <Link to="/products/$slug" params={{ slug: p.slug }}>
                          {p.name}
                        </Link>
                      </h3>
                      <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.summary}</p>
                      <p className="mt-3 text-sm font-semibold">
                        {p.price
                          ? `Rs. ${p.price.toLocaleString("en-LK")}`
                          : "Price on request"}
                      </p>
                      <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] gap-2">
                        <Button
                          onClick={() => {
                            add(p.slug);
                            setOpen(true);
                          }}
                        >
                          <ShoppingCart className="size-4" /> Add to cart
                        </Button>
                        <Button asChild variant="outline">
                          <Link to="/products/$slug" params={{ slug: p.slug }}>
                            Details
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
