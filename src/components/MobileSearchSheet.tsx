import { useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { SmartImage } from "@/components/SmartImage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useMobileUi } from "@/lib/mobile-ui";
import { formatProductPrice, productMatchesSearch } from "@/lib/product-display";
import { products } from "@/lib/site";

export function MobileSearchSheet() {
  const { searchOpen, setSearchOpen } = useMobileUi();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!searchOpen) setQuery("");
  }, [searchOpen]);

  const suggestions = useMemo(() => {
    const needle = query.trim();
    if (needle.length < 2) return [];
    return products.filter((p) => productMatchesSearch(p, needle)).slice(0, 8);
  }, [query]);

  function goToSearch(q: string) {
    const trimmed = q.trim();
    setSearchOpen(false);
    navigate({ to: "/products", search: { q: trimmed || undefined, category: "all", brand: "all" } });
  }

  return (
    <Sheet open={searchOpen} onOpenChange={setSearchOpen}>
      <SheetContent side="top" hideClose className="flex h-[100dvh] max-h-[100dvh] flex-col gap-0 p-0">
        <SheetTitle className="sr-only">Search products</SheetTitle>
        <div className="flex items-center gap-2 border-b border-border px-3 py-3">
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              autoFocus
              value={query}
              placeholder="Search products, brands or models..."
              className="min-h-11 pl-10 text-base"
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") goToSearch(query);
              }}
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-11 shrink-0"
            aria-label="Close search"
            onClick={() => setSearchOpen(false)}
          >
            <X className="size-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-3">
          {suggestions.length > 0 ? (
            <ul className="space-y-1">
              {suggestions.map((p) => (
                <li key={p.slug}>
                  <button
                    type="button"
                    className="flex w-full min-h-14 items-center gap-3 rounded-md border border-transparent px-2 py-2 text-left transition-colors hover:border-border hover:bg-surface"
                    onClick={() => {
                      setSearchOpen(false);
                      navigate({ to: "/products/$slug", params: { slug: p.slug } });
                    }}
                  >
                    <SmartImage
                      src={p.image}
                      alt=""
                      loading="lazy"
                      className="size-12 shrink-0 rounded border border-border bg-surface object-contain p-0.5"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-xs font-semibold text-primary uppercase">
                        {p.brand}
                      </span>
                      <span className="block truncate font-display text-sm font-bold">{p.name}</span>
                      <span className="block text-xs text-muted-foreground">
                        {formatProductPrice(p.price)}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : query.trim().length >= 2 ? (
            <p className="px-1 py-4 text-sm text-muted-foreground">No products match your search.</p>
          ) : (
            <p className="px-1 py-4 text-sm text-muted-foreground">
              Search by product name, brand, or model / product code.
            </p>
          )}
        </div>

        <div className="border-t border-border p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <Button className="min-h-11 w-full font-display font-bold" onClick={() => goToSearch(query)}>
            Search catalogue
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
