import { createFileRoute, Link } from "@tanstack/react-router";
import { Compass, HeartHandshake, ShieldCheck, Target } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { business, photos } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Ceylon Platinum Trading (PVT) Ltd, Matara" },
      {
        name: "description",
        content:
          "The story of Ceylon Platinum Trading (PVT) Ltd — a family-built hardware distributor in Kotuwegoda, Matara, serving builders across Southern Sri Lanka.",
      },
      { property: "og:title", content: "About Ceylon Platinum Trading (PVT) Ltd" },
      {
        property: "og:description",
        content:
          "A family-built hardware enterprise in Matara, Sri Lanka, committed to quality tools, materials and equipment for Southern Province builders.",
      },
      { property: "og:url", content: "/about" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const directors = [
  {
    name: "Bazlin Salih",
    role: "Chairman",
    bio: "Bazlin Salih is the founder and Chairman of Ceylon Platinum Trading (PVT) Ltd, bringing decades of entrepreneurial leadership and deep-rooted experience in Sri Lanka's hardware and construction materials sector. With a strong commercial vision, he established CPT to raise the standard of hardware retail in the Southern Province — creating a one-stop destination offering premium brands, expert service, and genuine quality. His leadership has been pivotal in building strategic relationships with international brands including Bosch, Asian Paints, Lesso, and Tolsen, positioning CPT as one of Matara's most trusted hardware destinations since its 2026 launch.",
  },
  {
    name: "Himaz Bazlin",
    role: "Director",
    bio: "Himaz Bazlin serves as Director of Ceylon Platinum Trading, overseeing day-to-day operations and retail management at the Matara showroom. With hands-on involvement in procurement, supplier relations, and customer engagement, Himaz is instrumental in maintaining CPT's high standards of service and product availability. His practical knowledge of the construction trade and genuine commitment to customer satisfaction have made him a trusted figure among the contractors and builders who rely on CPT for their projects across the Southern Province.",
  },
  {
    name: "Amar Bazlin",
    role: "Director",
    bio: "Amar Bazlin is a Director of Ceylon Platinum Trading and the founder of Forgera, an AI automation company building intelligent business operations platforms for Sri Lankan SMEs. A Computer Science undergraduate at the University of Colombo (Staffordshire University / APIIT Sri Lanka) and a nationally ranked swimmer, Amar brings a technology-forward perspective to CPT's operations — driving digital presence, brand strategy, and data-driven business improvements. His dual expertise in software development and hardware distribution is shaping CPT's growth into a modern, technology-enabled retail business.",
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
              ambition: a professional retail space stocking hundreds of products across six major
              categories.
            </p>
            <Button asChild className="mt-7">
              <Link to="/products">See what we stock</Link>
            </Button>
          </Reveal>
          <Reveal delay={120}>
            <figure>
              <img
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
                <h3 className="mt-4 font-display text-lg font-extrabold">{v.t}</h3>
                <p className="mt-2 text-sm text-charcoal-muted">{v.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:py-24">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Inside the facility</p>
          <h2 className="rule-red mt-4 font-display text-3xl font-extrabold sm:text-4xl">
            Our Matara showroom
          </h2>
          <p className="mt-4 text-muted-foreground">
            Photography from our Old Tangalle Road showroom and stock floor. More facility and team
            photos will be added here.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { src: photos.showroomExterior, alt: "Exterior of the Ceylon Platinum Trading showroom in Matara" },
            { src: photos.handTools, alt: "Hand tool wall display at the CPT Matara showroom" },
            { src: photos.powerTools, alt: "Power tools stocked at Ceylon Platinum Trading" },
            { src: photos.paints, alt: "Paint and coatings shelving at the CPT showroom" },
            { src: photos.hardware, alt: "Door and window hardware stocked at CPT Matara" },
            { src: photos.machinery, alt: "Compressors and machinery at Ceylon Platinum Trading" },
          ].map((img, i) => (
            <Reveal key={img.alt} delay={(i % 3) * 80} className="overflow-hidden">
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
              />
            </Reveal>
          ))}
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
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {directors.map((d, i) => (
              <Reveal
                key={d.name}
                delay={(i % 3) * 90}
                className="flex h-full flex-col border border-border bg-card p-6 shadow-card"
              >
                <p className="text-xs font-semibold tracking-widest text-primary uppercase">
                  {d.role}
                </p>
                <h3 className="mt-2 font-display text-xl font-extrabold">{d.name}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{d.bio}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
