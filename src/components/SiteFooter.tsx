import { Link } from "@tanstack/react-router";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { business, categories } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-charcoal text-charcoal-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <img
              src="/brands/company-logo.png"
              alt="Ceylon Platinum Trading (PVT) Ltd logo"
              className="h-11 w-auto shrink-0"
            />
            <span className="font-display text-lg font-extrabold">Ceylon Platinum Trading</span>
          </div>
          <p className="mt-4 text-sm text-charcoal-muted">
            {business.name} is a hardware distribution company in Matara, Sri Lanka, supplying power
            tools, hand tools, paints, door and window hardware, machinery and pumps island-wide.
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold tracking-widest uppercase">Pages</h3>
          <ul className="mt-4 space-y-2 text-sm text-charcoal-muted">
            <li>
              <Link to="/" className="hover:text-charcoal-foreground">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-charcoal-foreground">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-charcoal-foreground">
                Our Services
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-charcoal-foreground">
                Products
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold tracking-widest uppercase">Categories</h3>
          <ul className="mt-4 space-y-2 text-sm text-charcoal-muted">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/products"
                  search={{ category: c.slug, q: "" }}
                  className="hover:text-charcoal-foreground"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold tracking-widest uppercase">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-charcoal-muted">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{business.addressFull}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-primary" />
              <a href={`tel:${business.phoneIntl}`}>{business.phone}</a>
            </li>
            <li className="flex gap-3">
              <MessageCircle className="mt-0.5 size-4 shrink-0 text-primary" />
              <a href={`https://wa.me/${business.whatsapp}`}>WhatsApp {business.whatsappDisplay}</a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-primary" />
              <a className="break-all" href={`mailto:${business.email}`}>
                {business.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{business.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-charcoal-muted/20">
        <div className="mx-auto max-w-7xl px-4 py-5 text-xs text-charcoal-muted">
          © {new Date().getFullYear()} {business.name}. All rights reserved. Matara, Sri Lanka.
        </div>
      </div>
    </footer>
  );
}
