import { Link } from "@tanstack/react-router";
import { Menu, Phone, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { business } from "@/lib/site";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Our Services" },
  { to: "/products", label: "Products" },
] as const;

export function SiteHeader() {
  const { count, setOpen } = useCart();
  const [mobile, setMobile] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="hidden bg-charcoal text-charcoal-foreground md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-xs">
          <p className="truncate">
            {business.addressFull} · Open {business.hours}
          </p>
          <div className="flex shrink-0 items-center gap-4">
            <a className="hover:text-primary-foreground/80" href={`tel:${business.phoneIntl}`}>
              {business.phone}
            </a>
            <a className="hover:text-primary-foreground/80" href={`mailto:${business.email}`}>
              {business.email}
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 lg:flex lg:justify-between">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <img
            src="/brands/company-logo.png"
            alt="Ceylon Platinum Trading (PVT) Ltd logo"
            className="h-11 w-auto shrink-0"
          />
          <span className="min-w-0">
            <span className="block truncate font-display text-base leading-tight font-extrabold sm:text-lg">
              Ceylon Platinum Trading
            </span>
            <span className="block truncate text-[11px] tracking-wide text-muted-foreground uppercase">
              {business.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              activeProps={{ className: "text-primary" }}
              className="px-3 py-2 font-display text-sm font-semibold text-foreground transition-colors hover:text-primary"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm" className="hidden xl:inline-flex">
            <a href={`tel:${business.phoneIntl}`}>
              <Phone className="size-4" /> {business.phone}
            </a>
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => setOpen(true)}
            aria-label={`Open cart, ${count} items`}
          >
            <ShoppingCart className="size-4" />
            <span className="hidden sm:inline">Cart</span>
            <span className="ml-1 inline-grid min-w-5 place-items-center rounded-full bg-primary-foreground/20 px-1.5 text-xs font-bold">
              {count}
            </span>
          </Button>

          <Sheet open={mobile} onOpenChange={setMobile}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[86vw] max-w-sm p-0">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <span className="font-display font-extrabold">Menu</span>
                <Button variant="ghost" size="icon" onClick={() => setMobile(false)}>
                  <X className="size-5" />
                </Button>
              </div>
              <nav className="flex flex-col p-2" aria-label="Mobile">
                {nav.map((n) => (
                  <Link
                    key={n.to}
                    to={n.to}
                    onClick={() => setMobile(false)}
                    activeOptions={{ exact: n.to === "/" }}
                    activeProps={{ className: "text-primary" }}
                    className="border-b border-border/60 px-4 py-4 font-display text-lg font-semibold"
                  >
                    {n.label}
                  </Link>
                ))}
              </nav>
              <div className="space-y-2 p-5 text-sm">
                <a className="block font-semibold" href={`tel:${business.phoneIntl}`}>
                  {business.phone}
                </a>
                <a className="block text-muted-foreground" href={`mailto:${business.email}`}>
                  {business.email}
                </a>
                <p className="text-muted-foreground">{business.addressFull}</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
