import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronRight, Minus, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { business, categories, products } from "@/lib/site";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Product unavailable | Ceylon Platinum Trading" }, { name: "robots", content: "noindex" }],
      };
    }
    const p = loaderData.product;
    const title = `${p.name} | Ceylon Platinum Trading, Matara`;
    const description = `${p.summary} Available from Ceylon Platinum Trading (PVT) Ltd, ${business.addressFull}. Order via WhatsApp for island-wide delivery.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: `/products/${params.slug}` },
        { property: "og:type", content: "product" },
      ],
      links: [{ rel: "canonical", href: `/products/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: p.name,
            image: p.image,
            description: p.description,
            sku: p.slug,
            category: categories.find((c) => c.slug === p.category)?.name,
            brand: { "@type": "Brand", name: p.brand },
            offers: {
              "@type": "Offer",
              availability: "https://schema.org/InStock",
              priceCurrency: "LKR",
              url: `/products/${p.slug}`,
              seller: {
                "@type": "Organization",
                name: business.name,
                telephone: business.phoneIntl,
                address: {
                  "@type": "PostalAddress",
                  streetAddress: business.street,
                  addressLocality: business.city,
                  postalCode: business.postalCode,
                  addressCountry: "LK",
                },
              },
            },
          }),
        },
      ],
    };
  },
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const { add, setOpen } = useCart();
  const [qty, setQty] = useState(1);
  const category = categories.find((c) => c.slug === product.category);
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className="border-b border-border bg-surface text-sm text-muted-foreground"
      >
        <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-1 px-4 py-3">
          <li>
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
          </li>
          <ChevronRight className="size-3.5" />
          <li>
            <Link to="/products" search={{ q: "", category: "all" }} className="hover:text-primary">
              Products
            </Link>
          </li>
          {category && (
            <>
              <ChevronRight className="size-3.5" />
              <li>
                <Link
                  to="/products"
                  search={{ q: "", category: category.slug }}
                  className="hover:text-primary"
                >
                  {category.name}
                </Link>
              </li>
            </>
          )}
          <ChevronRight className="size-3.5" />
          <li className="truncate font-semibold text-foreground">{product.name}</li>
        </ol>
      </nav>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal className="border border-border bg-surface p-6 sm:p-10">
            <img
              src={product.image}
              alt={`${product.name} — ${product.brand} product supplied by Ceylon Platinum Trading, Matara`}
              className="mx-auto aspect-square w-full max-w-lg object-contain"
              fetchPriority="high"
            />
          </Reveal>

          <Reveal delay={100}>
            <p className="text-xs font-semibold tracking-widest text-primary uppercase">
              {product.brand} · {category?.name}
            </p>
            <h1 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-4 text-muted-foreground">{product.description}</p>

            <p className="mt-6 font-display text-xl font-extrabold">Price on request</p>
            <p className="text-sm text-muted-foreground">
              Prices are confirmed by our Matara team when your WhatsApp order is received.
            </p>

            <div className="mt-6 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 sm:flex">
              <div className="flex items-center border border-border">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((n) => Math.max(1, n - 1))}
                >
                  <Minus className="size-4" />
                </Button>
                <span className="w-10 text-center font-display font-bold">{qty}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Increase quantity"
                  onClick={() => setQty((n) => n + 1)}
                >
                  <Plus className="size-4" />
                </Button>
              </div>
              <Button
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => {
                  add(product.slug, qty);
                  setOpen(true);
                }}
              >
                <ShoppingCart className="size-4" /> Add to cart
              </Button>
            </div>

            <h2 className="mt-10 font-display text-lg font-extrabold">Specifications</h2>
            <dl className="mt-3 divide-y divide-border border-y border-border">
              {product.specs.map((s) => (
                <div key={s.label} className="grid grid-cols-2 gap-4 py-3 text-sm">
                  <dt className="text-muted-foreground">{s.label}</dt>
                  <dd className="font-semibold">{s.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-xs text-muted-foreground">
              Specifications marked “To be confirmed” are pending confirmation from the
              manufacturer.
            </p>
          </Reveal>
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <Reveal>
              <h2 className="rule-red font-display text-2xl font-extrabold">
                More from our catalogue
              </h2>
            </Reveal>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 80}>
                  <Link
                    to="/products/$slug"
                    params={{ slug: p.slug }}
                    className="group flex h-full flex-col border border-border bg-card p-5 shadow-card transition-shadow hover:shadow-lift"
                  >
                    <img
                      src={p.image}
                      alt={`${p.name} at Ceylon Platinum Trading, Matara`}
                      loading="lazy"
                      className="aspect-square w-full object-contain transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                    <p className="mt-4 text-xs font-semibold tracking-wide text-primary uppercase">
                      {p.brand}
                    </p>
                    <h3 className="mt-1 font-display text-lg font-extrabold">{p.name}</h3>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
