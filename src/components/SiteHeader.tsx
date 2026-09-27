import { Link } from "@tanstack/react-router";
import { Menu, Phone, Search, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { business } from "@/lib/site";
import { useCart } from "@/lib/cart";
import { useMobileUi } from "@/lib/mobile-ui";
import { SmartImage } from "@/components/SmartImage";
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
  const { setSearchOpen } = useMobileUi();
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

      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-3 py-2 sm:px-4 sm:py-3 lg:flex lg:justify-between">
        <Link to="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
          <SmartImage
            src="/brands/company-logo.png"
            alt="Ceylon Platinum Trading (PVT) Ltd logo"
            className="h-9 w-auto shrink-0 sm:h-11"
          />
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-display text-[13px] font-extrabold sm:text-lg">
              Ceylon Platinum Trading
            </span>
            <span className="hidden truncate text-[10px] tracking-wide text-muted-foreground uppercase min-[380px]:block sm:text-[11px]">
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

        <div className="flex shrink-0 items-center gap-0.5 sm:gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="size-10 shrink-0 lg:hidden"
            aria-label="Search products"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="size-5" />
          </Button>

          <Button asChild variant="outline" size="sm" className="hidden xl:inline-flex">
            <a href={`tel:${business.phoneIntl}`}>
              <Phone className="size-4" /> {business.phone}
            </a>
          </Button>
          <Button
            variant="default"
            size="sm"
            className="relative h-10 min-w-10 shrink-0 gap-1.5 px-2.5 sm:h-9 sm:min-w-0 sm:px-3"
            onClick={() => setOpen(true)}
            aria-label={`Open cart, ${count} items`}
          >
            <ShoppingCart className="size-[1.125rem] shrink-0 sm:size-4" />
            <span className="hidden font-display text-sm font-semibold sm:inline">Cart</span>
            {count > 0 ? (
              <span className="inline-grid min-h-5 min-w-5 place-items-center rounded-full bg-primary-foreground/25 px-1 text-[11px] font-bold leading-none sm:ml-0.5">
                {count > 99 ? "99+" : count}
              </span>
            ) : null}
          </Button>

          <Sheet open={mobile} onOpenChange={setMobile}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="size-10 shrink-0 lg:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[86vw] max-w-sm p-0">
              <SheetTitle className="border-b border-border px-5 py-4 pr-12 font-display font-extrabold">
                Menu
              </SheetTitle>
              <nav className="flex flex-col p-2" aria-label="Mobile">
                {nav.map((n) => (
                  <Link
                    key={n.to}
                    to={n.to}
                    onClick={() => setMobile(false)}
                    activeOptions={{ exact: n.to === "/" }}
                    activeProps={{ className: "text-primary" }}
                    className="min-h-12 border-b border-border/60 px-4 py-3 font-display text-lg font-semibold"
                  >
                    {n.label}
                  </Link>
                ))}
              </nav>
              <div className="space-y-2 p-5 text-sm">
                <a className="block min-h-11 py-2 font-semibold" href={`tel:${business.phoneIntl}`}>
                  {business.phone}
                </a>
                <a className="block min-h-11 py-2 text-muted-foreground" href={`mailto:${business.email}`}>
                  {business.email}
                </a>
                <p className="text-muted-foreground">{business.addressFull}</p>
                <p className="text-xs font-bold tracking-wide text-primary uppercase">
                  Free islandwide delivery on all products
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
