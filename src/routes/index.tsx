import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  MessageCircle,
  Package,
  Phone,
  Search,
  ShieldCheck,
  ShoppingCart,
  Store,
  Truck,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SmartImage } from "@/components/SmartImage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { absoluteUrl, socialImageMeta } from "@/lib/seo";
import { useCart } from "@/lib/cart";
import {
  brands,
  business,
  categories,
  faqs,
  photos,
  products,
  type Product,
} from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Ceylon Platinum Trading (PVT) Ltd | Hardware & Tools — Free Islandwide Delivery",
      },
      {
        name: "description",
        content:
          "Shop power tools, hand tools, machinery, pumps and hardware from trusted brands at Ceylon Platinum Trading, Matara. FREE islandwide delivery across Sri Lanka. Order online via WhatsApp.",
      },
      {
        property: "og:title",
        content: "Ceylon Platinum Trading | Hardware & Tools — Free Islandwide Delivery",
      },
      {
        property: "og:description",
        content:
          "Power tools, hand tools, paints, pumps and hardware from Bosch, Humhon, Giant, ZRM and more. FREE islandwide delivery in Sri Lanka. Shop online or visit our Matara showroom.",
      },
      { property: "og:url", content: absoluteUrl("/") },
      { property: "og:type", content: "website" },
      ...socialImageMeta("/hero01.png", "Ceylon Platinum Trading promotion banner"),
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/") }],
  }),
  component: Home,
});

const whatsappHref = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(
  "Hello, I'd like help with an order from Ceylon Platinum Trading.",
)}`;

const whatsappProjectHref = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(
  "Hello, I'm buying tools or hardware for a project/business and would like to speak with the CPT team.",
)}`;

const heroTrustPoints = [
  "Free Islandwide Delivery",
  "Genuine Products",
  "Warranty Support",
  "Matara Showroom",
] as const;

const trustStrip = [
  {
    icon: Truck,
    title: "FREE ISLANDWIDE DELIVERY",
    text: "All CPT products",
    highlight: true,
  },
  {
    icon: ShieldCheck,
    title: "GENUINE PRODUCTS",
    text: "Trusted brands",
  },
  {
    icon: Package,
    title: "WARRANTY SUPPORT",
    text: "After-sales assistance",
  },
  {
    icon: Store,
    title: "MATARA SHOWROOM",
    text: "Visit us in person",
  },
] as const;

const whyShop = [
  {
    icon: Truck,
    title: "Free Islandwide Delivery",
    text: "Get your CPT order delivered anywhere in Sri Lanka at no additional delivery charge.",
  },
  {
    icon: ShieldCheck,
    title: "Genuine Products",
    text: "Shop products from trusted brands.",
  },
  {
    icon: Package,
    title: "Warranty Support",
    text: "Get assistance with applicable product warranties and after-sales support.",
  },
  {
    icon: Store,
    title: "Matara Showroom",
    text: "Visit our physical showroom or contact our team for assistance.",
  },
] as const;

const orderSteps = [
  {
    step: "1",
    title: "Browse Products",
    text: "Find the products you need.",
    icon: Search,
  },
  {
    step: "2",
    title: "Add to Cart",
    text: "Add your selected products to your cart.",
    icon: ShoppingCart,
  },
  {
    step: "3",
    title: "Send Order via WhatsApp",
    text: "Submit your cart directly to CPT through WhatsApp.",
    icon: MessageCircle,
  },
  {
    step: "4",
    title: "We Confirm & Deliver",
    text: "Our team confirms your order and arranges FREE islandwide delivery.",
    icon: Truck,
  },
] as const;

const categoryDisplayOrder = [
  "power-tools",
  "hand-tools",
  "machinery-compressors",
  "motors-pumps",
  "paints-coatings",
  "door-window-hardware",
];

const categoryShortBlurb: Record<string, string> = {
  "power-tools": "Drills, grinders, saws & more",
  "hand-tools": "Spanners, pliers, hammers & more",
  "machinery-compressors": "Compressors, generators & machinery",
  "motors-pumps": "Water pumps, motors & pressure units",
  "paints-coatings": "Paints, coatings & mixing",
  "door-window-hardware": "Handles, hinges, locks & more",
};

const heroProductSlugs = [
  "bosch-percussion-drill-600w-gsb600",
  "humhon-rotary-hammer-800w-rh26",
  "giant-air-compressor-24l-24l",
  "zrm-water-pump-0-5hp-qb60",
  "bosch-angle-grinder-4-5-710w-gws700-115",
];

const featuredSlugs = [
  "bosch-percussion-drill-600w-gsb600",
  "bosch-angle-grinder-4-5-710w-gws700-115",
  "bosch-cordless-screwdriver-12v-gsr120",
  "humhon-rotary-hammer-800w-rh26",
  "humhon-jigsaw-500w-js6003",
  "giant-air-compressor-24l-24l",
  "giant-cleaning-pressure-machine-ccm280",
  "zrm-water-pump-0-5hp-qb60",
  "zrm-submersible-pump-1hp-qdx750hf",
  "wokin-heavy-duty-tile-cutter-cutt-wokin-00672",
];

function HeroProductCollage({ items }: { items: Product[] }) {
  if (items.length === 0) return null;

  return (
    <div className="relative grid grid-cols-2 gap-3 bg-surface p-4 sm:gap-4 sm:p-6">
      {items.slice(0, 4).map((p, i) => (
        <Link
          key={p.slug}
          to="/products/$slug"
          params={{ slug: p.slug }}
          className={cn(
            "group flex items-center justify-center border border-border bg-card p-3 shadow-card transition-shadow hover:shadow-lift sm:p-4",
            i === 0 && "col-span-2 sm:row-span-1",
          )}
        >
          <SmartImage
            src={p.image}
            alt={`${p.name} — ${p.brand}, available from Ceylon Platinum Trading`}
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : undefined}
            className={cn(
              "w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]",
              i === 0 ? "aspect-[2/1] max-h-40" : "aspect-square max-h-32",
            )}
          />
        </Link>
      ))}
      {items[4] ? (
        <Link
          to="/products/$slug"
          params={{ slug: items[4].slug }}
          className="col-span-2 group flex items-center justify-center border border-border bg-card p-3 shadow-card transition-shadow hover:shadow-lift sm:col-span-2 sm:p-4"
        >
          <SmartImage
            src={items[4].image}
            alt={`${items[4].name} — ${items[4].brand}, available from Ceylon Platinum Trading`}
            loading="lazy"
            className="aspect-[3/1] max-h-28 w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </Link>
      ) : null}
    </div>
  );
}

function FeaturedProductCard({ product }: { product: Product }) {
  const { add, setOpen } = useCart();

  return (
    <article className="flex h-full flex-col border border-border bg-card shadow-card transition-shadow hover:shadow-lift">
      <Link
        to="/products/$slug"
        params={{ slug: product.slug }}
        className="group block overflow-hidden p-4 sm:p-5"
      >
        <SmartImage
          src={product.image}
          alt={`${product.name} — sold by Ceylon Platinum Trading, Matara`}
          loading="lazy"
          className="aspect-square w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col px-4 pb-4 sm:px-5 sm:pb-5">
        <p className="text-xs font-semibold tracking-wide text-primary uppercase">{product.brand}</p>
        <h3 className="mt-1 line-clamp-2 break-words font-display text-sm leading-snug font-extrabold sm:text-base">
          <Link to="/products/$slug" params={{ slug: product.slug }}>
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 text-sm font-semibold">
          {product.price ? `Rs. ${product.price.toLocaleString("en-LK")}` : "Price on request"}
        </p>
        <Badge variant="secondary" className="mt-2 w-fit text-[10px] sm:text-xs">
          FREE ISLANDWIDE DELIVERY
        </Badge>
        <Button
          className="mt-4 w-full"
          size="sm"
          onClick={() => {
            add(product.slug);
            setOpen(true);
          }}
        >
          <ShoppingCart className="size-4" />
          Add to cart
        </Button>
      </div>
    </article>
  );
}

function Home() {
  const sortedCategories = categoryDisplayOrder
    .map((slug) => categories.find((c) => c.slug === slug))
    .filter((c): c is (typeof categories)[number] => Boolean(c));

  const featuredProducts = featuredSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is Product => Boolean(p));

  const heroProducts = heroProductSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is Product => Boolean(p));

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:py-16 lg:grid-cols-2 lg:items-center lg:gap-14 lg:py-20">
          <Reveal className="order-1 lg:order-none">
            <p className="eyebrow">Ceylon Platinum Trading · Matara</p>
            <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              Quality Hardware &amp; Tools
              <span className="mt-1 block">for Every Project</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Shop power tools, hand tools, machinery, pumps and hardware from trusted brands — with{" "}
              <span className="font-semibold text-foreground">FREE islandwide delivery</span> across Sri
              Lanka.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="font-display font-bold tracking-wide uppercase">
                <Link to="/products">Shop Products</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-display font-bold tracking-wide uppercase">
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="size-4" />
                  Order via WhatsApp
                </a>
              </Button>
            </div>
            <ul className="mt-8 grid gap-2 sm:grid-cols-2">
              {heroTrustPoints.map((point) => (
                <li key={point} className="flex items-center gap-2 text-sm text-foreground sm:text-base">
                  <Check className="size-4 shrink-0 text-primary" aria-hidden />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={80} className="order-2 lg:order-none">
            <HeroProductCollage items={heroProducts} />
          </Reveal>
        </div>
      </section>

      {/* Trust / benefits strip */}
      <section className="border-b border-border bg-charcoal text-charcoal-foreground" aria-label="Why customers choose CPT">
        <div className="mx-auto grid max-w-7xl gap-px bg-charcoal-muted/20 sm:grid-cols-2 lg:grid-cols-4">
          {trustStrip.map((item) => (
            <div
              key={item.title}
              className={cn(
                "flex flex-col gap-2 bg-charcoal px-5 py-6 sm:px-6 sm:py-8",
                item.highlight && "lg:border-b-2 lg:border-b-primary",
              )}
            >
              <item.icon className="size-6 text-primary" aria-hidden />
              <p className="font-display text-sm font-extrabold tracking-wide sm:text-base">{item.title}</p>
              <p className="text-sm text-charcoal-foreground/80">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Shop by category */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:py-16">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Catalogue</p>
          <h2 className="rule-red mt-4 font-display text-3xl font-extrabold uppercase sm:text-4xl">
            Shop by Category
          </h2>
          <p className="mt-4 text-muted-foreground">
            Browse hardware and tools by category — every product includes free islandwide delivery.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sortedCategories.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 3) * 70}>
              <Link
                to="/products"
                search={{ category: c.slug, q: "", brand: "all" }}
                className="group flex h-full flex-col overflow-hidden border border-border bg-card shadow-card transition-shadow hover:shadow-lift"
              >
                <div className="overflow-hidden">
                  <SmartImage
                    src={c.image}
                    alt={`${c.name} available at Ceylon Platinum Trading, Matara`}
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg font-extrabold uppercase tracking-wide sm:text-xl">
                    {c.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">
                    {categoryShortBlurb[c.slug] ?? c.blurb}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 font-display text-sm font-bold text-primary">
                    View category <ArrowRight className="size-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="border-y border-border bg-surface py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Highlights</p>
            <h2 className="rule-red mt-4 font-display text-3xl font-extrabold uppercase sm:text-4xl">
              Featured Products
            </h2>
            <p className="mt-4 text-muted-foreground">
              A curated selection from our catalogue — add to cart and send your order on WhatsApp.
            </p>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 xl:grid-cols-5">
            {featuredProducts.map((p) => (
              <FeaturedProductCard key={p.slug} product={p} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild size="lg" className="font-display font-bold tracking-wide uppercase">
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trusted brands */}
      <section className="border-b border-border bg-background py-12 sm:py-14">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Partners</p>
            <h2 className="rule-red mt-4 font-display text-2xl font-extrabold uppercase sm:text-3xl">
              Trusted Brands
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Recognized hardware and tool brands available from Ceylon Platinum Trading.
            </p>
          </Reveal>
          <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
            {brands.map((b) => (
              <Link
                key={b.name}
                to="/products"
                search={{ q: "", category: "all", brand: b.name }}
                aria-label={`Shop ${b.name} products`}
                title={`Shop ${b.name} products`}
                className="flex aspect-[5/3] items-center justify-center border border-border bg-card px-3 py-2 shadow-card transition hover:border-primary/50 hover:shadow-lift focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                <SmartImage
                  src={b.logo}
                  alt={`${b.name} logo`}
                  loading="lazy"
                  className="max-h-10 max-w-full object-contain sm:max-h-12"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why shop with CPT */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:py-16">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Why shop with us</p>
          <h2 className="rule-red mt-4 font-display text-3xl font-extrabold sm:text-4xl">
            Why Shop With Ceylon Platinum Trading?
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyShop.map((item, i) => (
            <Reveal key={item.title} delay={i * 60} className="border border-border bg-card p-6 shadow-card">
              <div className="flex size-11 items-center justify-center bg-primary/10 text-primary">
                <item.icon className="size-5" aria-hidden />
              </div>
              <h3 className="mt-4 font-display text-lg font-extrabold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Showroom / company trust */}
      <section className="border-y border-border bg-surface py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow">Visit us</p>
            <h2 className="rule-red mt-4 font-display text-3xl font-extrabold uppercase sm:text-4xl">
              Real Store. Real Products. Real Support.
            </h2>
            <p className="mt-5 text-muted-foreground">
              Ceylon Platinum Trading is a hardware and power-tools business based in Matara, serving
              homeowners, contractors, builders and businesses.
            </p>
            <p className="mt-4 text-muted-foreground">
              Prefer to visit us in person? Our Matara showroom is available for customers who want to see
              and discuss products before purchasing.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild variant="default" className="font-display font-bold tracking-wide uppercase">
                <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer">
                  Get Directions
                </a>
              </Button>
              <Button asChild variant="outline" className="font-display font-bold tracking-wide uppercase">
                <a href={`tel:${business.phoneIntl}`}>
                  <Phone className="size-4" />
                  Contact CPT
                </a>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{business.addressFull}</p>
          </Reveal>
          <Reveal delay={100}>
            <SmartImage
              src={photos.showroom}
              alt="Hand tools and hardware on display at the Ceylon Platinum Trading showroom in Matara"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover shadow-lift"
            />
          </Reveal>
        </div>
      </section>

      {/* How to order online */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:py-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Simple ordering</p>
          <h2 className="rule-red mt-4 font-display text-3xl font-extrabold uppercase sm:text-4xl">
            How to Order Online
          </h2>
          <p className="mt-4 font-display text-sm font-extrabold tracking-wide text-primary uppercase sm:text-base">
            Free islandwide delivery on all products
          </p>
        </Reveal>
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {orderSteps.map((step, i) => (
            <Reveal
              key={step.step}
              delay={i * 70}
              as="li"
              className="relative h-full list-none border border-border bg-card p-6 shadow-card"
            >
              <span className="font-display text-3xl font-extrabold text-primary/20">{step.step}</span>
              <div className="mt-3 flex size-10 items-center justify-center bg-surface text-primary">
                <step.icon className="size-5" aria-hidden />
              </div>
              <h3 className="mt-4 font-display text-lg font-extrabold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.text}</p>
            </Reveal>
          ))}
        </ol>
        <div className="mt-10 text-center">
          <Button asChild size="lg" className="font-display font-bold tracking-wide uppercase">
            <Link to="/products">Start Shopping</Link>
          </Button>
        </div>
      </section>

      {/* Contractors / business */}
      <section className="border-y border-border bg-charcoal py-12 text-charcoal-foreground sm:py-14">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <Reveal className="mx-auto max-w-2xl">
            <h2 className="font-display text-2xl font-extrabold uppercase sm:text-3xl">
              Buying for a Project or Business?
            </h2>
            <p className="mt-4 text-charcoal-foreground/90">
              Need tools, machinery or hardware for a construction project or business? Talk to the CPT
              team about your requirements.
            </p>
            <Button asChild size="lg" className="mt-8 font-display font-bold tracking-wide uppercase">
              <a href={whatsappProjectHref} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-4" />
                Talk to CPT
              </a>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.4fr]">
          <Reveal>
            <p className="eyebrow">Questions</p>
            <h2 className="rule-red mt-4 font-display text-3xl font-extrabold sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-muted-foreground">
              Plain answers about ordering, delivery and Ceylon Platinum Trading in Matara.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left font-display font-bold">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary py-14 text-primary-foreground sm:py-16">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-extrabold uppercase sm:text-4xl">
              Ready to Find What You Need?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl opacity-90">
              Browse our products and order directly through CPT with FREE islandwide delivery.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="font-display font-bold tracking-wide uppercase"
              >
                <Link to="/products">Shop Products</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/40 bg-transparent font-display font-bold tracking-wide uppercase text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  WhatsApp CPT
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
