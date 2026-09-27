import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  MessageCircle,
  Package,
  Phone,
  Search,
  ShieldCheck,
  ShoppingCart,
  Store,
  Truck,
} from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { SmartImage } from "@/components/SmartImage";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { absoluteUrl, socialImageMeta } from "@/lib/seo";
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
      ...socialImageMeta("/mainheroimage.png", "Ceylon Platinum Trading — hardware and tools with free islandwide delivery"),
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
    text: "Get your order delivered anywhere in Sri Lanka at no additional delivery charge.",
  },
  {
    icon: ShieldCheck,
    title: "Genuine Products",
    text: "Quality products from trusted brands.",
  },
  {
    icon: Package,
    title: "Warranty Support",
    text: "Warranty assistance and after-sales support.",
  },
  {
    icon: Store,
    title: "Physical Showroom",
    text: "Visit our Matara showroom or contact our team for assistance.",
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
    title: "Send Your Order on WhatsApp",
    text: "Submit your cart through WhatsApp.",
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

/**
 * The whole banner is a single link to /products: the artwork is clickable at
 * every width, so the call to action baked into the image behaves like a real
 * button without invisible hotspot overlays stacked on top of it.
 */
function MainHeroBanner() {
  return (
    <Link
      to="/products"
      aria-label="Shop all products at Ceylon Platinum Trading"
      className="group block w-full cursor-pointer focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      <h1 className="sr-only">Hardware &amp; Tools for Every Project</h1>
      <p className="sr-only">
        Shop power tools, hand tools, machinery, pumps and hardware from trusted brands — with FREE
        islandwide delivery across Sri Lanka.
      </p>

      <div className="w-full overflow-hidden bg-charcoal">
        <img
          src={photos.mainHero}
          alt="Ceylon Platinum Trading — hardware and industrial tools with free islandwide delivery in Sri Lanka"
          width={1920}
          height={768}
          className="mx-auto block h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.02] group-focus-visible:scale-[1.02]"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      {/* Phones: the banner art is too small to read, so the copy is repeated as
          real text. No buttons here — the whole hero is the link to /products. */}
      <div className="border-t border-primary/30 bg-charcoal px-4 py-6 text-charcoal-foreground sm:hidden">
        <p className="font-display text-2xl font-extrabold leading-tight tracking-tight">
          Hardware &amp; Tools for Every Project
        </p>
        <p className="mt-3 text-sm leading-relaxed text-charcoal-foreground/90">
          Shop power tools, hand tools, machinery, pumps and hardware from trusted brands — with{" "}
          <span className="font-semibold text-primary-foreground">FREE islandwide delivery</span>{" "}
          across Sri Lanka.
        </p>
        <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-foreground">
          Shop products
          <ArrowRight className="size-4" aria-hidden />
        </p>
      </div>
    </Link>
  );
}

function Home() {
  const sortedCategories = categoryDisplayOrder
    .map((slug) => categories.find((c) => c.slug === slug))
    .filter((c): c is (typeof categories)[number] => Boolean(c));

  const featuredProducts = featuredSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is Product => Boolean(p));

  return (
    <>
      {/* Hero banner (mainheroimage.png — the whole image links to /products) */}
      <section className="border-b border-border">
        <MainHeroBanner />
      </section>

      {/* Trust / benefits strip (compact on mobile — hero already mentions delivery) */}
      <section
        className="border-b border-border bg-charcoal text-charcoal-foreground"
        aria-label="Why customers choose CPT"
      >
        <div className="mx-auto grid max-w-3xl gap-px bg-charcoal-muted/20 grid-cols-2 sm:max-w-7xl sm:grid-cols-2 lg:max-w-7xl lg:grid-cols-4">
          {trustStrip.map((item) => (
            <div
              key={item.title}
              className={cn(
                "flex flex-col gap-1.5 bg-charcoal px-3 py-4 sm:gap-2 sm:px-6 sm:py-8",
                item.highlight && "lg:border-b-2 lg:border-b-primary",
              )}
            >
              <item.icon className="size-5 text-primary sm:size-6" aria-hidden />
              <p className="font-display text-xs font-extrabold tracking-wide sm:text-base">{item.title}</p>
              <p className="text-xs text-charcoal-foreground/80 sm:text-sm">{item.text}</p>
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
        <div className="mt-8 grid grid-cols-2 gap-2.5 sm:mt-10 sm:gap-5 lg:grid-cols-3">
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
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] sm:aspect-[16/10]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-2.5 sm:p-5">
                  <h3 className="font-display text-xs font-extrabold tracking-wide uppercase sm:text-xl">
                    {c.name}
                  </h3>
                  <p className="mt-1 hidden flex-1 text-sm text-muted-foreground sm:mt-2 sm:block">
                    {categoryShortBlurb[c.slug] ?? c.blurb}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-0.5 font-display text-[11px] font-bold text-primary sm:mt-4 sm:gap-1 sm:text-sm">
                    View <ArrowRight className="size-3 sm:size-4" />
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
          <div className="mt-10 grid grid-cols-2 gap-3 min-[480px]:gap-4 sm:gap-6 lg:grid-cols-4 xl:grid-cols-5">
            {featuredProducts.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild size="lg" className="font-display font-bold tracking-wide uppercase">
              <Link to="/products">View All Products</Link>
            </Button>
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

      {/* Trusted brands */}
      <section className="border-y border-border bg-background py-12 sm:py-14">
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
          <div className="mt-8 grid grid-cols-3 gap-2.5 sm:grid-cols-4 sm:gap-3 md:grid-cols-5 lg:grid-cols-6">
            {brands.map((b) => (
              <Link
                key={b.name}
                to="/products"
                search={{ q: "", category: "all", brand: b.name }}
                aria-label={`Shop ${b.name} products`}
                title={`Shop ${b.name} products`}
                className="flex aspect-[5/3] min-h-[52px] items-center justify-center border border-border bg-card px-2 py-2 shadow-card transition hover:border-primary/50 hover:shadow-lift focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:px-3"
              >
                <SmartImage
                  src={b.logo}
                  alt={`${b.name} logo`}
                  loading="lazy"
                  className="max-h-9 max-w-full object-contain sm:max-h-12"
                />
              </Link>
            ))}
          </div>
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
      <section className="border-y border-border bg-surface/60 px-4 py-8 sm:py-12">
        <div className="mx-auto max-w-3xl">
          <Reveal className="text-center">
            <p className="eyebrow text-[11px]">Simple ordering</p>
            <h2 className="rule-red mt-3 font-display text-2xl font-extrabold uppercase sm:mt-4 sm:text-3xl">
              How to Order Online
            </h2>
          </Reveal>
          <ol className="mt-6 grid grid-cols-2 gap-2 sm:mt-8 sm:grid-cols-4 sm:gap-3">
            {orderSteps.map((step, i) => (
              <Reveal
                key={step.step}
                delay={i * 50}
                as="li"
                className="relative flex list-none flex-col border border-border bg-card p-3 shadow-card sm:p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-display text-xl font-extrabold text-primary/25 sm:text-2xl">
                    {step.step}
                  </span>
                  <div className="flex size-8 shrink-0 items-center justify-center bg-surface text-primary sm:size-9">
                    <step.icon className="size-4" aria-hidden />
                  </div>
                </div>
                <h3 className="mt-2 font-display text-xs font-extrabold leading-snug sm:text-sm">{step.title}</h3>
                <p className="mt-1 text-[11px] leading-snug text-muted-foreground sm:text-xs">{step.text}</p>
              </Reveal>
            ))}
          </ol>
          <div className="mt-6 text-center sm:mt-8">
            <Button asChild size="default" className="min-h-11 font-display font-bold tracking-wide uppercase">
              <Link to="/products">Start Shopping</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* WhatsApp help CTA */}
      <section className="border-y border-border bg-brand-deep py-12 text-primary-foreground sm:py-14">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
              Need Help Choosing the Right Product?
            </h2>
            <p className="mt-4 text-sm leading-relaxed opacity-95 sm:text-base">
              Our team can help you choose the right tool, machine or hardware for your requirements.
            </p>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="mt-8 font-display font-bold tracking-wide uppercase"
            >
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-4" />
                Chat with CPT on WhatsApp
              </a>
            </Button>
          </Reveal>
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
