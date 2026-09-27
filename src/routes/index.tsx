import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  MapPin,
  MessageCircle,
  Package,
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
import { absoluteUrl, socialImageMeta } from "@/lib/seo";
import { useCart } from "@/lib/cart";
import {
  brands,
  business,
  categories,
  heroSlides,
  photos,
  products,
  type Product,
} from "@/lib/site";

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

const trustPoints = [
  "Free Islandwide Delivery",
  "Genuine Products",
  "Warranty Support",
  "Matara Showroom",
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
    text: "Our team confirms your order and arranges delivery.",
    icon: Truck,
  },
] as const;

/** Homepage category grid order (matches merchandising priority). */
const categoryDisplayOrder = [
  "power-tools",
  "hand-tools",
  "machinery-compressors",
  "motors-pumps",
  "paints-coatings",
  "door-window-hardware",
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
          Free islandwide delivery
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

  const heroImage = heroSlides[0]?.image ?? photos.powerTools;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-charcoal text-charcoal-foreground">
        <div className="absolute inset-0">
          <SmartImage
            src={heroImage}
            alt="Power tools and hardware from Ceylon Platinum Trading"
            sizes="100vw"
            fetchPriority="high"
            className="h-full w-full object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/95 to-charcoal/70" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-20">
          <Reveal>
            <p className="eyebrow text-charcoal-foreground/80">Ceylon Platinum Trading · Matara</p>
            <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Hardware &amp; Tools for Every Project
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-charcoal-foreground/90 sm:text-lg">
              Shop power tools, hand tools, machinery, pumps and hardware from trusted brands — with{" "}
              <span className="font-semibold text-primary-foreground underline decoration-primary underline-offset-2">
                FREE islandwide delivery
              </span>{" "}
              across Sri Lanka.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/products">Shop Products</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-charcoal-foreground/30 bg-charcoal-foreground/5 text-charcoal-foreground hover:bg-charcoal-foreground/15 hover:text-charcoal-foreground"
              >
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="size-4" />
                  Order via WhatsApp
                </a>
              </Button>
            </div>
            <ul className="mt-8 grid gap-2 sm:grid-cols-2">
              {trustPoints.map((point) => (
                <li key={point} className="flex items-center gap-2 text-sm sm:text-base">
                  <Check className="size-4 shrink-0 text-primary" aria-hidden />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100} className="hidden lg:block">
            <div className="overflow-hidden border border-charcoal-foreground/15 bg-card/10 shadow-lift backdrop-blur-sm">
              <SmartImage
                src={photos.powerTools}
                alt="Power tools available at Ceylon Platinum Trading showroom"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Shop by category */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Shop by category</p>
          <h2 className="rule-red mt-4 font-display text-3xl font-extrabold sm:text-4xl">
            Find what you need, fast
          </h2>
          <p className="mt-4 text-muted-foreground">
            Browse our full catalogue by category — every product includes free islandwide delivery.
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
                  <h3 className="font-display text-lg font-extrabold sm:text-xl">{c.name}</h3>
                  <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted-foreground">{c.blurb}</p>
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
      <section className="border-y border-border bg-surface py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="eyebrow">Featured products</p>
              <h2 className="rule-red mt-4 font-display text-3xl font-extrabold sm:text-4xl">
                Popular picks from our catalogue
              </h2>
              <p className="mt-4 text-muted-foreground">
                A selection of tools and equipment our customers order most — add to cart and checkout
                on WhatsApp.
              </p>
            </div>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 xl:grid-cols-5">
            {featuredProducts.map((p) => (
              <FeaturedProductCard key={p.slug} product={p} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild size="lg">
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why shop with CPT */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
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
      <section className="border-t border-border bg-charcoal py-10 text-charcoal-foreground sm:py-12">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Trusted brands</p>
            <h2 className="mt-4 font-display text-2xl font-extrabold sm:text-3xl">
              Brands you already know and trust
            </h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
            {brands.map((b) => (
              <Link
                key={b.name}
                to="/products"
                search={{ q: "", category: "all", brand: b.name }}
                aria-label={`Shop ${b.name} products`}
                title={`Shop ${b.name} products`}
                className="flex aspect-[5/3] items-center justify-center rounded-lg border border-charcoal-foreground/15 bg-card px-3 py-2 shadow-card transition hover:border-primary/50 hover:shadow-lift focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
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

      {/* How to order online */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Simple ordering</p>
          <h2 className="rule-red mt-4 font-display text-3xl font-extrabold sm:text-4xl">
            How to Order Online
          </h2>
          <p className="mt-4 font-semibold text-primary">
            FREE islandwide delivery on all products.
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
          <Button asChild size="lg">
            <Link to="/products">Start Shopping</Link>
          </Button>
        </div>
      </section>

      {/* WhatsApp help CTA */}
      <section className="bg-surface py-12 sm:py-14">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
              Need Help Choosing the Right Product?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Our team can help you choose the right tool, machine or hardware for your requirements.
            </p>
            <Button asChild size="lg" className="mt-8">
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-4" />
                Chat with CPT on WhatsApp
              </a>
            </Button>
            <p className="mt-4 flex flex-wrap items-center justify-center gap-x-2 text-sm text-muted-foreground">
              <MapPin className="size-4 shrink-0" aria-hidden />
              {business.addressFull}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary py-12 text-primary-foreground sm:py-14">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
              Ready to Find What You Need?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl opacity-90">
              Browse our products and order directly through CPT.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" variant="secondary">
                <Link to="/products">Shop Products</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
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
