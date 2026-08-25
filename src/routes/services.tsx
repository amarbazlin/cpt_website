import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle, Phone } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { business, services } from "@/lib/site";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Our Services | Ceylon Platinum Trading (PVT) Ltd, Matara" },
      {
        name: "description",
        content:
          "Bulk and project supply, island-wide delivery, distributor partnerships, custom orders, colour mixing and trade advice from Ceylon Platinum Trading in Matara, Sri Lanka.",
      },
      { property: "og:title", content: "Our Services | Ceylon Platinum Trading (PVT) Ltd" },
      {
        property: "og:description",
        content:
          "Hardware distribution services from Matara: bulk supply, island-wide delivery, distributor partnerships and custom orders.",
      },
      { property: "og:url", content: "/services" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: Services,
});

function Services() {
  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">What we do</p>
            <h1 className="rule-red mt-4 font-display text-4xl font-extrabold sm:text-5xl">
              Our Services
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Ceylon Platinum Trading (PVT) Ltd is more than a hardware counter in Matara. We supply
              contractors, builders, hardware retailers and homeowners across Sri Lanka with the
              tools, materials and logistics a project actually needs.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:py-24">
        <div className="grid gap-8 lg:gap-10">
          {services.map((s, i) => (
            <Reveal
              key={s.slug}
              delay={60}
              className={`grid items-center gap-6 border border-border bg-card shadow-card lg:grid-cols-2 ${
                i % 2 === 1 ? "lg:[&>figure]:order-2" : ""
              }`}
            >
              <figure className="overflow-hidden">
                <img
                  src={s.image}
                  alt={`${s.title} — Ceylon Platinum Trading, Matara, Sri Lanka`}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
              </figure>
              <div className="p-6 sm:p-10">
                <p className="text-xs font-semibold tracking-widest text-primary uppercase">
                  Service {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-3 font-display text-2xl font-extrabold sm:text-3xl">{s.title}</h2>
                <p className="mt-4 text-muted-foreground">{s.blurb}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild variant="outline" size="sm">
                    <a href={`https://wa.me/${business.whatsapp}`}>
                      <MessageCircle className="size-4" /> Enquire on WhatsApp
                    </a>
                  </Button>
                  <Button asChild variant="ghost" size="sm">
                    <a href={`tel:${business.phoneIntl}`}>
                      <Phone className="size-4" /> {business.phone}
                    </a>
                  </Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 border-l-4 border-primary bg-surface p-6">
          <p className="text-sm text-muted-foreground">
            Need a service that isn't listed here? Call {business.phone} or message{" "}
            {business.whatsappDisplay} on WhatsApp and our Matara team will advise.
          </p>
        </Reveal>
      </section>

      <section className="bg-primary py-16 text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 lg:flex-row lg:items-center lg:justify-between">
          <Reveal>
            <h2 className="font-display text-3xl font-extrabold">Start your order</h2>
            <p className="mt-3 max-w-xl opacity-90">
              Build a list from our catalogue and send it to our WhatsApp Business line — we confirm
              stock, price and delivery from Matara.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <Button asChild size="lg" variant="secondary">
              <Link to="/products">Browse products</Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
