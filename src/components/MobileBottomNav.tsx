import { Link, useRouterState } from "@tanstack/react-router";
import { Grid3X3, Home, Search, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useMobileUi } from "@/lib/mobile-ui";
import { cn } from "@/lib/utils";

export function MobileBottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { count, setOpen } = useCart();
  const { setSearchOpen } = useMobileUi();

  if (pathname.startsWith("/admin")) return null;

  const itemClass = (active: boolean) =>
    cn(
      // min-h-14 (56px) keeps the bar comfortably tappable; the page inset in
      // mobile-ui.tsx (4rem) still clears it.
      "flex min-h-14 min-w-0 flex-1 flex-col items-center justify-center gap-1 px-1 py-2 text-[11px] font-semibold leading-none transition-colors",
      active ? "text-primary" : "text-muted-foreground",
    );

  return (
    <nav
      aria-label="Mobile shopping"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur-md md:hidden supports-[padding:max(0px)]:pb-[env(safe-area-inset-bottom)]"
    >
      <div className="mx-auto flex min-h-14 max-w-lg items-stretch justify-around">
        <Link
          to="/"
          className={itemClass(pathname === "/")}
          aria-current={pathname === "/" ? "page" : undefined}
        >
          <Home className="size-[1.375rem] shrink-0" aria-hidden />
          Home
        </Link>
        <Link
          to="/products"
          search={{ category: "all", q: "" }}
          className={itemClass(pathname.startsWith("/products"))}
          aria-current={pathname.startsWith("/products") ? "page" : undefined}
        >
          <Grid3X3 className="size-[1.375rem] shrink-0" aria-hidden />
          Categories
        </Link>
        <button type="button" className={itemClass(false)} onClick={() => setSearchOpen(true)}>
          <Search className="size-[1.375rem] shrink-0" aria-hidden />
          Search
        </button>
        <button
          type="button"
          className={itemClass(false)}
          aria-label={`Cart, ${count} items`}
          onClick={() => setOpen(true)}
        >
          <span className="relative">
            <ShoppingCart className="size-[1.375rem] shrink-0" aria-hidden />
            {count > 0 ? (
              <span className="absolute -top-1.5 -right-2 inline-grid min-w-4 place-items-center rounded-full bg-primary px-1 text-[9px] font-bold text-primary-foreground">
                {count > 99 ? "99+" : count}
              </span>
            ) : null}
          </span>
          Cart
        </button>
      </div>
    </nav>
  );
}
