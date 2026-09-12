import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Clock, MapPin, Phone } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  brands,
  business,
  categories,
  faqs,
  heroSlides,
  photos,
  products,
  type Product,
} from "@/lib/site";
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
          "Ceylon Platinum Trading (PVT) Ltd supplies power tools, hand tools, paints, door hardware, machinery and pumps from Matara, Sri Lanka. Complete hardware solutions under one roof.",
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

/**
 * Horizontally scrollable product row: 2 items per row on mobile, 4 on
 * desktop. The left/right arrow buttons scroll the row by one visible page.
 */
function ProductCarousel({ title, items }: { title: string; items: Product[] }) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const slide = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  };

  if (items.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <p className="eyebrow">In the catalogue</p>
          <h2 className="rule-red mt-4 font-display text-3xl font-extrabold sm:text-4xl">
            {title}
          </h2>
        </div>
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="outline"
            aria-label={`Previous ${title}`}
            onClick={() => slide(-1)}
          >
            <ArrowLeft className="size-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            aria-label={`Next ${title}`}
            onClick={() => slide(1)}
          >
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>

      <div ref={trackRef} className="no-scrollbar mt-8 flex gap-6 overflow-x-auto scroll-smooth">
        {items.map((p) => (
          <div
            key={p.slug}
            className="flex w-1/2 shrink-0 flex-col border border-border bg-card p-4 shadow-card transition-shadow hover:shadow-lift lg:w-1/4"
          >
            <Link
              to="/products/$slug"
              params={{ slug: p.slug }}
              className="group block overflow-hidden"
            >
              <img
                src={p.image}
                alt={`${p.name} — sold by Ceylon Platinum Trading, Matara`}
                loading="lazy"
                className="aspect-square w-full object-contain transition-transform duration-700 group-hover:scale-[1.05]"
              />
            </Link>
            <p className="mt-3 text-xs font-semibold tracking-wide text-primary uppercase">
              {p.brand}
            </p>
            <h3 className="mt-1 break-words font-display text-base leading-snug font-extrabold">
              <Link to="/products/$slug" params={{ slug: p.slug }}>
                {p.name}
              </Link>
            </h3>
            <p className="mt-2 text-sm font-semibold">
              {p.price ? `Rs. ${p.price.toLocaleString("en-LK")}` : "Price on request"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Home() {
  // Raw hero banners. The track prepends a clone of the last banner before the
  // first and appends a clone of the first after the last, so navigation (drag,
  // swipe or the 5s auto-advance) can wrap around seamlessly in both directions
  // without a visible jump.
  const heroImages = heroSlides.map((s) => s.image);
  const n = heroImages.length;
  const trackSlides = [heroImages[n - 1], ...heroImages, heroImages[0]];

  // Position along trackSlides. Starts at the real first slide (1).
  const [index, setIndex] = useState(1);
  const [noTransition, setNoTransition] = useState(false);

  // Drag-to-scroll: while the visitor holds and drags (finger, pen or mouse),
  // the track follows the pointer 1:1 and the auto-advance timer stays idle.
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const pointerStart = useRef<{ id: number; x: number; y: number } | null>(null);
  const draggedRef = useRef(false);

  // Auto-advance to the next hero image every 5 seconds (paused while dragging).
  useEffect(() => {
    const id = window.setInterval(() => {
      if (!pointerStart.current) setIndex((i) => Math.min(i + 1, n + 1));
    }, 5000);
    return () => window.clearInterval(id);
  }, [n]);

  // When the track reaches either cloned edge, jump silently (no transition)
  // to the matching real edge so the wrap-around is seamless.
  useEffect(() => {
    if (index === n + 1 || index === 0) {
      const t = window.setTimeout(() => {
        setNoTransition(true);
        setIndex(index === n + 1 ? 1 : n);
      }, 700);
      return () => window.clearTimeout(t);
    }
    return undefined;
  }, [index, n]);

  // Re-enable the transition right after a silent snap.
  useEffect(() => {
    if (index === 1 || index === n) {
      const raf = requestAnimationFrame(() => setNoTransition(false));
      return () => cancelAnimationFrame(raf);
    }
    return undefined;
  }, [index, n]);

  // Drag/swipe navigation — pointer events cover touch, pen and mouse alike.
  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    pointerStart.current = { id: e.pointerId, x: e.clientX, y: e.clientY };
    draggedRef.current = false;
    setDragX(0);
    setDragging(true);
    // Capture the pointer so the drag keeps tracking even if it leaves the hero.
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const start = pointerStart.current;
    if (!start || start.id !== e.pointerId) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) > 8 || Math.abs(dy) > 8) draggedRef.current = true;
    // Follow horizontal drags only, so vertical swipes still scroll the page.
    if (Math.abs(dx) > Math.abs(dy)) setDragX(dx);
  };

  const onPointerEnd = (e: ReactPointerEvent<HTMLDivElement>) => {
    const start = pointerStart.current;
    if (!start || start.id !== e.pointerId) return;
    pointerStart.current = null;
    setDragging(false);
    setDragX(0);
    // Snap to the neighbouring slide once the drag passes ~20% of the viewport.
    const width = viewportRef.current?.clientWidth ?? 0;
    const dx = e.clientX - start.x;
    const threshold = Math.max(50, width * 0.2);
    if (dx <= -threshold) setIndex((i) => Math.min(i + 1, n + 1));
    else if (dx >= threshold) setIndex((i) => Math.max(i - 1, 0));
  };

  // A drag must not open the slide link underneath — swallow that click.
  const onClickCapture = (e: ReactMouseEvent) => {
    if (!draggedRef.current) return;
    draggedRef.current = false;
    e.preventDefault();
    e.stopPropagation();
  };

  // Curated Power Tools row — the exact products requested for the homepage, in order.
  const powerToolSlugs = [
    "humhon-drywall-sander-ws180",
    "humhon-bench-grinder-5-grinder5",
    "humhon-welding-160a-mma6001",
    "humhon-demolition-hammer-1050w-dh810",
    "humhon-polisher-1400w-bcp-9227c",
    "humhon-industrial-blower-2-eb02",
    "humhon-rotary-hammer-800w-rh26",
    "humhon-router-1650w-3612br",
    "humhon-heat-gun-2000w-hg118v",
    "humhon-cut-off-2000w-cm14c",
    "humhon-jigsaw-500w-js6003",
    "humhon-angle-grinder-4-ag6016",
    "humhon-cordless-drill-12v-cd505",
    "humhon-hand-drill-800w-eid525",
    "bosch-jigsaw-450w-gst650",
    "bosch-circular-saw-1300w-gks130",
    "bosch-mixer-1400w-grw140",
    "bosch-rotary-hammer-1000w-gbh2-26",
    "bosch-percussion-drill-600w-gsb600",
    "bosch-angle-grinder-4-5-710w-gws700-115",
    "bosch-cordless-screwdriver-12v-gsr120",
  ];
  const powerTools = powerToolSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is Product => Boolean(p));

  // Water pumps / machinery rows: category products ordered lowest price first.
  const cheapest = (cat: string, limit: number) =>
    products
      .filter((p) => p.category === cat && p.price)
      .sort((a, b) => (a.price ?? 0) - (b.price ?? 0))
      .slice(0, limit);
  const waterPumps = cheapest("motors-pumps", 12);
  const machinery = cheapest("machinery-compressors", 12);

  // Brand logo strip used twice in the marquee (two copies make the -50%
  // translate loop seamless). Each logo links to that brand's products.
  const brandStrip = (ariaHidden: boolean) => (
    <div
      className="flex w-max shrink-0 items-center gap-6 pr-6"
      aria-hidden={ariaHidden || undefined}
    >
      {brands.map((b) => (
        <Link
          key={b.name}
          to="/products"
          search={{ q: "", category: "all", brand: b.name }}
          aria-label={`Shop ${b.name} products`}
          title={`Shop ${b.name} products`}
          className="flex h-20 w-40 shrink-0 items-center justify-center rounded-xl border border-charcoal-muted/15 bg-card px-4 shadow-card transition hover:border-primary/50 hover:shadow-lift focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <img
            src={b.logo}
            alt={`${b.name} logo`}
            loading="lazy"
            className="max-h-12 max-w-full object-contain"
          />
        </Link>
      ))}
    </div>
  );

  return (
    <>
      {/* Hero — full-width image carousel that slides to the left every 5s and
          can also be dragged/swiped left or right by hand. The banner is
          designed at 2170×725 (ratio ≈ 3:1). The container uses that exact
          aspect ratio so the full image always fits — no left/right cropping —
          and it scales to fit any screen width (mobile included). */}
      <section className="w-full overflow-hidden bg-charcoal">
        <div
          ref={viewportRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerEnd}
          onPointerCancel={onPointerEnd}
          onClickCapture={onClickCapture}
          className="relative mx-auto aspect-[2170/725] w-full max-w-[2170px] touch-pan-y overflow-hidden select-none"
          style={{ cursor: dragging ? "grabbing" : "grab" }}
        >
          <div
            className={cn(
              "flex h-full w-full ease-out",
              dragging || noTransition ? "" : "transition-transform duration-[700ms]",
            )}
            style={{ transform: `translateX(calc(${-index * 100}% + ${dragX}px))` }}
          >
            {trackSlides.map((src, i) => {
              const meta =
                heroSlides[
                  (((i - 1) % heroSlides.length) + heroSlides.length) % heroSlides.length
                ]!;
              return (
                <Link
                  key={`${meta.image}-${i}`}
                  to="/products"
                  search={{ q: "", category: "all", brand: meta.brand ?? "all" }}
                  aria-label={meta.label}
                  title={meta.label}
                  draggable={false}
                  className="block h-full w-full shrink-0"
                >
                  <img
                    src={src}
                    alt={meta.alt}
                    fetchPriority={i === 0 ? "high" : undefined}
                    loading={i === 0 ? undefined : "lazy"}
                    draggable={false}
                    className="h-full w-full object-cover object-center"
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Shop by category — scrollable product rows with arrow navigation */}
      <ProductCarousel title="Power Tools" items={powerTools} />
      <ProductCarousel title="Water Pumps & Motors" items={waterPumps} />
      <ProductCarousel title="Machinery & Compressors" items={machinery} />

      {/* Brands */}
      <section className="bg-charcoal py-10 text-charcoal-foreground sm:py-12">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Brands we carry</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">
              Distributed brands you already trust
            </h2>
          </Reveal>
          <div className="brand-marquee relative mt-10 overflow-hidden">
            {/* Edge fade masks so logos appear to slide in/out cleanly. */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-charcoal to-transparent sm:w-24" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-charcoal to-transparent sm:w-24" />
            {/* Two copies of the logo strip so the right-to-left loop is seamless. */}
            <div className="brand-marquee-track flex w-max will-change-transform">
              {brandStrip(false)}
              {brandStrip(true)}
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
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
              retail space stocking hundreds of products across five major categories, backed by a
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
      <section className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">What we stock</p>
          <h2 className="rule-red mt-4 font-display text-3xl font-extrabold sm:text-4xl">
            Featured product categories
          </h2>
          <p className="mt-4 text-muted-foreground">
            From power tools to paints, structural hardware to pumps — five categories covering a
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
      <section className="bg-surface py-10 sm:py-14">
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
      <section className="bg-primary py-10 text-primary-foreground sm:py-12">
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
