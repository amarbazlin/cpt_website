import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, ChevronRight, MessageCircle, Minus, Plus, ShoppingCart } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { SmartImage } from "@/components/SmartImage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCart } from "@/lib/cart";
import { flashDealPrice } from "@/lib/flash-deals";
import { MOBILE_BOTTOM_INSET } from "@/lib/mobile-ui";
import {
  descriptionParagraphs,
  formatProductPrice,
  getRelatedProducts,
  productHasWarranty,
  productModelFromSpecs,
} from "@/lib/product-display";
import {
  absoluteUrl,
  breadcrumbSchema,
  jsonLdScripts,
  productCrumbs,
  productSchema,
  socialImageMeta,
} from "@/lib/seo";
import { business, categories, products } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Product unavailable | Ceylon Platinum Trading" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const p = loaderData.product;
    const title = `${p.name} | Ceylon Platinum Trading, Matara`;
    const description = `${p.summary} Available from Ceylon Platinum Trading (PVT) Ltd, ${business.addressFull}. Order via WhatsApp for island-wide delivery.`;
    const url = absoluteUrl(`/products/${params.slug}`);
    const imageAlt = `${p.name} — ${p.brand} product supplied by Ceylon Platinum Trading, Matara`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
        ...socialImageMeta(p.image, imageAlt),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: jsonLdScripts([productSchema(p), breadcrumbSchema(productCrumbs(p))]),
    };
  },
  component: ProductDetail,
});

const whatsappProductMessage = (productName: string) =>
  `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(
    `Hello, I'm interested in ${productName} from Ceylon Platinum Trading.`,
  )}`;

function BenefitList({ showWarranty }: { showWarranty: boolean }) {
  const items = [
    "Free Islandwide Delivery",
    "Genuine Products",
    ...(showWarranty ? (["Warranty Support"] as const) : []),
    "Matara Showroom",
  ] as const;

  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2 text-sm text-foreground">
          <Check className="size-4 shrink-0 text-primary" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  );
}

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const { add, setOpen } = useCart();
  const [qty, setQty] = useState(1);
  const isMobile = useIsMobile();
  const purchaseRef = useRef<HTMLDivElement>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  const category = categories.find((c) => c.slug === product.category);
  const model = productModelFromSpecs(product);
  const showWarranty = productHasWarranty(product);
  // Flash Deal products show the offer price with the old price struck through,
  // matching the price used on their product cards.
  const deal = flashDealPrice(product);
  // Single price used for both the visible figure and the Offer microdata.
  const offerPrice = deal ? deal.offerPrice : product.price;
  const related = getRelatedProducts(product, products, 6);
  const paragraphs = descriptionParagraphs(product.description);
  const whatsappHref = whatsappProductMessage(product.name);

  useEffect(() => {
    const node = purchaseRef.current;
    if (!node || !isMobile) {
      setShowStickyBar(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyBar(!entry.isIntersecting);
      },
      { root: null, threshold: 0, rootMargin: "-8px 0px 0px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isMobile, product.slug]);

  const handleAddToCart = () => {
    add(product.slug, qty);
    setOpen(true);
  };

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
          <ChevronRight className="size-3.5 shrink-0" aria-hidden />
          <li>
            <Link to="/products" search={{ q: "", category: "all" }} className="hover:text-primary">
              Products
            </Link>
          </li>
          {category && (
            <>
              <ChevronRight className="size-3.5 shrink-0" aria-hidden />
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
          <ChevronRight className="size-3.5 shrink-0" aria-hidden />
          <li className="max-w-[min(100%,14rem)] truncate font-semibold text-foreground sm:max-w-none">
            {product.name}
          </li>
        </ol>
      </nav>

      {/* Schema.org microdata wrapper (Meta's crawler + structured-data parsers).
          The `itemProp`-annotated <meta>/<link> tags below are intentionally
          rendered inline: React only hoists <meta>/<link> to <head> when they
          are NOT annotated with `itemProp`. */}
      <section
        itemScope
        itemType="https://schema.org/Product"
        className={cn(
          "mx-auto max-w-7xl px-3 py-6 sm:px-4 sm:py-12",
          isMobile && showStickyBar && "pb-[calc(var(--sticky-extra)+var(--main-bottom-pad))]",
        )}
        style={
          isMobile && showStickyBar
            ? ({
                "--sticky-extra": "4.5rem",
                "--main-bottom-pad": MOBILE_BOTTOM_INSET,
              } as CSSProperties)
            : undefined
        }
      >
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-start">
          <Reveal className="lg:sticky lg:top-28">
            <div className="overflow-hidden border border-border bg-surface p-4 sm:p-8">
              <div className="relative mx-auto aspect-square w-full max-w-xl">
                <SmartImage
                  src={product.image}
                  alt={`${product.name} — ${product.brand} product supplied by Ceylon Platinum Trading, Matara`}
                  itemProp="image"
                  className="size-full object-contain"
                  fetchPriority="high"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div ref={purchaseRef} className="min-w-0">
              <p className="text-xs font-semibold tracking-widest text-primary uppercase">{product.brand}</p>
              <h1
                itemProp="name"
                className="mt-2 font-display text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl"
              >
                {product.name}
              </h1>
              {model ? (
                <p className="mt-2 text-sm font-semibold text-muted-foreground">
                  Model: <span className="text-foreground">{model}</span>
                </p>
              ) : null}

              {/* Offer microdata. `mt-5` moved from the price <p> onto this
                  wrapper so the visible spacing is unchanged. */}
              <div className="mt-5" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                {deal ? (
                  <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-display text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
                      {formatProductPrice(offerPrice)}
                    </span>
                    <span className="text-base font-medium text-muted-foreground line-through sm:text-lg">
                      {formatProductPrice(deal.wasPrice)}
                    </span>
                  </p>
                ) : (
                  <p className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
                    {formatProductPrice(offerPrice)}
                  </p>
                )}
                <meta itemProp="priceCurrency" content="LKR" />
                {typeof offerPrice === "number" ? (
                  <meta itemProp="price" content={String(offerPrice)} />
                ) : null}
                <link itemProp="availability" href="https://schema.org/InStock" />
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
                <Badge
                  variant="secondary"
                  className="border border-primary/25 bg-accent px-2.5 py-1 text-[11px] font-bold tracking-wide text-primary uppercase sm:text-xs"
                >
                  FREE ISLANDWIDE DELIVERY
                </Badge>
                <span className="text-xs font-semibold text-muted-foreground sm:text-sm">
                  Delivered in 2-3 working days
                </span>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-stretch">
                <div className="flex shrink-0 items-center self-start border border-border bg-card">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-11"
                    aria-label="Decrease quantity"
                    onClick={() => setQty((n) => Math.max(1, n - 1))}
                  >
                    <Minus className="size-4" />
                  </Button>
                  <span className="w-12 text-center font-display text-lg font-bold">{qty}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-11"
                    aria-label="Increase quantity"
                    onClick={() => setQty((n) => n + 1)}
                  >
                    <Plus className="size-4" />
                  </Button>
                </div>
                <Button
                  size="lg"
                  className="min-h-12 flex-1 font-display text-base font-bold tracking-wide uppercase"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="size-5 shrink-0" aria-hidden />
                  Add to Cart
                </Button>
              </div>

              <div className="mt-6 rounded-md border border-border bg-surface p-4">
                <p className="text-sm font-semibold text-foreground">Need help before ordering?</p>
                <Button asChild variant="outline" className="mt-3 min-h-11 w-full font-display font-bold tracking-wide uppercase sm:w-auto">
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="size-4" />
                    WhatsApp Help
                  </a>
                </Button>
                <p className="mt-3 text-xs text-muted-foreground">
                  Orders can be confirmed through WhatsApp.
                </p>
              </div>

              <div className="mt-6 border-t border-border pt-6">
                <BenefitList showWarranty={showWarranty} />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 space-y-10 sm:mt-16 sm:space-y-14">
          <Reveal>
            <h2 className="rule-red font-display text-xl font-extrabold sm:text-2xl">Product Description</h2>
            <div
              itemProp="description"
              className="mt-4 max-w-3xl space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base"
            >
              {paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            {product.summary && product.summary !== product.description ? (
              <p className="mt-4 max-w-3xl text-sm font-medium text-foreground sm:text-base">
                {product.summary}
              </p>
            ) : null}
          </Reveal>

          {product.specs.length > 0 && (
            <Reveal delay={60}>
              <h2 className="rule-red font-display text-xl font-extrabold sm:text-2xl">Specifications</h2>
              <dl className="mt-4 max-w-2xl overflow-hidden rounded-md border border-border">
                {product.specs.map((s, i) => (
                  <div
                    key={s.label}
                    className={cn(
                      "grid grid-cols-[minmax(0,38%)_1fr] gap-3 px-4 py-3 text-sm sm:grid-cols-[minmax(0,32%)_1fr] sm:px-5",
                      i % 2 === 0 ? "bg-surface/80" : "bg-card",
                    )}
                  >
                    <dt className="font-semibold text-muted-foreground">{s.label}</dt>
                    <dd className="font-semibold text-foreground">{s.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-xs text-muted-foreground">
                Specifications marked “To be confirmed” are pending confirmation from the manufacturer.
              </p>
            </Reveal>
          )}

          <Reveal delay={80}>
              <h2 className="rule-red font-display text-xl font-extrabold sm:text-2xl">Delivery</h2>
              <div className="mt-4 max-w-2xl border border-primary/20 bg-accent/50 p-5 sm:p-6">
                <p className="font-display text-lg font-extrabold text-primary uppercase">
                  FREE ISLANDWIDE DELIVERY
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  We deliver CPT products across Sri Lanka at no additional delivery charge. Orders
                  are typically delivered within <strong className="text-foreground">2-3 working days</strong>.
                </p>
              </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="rule-red font-display text-xl font-extrabold sm:text-2xl">How to Order</h2>
            <ol className="mt-4 max-w-2xl list-decimal space-y-2 pl-5 text-sm text-muted-foreground sm:text-base">
              <li className="pl-1">Add the product to your cart.</li>
              <li className="pl-1">Submit your order through WhatsApp.</li>
              <li className="pl-1">CPT confirms your order.</li>
              <li className="pl-1">We arrange FREE islandwide delivery.</li>
            </ol>
          </Reveal>

          <Reveal delay={120}>
            <h2 className="rule-red font-display text-xl font-extrabold sm:text-2xl">Why Buy From CPT?</h2>
            <ul className="mt-4 grid max-w-2xl gap-2 sm:grid-cols-2">
              {[
                "Physical showroom in Matara",
                "Genuine products",
                ...(showWarranty ? (["Warranty support"] as const) : []),
                "Free islandwide delivery",
                "Customer assistance",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {related.length > 0 && (
          <div className="mt-14 sm:mt-16">
            <Reveal>
              <h2 className="rule-red font-display text-2xl font-extrabold">Related Products</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                More from {category?.name ?? "our catalogue"}
                {product.brand ? ` and ${product.brand}` : ""}.
              </p>
            </Reveal>
            <div className="mt-6 grid grid-cols-2 gap-3 min-[480px]:gap-4 sm:gap-6 lg:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 70} className="h-full">
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </section>

      {isMobile && showStickyBar ? (
        <div
          className="fixed inset-x-0 z-40 border-t border-border bg-background/95 px-3 py-2.5 shadow-[0_-8px_24px_-8px_rgba(0,0,0,0.15)] backdrop-blur-sm max-md:bottom-[var(--sticky-bar-bottom)] md:bottom-0 md:px-4 md:py-3 supports-[padding:max(0px)]:pb-[max(0.5rem,env(safe-area-inset-bottom))]"
          style={{ "--sticky-bar-bottom": MOBILE_BOTTOM_INSET } as CSSProperties}
          role="region"
          aria-label="Quick purchase"
        >
          <div className="mx-auto flex max-w-lg items-center gap-3">
            <p className="min-w-0 flex-1 font-display text-lg font-extrabold leading-tight">
              {formatProductPrice(product.price)}
            </p>
            <Button
              size="lg"
              className="min-h-11 shrink-0 font-display text-sm font-bold tracking-wide uppercase"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="size-4" aria-hidden />
              Add to Cart
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}
