import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { brands, business, categories, faqs, heroSlides, photos, products } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Ceylon Platinum Trading (PVT) Ltd",
      },
      {
        name: "description",
        content:
          "Ceylon Platinum Trading (PVT) Ltd supplies power tools, hand tools, paints, door hardware, machinery and sealants from Matara, Sri Lanka. Complete hardware solutions under one roof.",
      },
      {
        property: "og:title",
        content: "Ceylon Platinum Trading (PVT) Ltd | Hardware Distributors in Matara",
      },
      {
        property: "og:description",
        content:
          "Complete hardware solutions under one roof. Bosch, Tolsen, Humhon, Asian Paints and more, distributed island-wide from Matara, Sri Lanka.",
      },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (i: number) => setActive(((i % heroSlides.length) + heroSlides.length) % heroSlides.length),
    [],
  );
  const next = useCallback(() => setActive((a) => (a + 1) % heroSlides.length), []);
  const prev = useCallback(
    () => setActive((a) => (a - 1 + heroSlides.length) % heroSlides.length),
    [],
  );

  // Auto-advance every 5s. Because `active` is in the dependency array, the
  // interval restarts whenever the user changes slides manually (dots/arrows),
  // which effectively resets the 5-second timer. Cleaned up on unmount.
  useEffect(() => {
    if (paused) return undefined;
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % heroSlides.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [paused, active]);

  return (
    <>
      {/* Hero */}
      <section
        className="relative isolate overflow-hidden bg-charcoal text-charcoal-foreground"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Carousel slides — each links to its (brand-filtered) catalogue page */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, i) => (
            <Link
              key={slide.image}
              to="/products"
              search={{ q: "", category: "all", brand: slide.brand ?? "all" }}
              aria-label={slide.label}
              title={slide.label}
              className={cn(
                "absolute inset-0 block transition-opacity duration-700 ease-out sm:duration-[800ms]",
                i === active ? "opacity-100" : "pointer-events-none opacity-0",
              )}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                fetchPriority={i === 0 ? "high" : undefined}
                loading={i === 0 ? undefined : "lazy"}
                className="size-full object-cover object-center max-sm:object-top"
              />
            </Link>
          ))}
        </div>

        {/* Gradient overlay for text legibility on top of the slides */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/95 to-charcoal/45" />

        {/* Left / Right arrows */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          className="absolute top-1/2 left-3 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-charcoal-muted/40 bg-charcoal/60 p-2 text-charcoal-foreground/80 transition hover:bg-charcoal/80 hover:text-charcoal-foreground sm:flex"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="absolute top-1/2 right-3 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-charcoal-muted/40 bg-charcoal/60 p-2 text-charcoal-foreground/80 transition hover:bg-charcoal/80 hover:text-charcoal-foreground sm:flex"
        >
          <ChevronRight className="size-5" />
        </button>

        {/* Dot / pagination indicators */}
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 sm:bottom-5">
          {heroSlides.map((slide, i) => (
            <button
              key={slide.image}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === active}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === active
                  ? "w-7 bg-primary-foreground"
                  : "w-2 bg-primary-foreground/40 hover:bg-primary-foreground/75",
              )}
            />
          ))}
        </div>

        {/* Hero content — container clicks fall through to the slide link;
            only the buttons re-enable pointer events (full-width touch targets on mobile). */}
        <div className="relative pointer-events-none mx-auto max-w-7xl px-4 pt-16 pb-24 sm:py-28 sm:pb-32 lg:py-36">
          <Reveal className="max-w-3xl">
            <p className="inline-flex items-center gap-2 bg-primary px-3 py-1.5 font-display text-xs font-bold tracking-[0.18em] text-primary-foreground uppercase">
              <MapPin className="size-3.5" /> Matara, Sri Lanka
            </p>
            <h1 className="mt-6 font-display text-4xl leading-[1.05] font-extrabold sm:text-5xl lg:text-6xl">
              Complete Hardware Solutions
              <span className="block text-primary-foreground/70">Under One Roof</span>
            </h1>
            <div className="pointer-events-auto mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link to="/products">
                  Browse the catalogue <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-charcoal-muted/40 bg-transparent text-charcoal-foreground hover:bg-charcoal-foreground/10 hover:text-charcoal-foreground"
              >
                <a href={`https://wa.me/${business.whatsapp}`}>
                  <MessageCircle className="size-4" /> WhatsApp us
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stat strip */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-4 py-8 sm:grid-cols-4">
          {[
            { k: "15+", v: "Brands distributed" },
            { k: "10+", v: "Product categories" },
            { k: "Island-wide", v: "Delivery from Matara" },
            { k: "Mon–Sat", v: "9:00 AM – 5:00 PM" },
          ].map((s, i) => (
            <Reveal key={s.v} delay={i * 70} className="px-2 text-center sm:text-left">
              <p className="font-display text-2xl font-extrabold text-primary sm:text-3xl">{s.k}</p>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.v}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-surface py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="eyebrow">In the catalogue</p>
              <h2 className="rule-red mt-4 font-display text-3xl font-extrabold sm:text-4xl">
                Featured products
              </h2>
            </div>
            <Button asChild variant="outline">
              <Link to="/products">View all products</Link>
            </Button>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 90}>
                <Link
                  to="/products/$slug"
                  params={{ slug: p.slug }}
                  className="group flex h-full flex-col border border-border bg-card p-5 shadow-card transition-shadow hover:shadow-lift"
                >
                  <img
                    src={p.image}
                    alt={`${p.name} — sold by Ceylon Platinum Trading, Matara`}
                    loading="lazy"
                    className="aspect-square w-full object-contain transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <p className="mt-4 text-xs font-semibold tracking-wide text-primary uppercase">
                    {p.brand}
                  </p>
                  <h3 className="mt-1 font-display text-lg font-extrabold">{p.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.summary}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="bg-charcoal py-16 text-charcoal-foreground sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Brands we carry</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">
              Distributed brands you already trust
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-px bg-charcoal-muted/20 sm:grid-cols-3 lg:grid-cols-6">
            {brands.map((b, i) => (
              <Reveal
                key={b.name}
                delay={(i % 6) * 60}
                className="flex min-h-28 items-center justify-center bg-white px-6 py-6"
              >
                <img
                  src={b.logo}
                  alt={`${b.name} logo`}
                  loading="lazy"
                  className="max-h-16 max-w-full object-contain"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow">Who we are</p>
            <h2 className="rule-red mt-4 font-display text-3xl font-extrabold sm:text-4xl">
              A Matara hardware distributor built for the trade
            </h2>
            <p className="mt-5 text-muted-foreground">
              Ceylon Platinum Trading (PVT) Ltd is a Matara-based hardware and construction products
              business dedicated to providing high-quality tools, materials and equipment to
              homeowners, contractors and builders across Sri Lanka's Southern Province.
            </p>
            <p className="mt-4 text-muted-foreground">
              Our Old Tangalle Road showroom was designed to reflect that ambition: a professional
              retail space stocking hundreds of products across six major categories, backed by a
              team that understands what construction actually demands.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild variant="outline">
                <Link to="/about">Read our story</Link>
              </Button>
              <Button asChild variant="ghost">
                <a href={`tel:${business.phoneIntl}`}>
                  <Phone className="size-4" /> {business.phone}
                </a>
              </Button>
            </div>
          </Reveal>
          <Reveal delay={120} className="relative">
            <img
              src={photos.handTools}
              alt="Hand tools and spanners displayed on the wall of the Ceylon Platinum Trading showroom in Matara"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover shadow-lift"
            />
            <div className="absolute -bottom-5 -left-5 hidden bg-primary px-6 py-5 text-primary-foreground sm:block">
              <p className="font-display text-lg font-extrabold">Est. 2026</p>
              <p className="text-xs opacity-80">Kotuwegoda, Matara</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:py-24">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">What we stock</p>
          <h2 className="rule-red mt-4 font-display text-3xl font-extrabold sm:text-4xl">
            Featured product categories
          </h2>
          <p className="mt-4 text-muted-foreground">
            From power tools to paints, structural hardware to sealants — six categories covering a
            complete build.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 3) * 90}>
              <Link
                to="/products"
                search={{ category: c.slug, q: "" }}
                className="group block h-full overflow-hidden border border-border bg-card shadow-card transition-shadow hover:shadow-lift"
              >
                <div className="overflow-hidden">
                  <img
                    src={c.image}
                    alt={`${c.name} available at Ceylon Platinum Trading, Matara`}
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold tracking-wide text-primary uppercase">
                    {c.brands}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-extrabold">{c.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.blurb}</p>
                  <span className="mt-4 inline-flex items-center gap-1 font-display text-sm font-bold text-primary">
                    View products <ArrowRight className="size-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[0.9fr_1.4fr]">
          <Reveal>
            <p className="eyebrow">Questions</p>
            <h2 className="rule-red mt-4 font-display text-3xl font-extrabold sm:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-muted-foreground">
              Plain answers about Ceylon Platinum Trading (PVT) Ltd — our Matara location, the
              brands we distribute, delivery and how ordering works.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left font-display font-bold">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 text-primary-foreground sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <Reveal>
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
              Ready to place an order?
            </h2>
            <p className="mt-4 max-w-2xl opacity-90">
              Add products to your cart, enter your delivery location and send the order straight to
              our WhatsApp Business line. Our Matara team confirms stock, pricing and delivery.
            </p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm opacity-90">
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-4" /> {business.addressFull}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="size-4" /> {business.hours}
              </span>
            </div>
          </Reveal>
          <Reveal delay={120} className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Button asChild size="lg" variant="secondary">
              <Link to="/products">Browse products</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <a href={`tel:${business.phoneIntl}`}>Call {business.phone}</a>
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
