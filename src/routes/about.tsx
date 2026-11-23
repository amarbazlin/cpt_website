
import { createFileRoute, Link } from "@tanstack/react-router";
import { Compass, HeartHandshake, ShieldCheck, Target } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SmartImage } from "@/components/SmartImage";
import { Button } from "@/components/ui/button";
import { absoluteUrl, socialImageMeta } from "@/lib/seo";
import { business, photos } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Ceylon Platinum Trading (PVT) Ltd, Matara" },
      {
        name: "description",
        content:
          "The story of Ceylon Platinum Trading (PVT) Ltd — a family-built hardware in Kotuwegoda, Matara, serving builders across Southern Sri Lanka.",
      },
      {
        property: "og:title",
        content: "About Ceylon Platinum Trading (PVT) Ltd",
      },
      {
        property: "og:description",
        content:
          "A family-built hardware enterprise in Matara, Sri Lanka, committed to quality tools, materials and equipment for Southern Province builders.",
      },
      { property: "og:url", content: absoluteUrl("/about") },
      { property: "og:type", content: "website" },
      ...socialImageMeta(
        photos.whoWeAre,
        "The Ceylon Platinum Trading team and facility at the Matara showroom",
      ),
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/about") }],
  }),
  component: About,
});

const directors = [
  {
    name: "Bazlin Salih",
    role: "Chairman",
    bio: "Leading the company with experience and strategic direction.",
  },
  {
    name: "Himaz Bazlin",
    role: "Director",
    bio: "Contributing to the company's growth and business development.",
  },
];

function About() {
  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Our story</p>
            <h1 className="rule-red mt-4 font-display text-4xl font-extrabold sm:text-5xl">
              About Ceylon Platinum Trading
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              A family-built enterprise committed to delivering quality hardware solutions to the
              builders of Southern Sri Lanka.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow">Who we are</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">
              Hardware excellence, Southern Sri Lanka
            </h2>
            <p className="mt-5 text-muted-foreground">
              Ceylon Platinum Trading (PVT) Ltd is a Matara-based hardware and construction products
              retailer dedicated to providing high-quality tools, materials, and equipment to
              homeowners, contractors, and builders across Sri Lanka's Southern Province.
            </p>
            <p className="mt-4 text-muted-foreground">
              Founded in 2026, CPT was built on the conviction that Southern Sri Lanka deserves
              access to the same premium hardware brands and expert service available in Colombo —
              without the distance. Our {business.street} showroom was designed to reflect that
              ambition: a professional retail space stocking hundreds of products across five major
              categories.
            </p>
            <Button asChild className="mt-7">
              <Link to="/products">See what we stock</Link>
            </Button>
          </Reveal>

          <Reveal delay={120}>
            <figure>
              <SmartImage
                src={photos.whoWeAre}
                alt="The Ceylon Platinum Trading team and facility at the Matara showroom"
                loading="lazy"
                className="w-full object-cover shadow-lift"
              />
              <figcaption className="mt-3 text-xs text-muted-foreground">
                Our showroom at {business.addressFull}.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="bg-charcoal py-16 text-charcoal-foreground sm:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">What drives us</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">
              Mission and values
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Target,
                t: "Our Mission",
                d: "To be the most trusted hardware partner for builders across Southern Sri Lanka.",
              },
              {
                icon: ShieldCheck,
                t: "Quality First",
                d: "Every brand we carry is vetted for durability, performance, and after-sales support.",
              },
              {
                icon: HeartHandshake,
                t: "Customer Focus",
                d: "Expert advice from a team that understands what construction really demands.",
              },
              {
                icon: Compass,
                t: "Growth Vision",
                d: "Expanding our range and reach to serve more of Sri Lanka's construction community.",
              },
            ].map((v, i) => (
              <Reveal
                key={v.t}
                delay={(i % 4) * 80}
                className="border-t-2 border-primary bg-charcoal-foreground/5 p-6"
              >
                <v.icon className="size-7 text-primary" />
                <h3 className="mt-4 font-display text-lg font-extrabold">
                  {v.t}
                </h3>
                <p className="mt-2 text-sm text-charcoal-muted">{v.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Leadership</p>
            <h2 className="rule-red mt-4 font-display text-3xl font-extrabold sm:text-4xl">
              Board of Directors
            </h2>
            <p className="mt-4 text-muted-foreground">
              CPT is led by a family team combining decades of hardware industry experience with
              modern business thinking.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {directors.map((d, i) => (
              <Reveal
                key={d.name}
                delay={(i % 3) * 90}
                className="flex h-full flex-col border border-border bg-card p-6 shadow-card"
              >
                <p className="text-xs font-semibold tracking-widest text-primary uppercase">
                  {d.role}
                </p>
                <h3 className="mt-2 font-display text-xl font-extrabold">
                  {d.name}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">{d.bio}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
